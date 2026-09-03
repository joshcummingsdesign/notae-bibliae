import { renderHook, waitFor } from "@testing-library/react";
import { vi, beforeEach, afterEach, describe, it, expect } from "vitest";
import dayjs from "dayjs";
import { Calendar } from "@/models/calendar";
import { useDailyOffice } from "./useDailyOffice";

const renderDailyOffice = (
  date = "2025-12-25",
  office: "morning" | "evening" = "morning",
) => {
  const calendar = new Calendar(dayjs(date));
  return renderHook(() => useDailyOffice(office, calendar));
};

// Mock API response matching LectionaryRes structure
const mockLectionaryResponse = {
  liturgicalYear: 2026,
  "2025-12-25": {
    season: "Christmastide",
    primaryObservance: "Christmas Day",
    morning: {
      first: ["Isaiah 9:2-7"],
      second: ["Luke 2:1-14"],
      collects: [{ title: "Christmas Day", collect: "Almighty God..." }],
    },
    evening: {
      first: ["Isaiah 62:1-5"],
      second: ["Matthew 1:18-25"],
      collects: [{ title: "Christmas Day", collect: "Almighty God..." }],
    },
  },
};

// Helper to setup fetch mock
const mockFetch = () => {
  global.fetch = vi.fn((input: RequestInfo | URL) => {
    const url = typeof input === "string" ? input : input.toString();
    if (url.includes("lectionary")) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockLectionaryResponse),
      } as Response);
    }
    return Promise.reject(new Error("Unknown URL"));
  }) as typeof fetch;
};

describe("useDailyOffice", () => {
  beforeEach(() => {
    localStorage.clear();
    mockFetch();

    // Mock window.BGLinks
    (window as unknown as { BGLinks: unknown }).BGLinks = undefined;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("loading state", () => {
    it("starts with isLoading=true", () => {
      const { result } = renderDailyOffice();
      expect(result.current.isLoading).toBe(true);
    });

    it("sets isLoading=false after data loads", async () => {
      const { result } = renderDailyOffice();

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });
  });

  describe("data fetching", () => {
    it("fetches from lectionary endpoint", async () => {
      renderDailyOffice();

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledTimes(1);
      });

      expect(global.fetch).toHaveBeenCalledWith(
        "/api/lectionary/today?withLinks=true",
      );
    });

    it("sets lectionaryData state from response", async () => {
      const { result } = renderDailyOffice();

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.lectionaryData).not.toBeNull();
      expect(result.current.lectionaryData?.primaryObservance).toBe(
        "Christmas Day",
      );
    });

    it("handles fetch errors gracefully", async () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      global.fetch = vi.fn(() => Promise.reject(new Error("Network error")));

      const { result } = renderDailyOffice();

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith(
          "Error fetching daily office data:",
          expect.any(Error),
        );
      });

      // Should still be loading since data never arrived
      expect(result.current.isLoading).toBe(true);
      consoleSpy.mockRestore();
    });
  });

  describe("caching", () => {
    it("reads from localStorage on mount", async () => {
      const cachedData = {
        "2025-12-25": {
          lectionaryData: mockLectionaryResponse,
        },
      };
      localStorage.setItem("daily-office", JSON.stringify(cachedData));

      const { result } = renderDailyOffice();

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Should not have fetched since cache was used
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it("fetches fresh data if cache is for different date", async () => {
      const cachedData = {
        "2025-12-24": {
          lectionaryData: mockLectionaryResponse,
        },
      };
      localStorage.setItem("daily-office", JSON.stringify(cachedData));

      renderDailyOffice();

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledTimes(1);
      });
    });

    it("stores data in localStorage after successful fetch", async () => {
      const { result } = renderDailyOffice();

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const cached = localStorage.getItem("daily-office");
      expect(cached).not.toBeNull();

      const parsed = JSON.parse(cached!);
      expect(parsed["2025-12-25"]).toBeDefined();
      expect(parsed["2025-12-25"].lectionaryData).toBeDefined();
    });
  });

  describe("Lent", () => {
    it("is true during Lent", async () => {
      const { result } = renderDailyOffice("2026-02-18");

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isLent).toBe(true);
    });

    it("is false on non-Lenten solemn days", async () => {
      const { result } = renderDailyOffice("2026-11-02");

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isLent).toBe(false);
    });

    it("is false otherwise", async () => {
      const { result } = renderDailyOffice("2026-07-15");

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isLent).toBe(false);
    });
  });

  describe("Triduum rules", () => {
    it.each([
      ["2026-04-01", "morning", false],
      ["2026-04-02", "morning", false],
      ["2026-04-02", "evening", true],
      ["2026-04-03", "morning", true],
      ["2026-04-03", "evening", true],
      ["2026-04-04", "morning", true],
      ["2026-04-04", "evening", true],
      ["2026-04-05", "morning", false],
    ] as const)("is %s for %s prayer: %s", async (date, office, expected) => {
      const { result } = renderDailyOffice(date, office);

      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.isTriduum).toBe(expected);
    });
  });

  describe("invitatory page by season", () => {
    it.each([
      ["Advent", "2025-11-30", 306],
      ["Christmastide", "2025-12-25", 308],
      ["Epiphanytide", "2026-01-06", 310],
      ["Transfiguration", "2026-08-06", 310],
      ["Lent", "2026-02-18", 312],
      ["Pre-Lent", "2026-02-01", 310],
      ["Eastertide", "2026-04-05", 314],
      ["Ascensiontide", "2026-05-14", 316],
      ["Whitsuntide", "2026-05-24", 318],
      ["Trinitytide", "2026-06-01", 320],
      ["Annunciation", "2026-03-25", 322],
      ["Purification", "2026-02-02", 322],
      ["Saint Day", "2026-01-26", 324],
    ] as const)("returns the %s page on %s (%i)", async (_season, date, page) => {
      const { result } = renderDailyOffice(date);

      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.invitatoryPage).toBe(page);
    });
  });

  describe("O Antiphons (evening prayer)", () => {
    it("returns currentAntiphon during O Antiphon period", async () => {
      const { result } = renderDailyOffice("2025-12-16", "evening");

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.currentAntiphon).toMatchObject({
        title: "O Sapientia",
      });
    });

    it("returns undefined outside O Antiphon period", async () => {
      const { result } = renderDailyOffice("2025-12-25", "evening");

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.currentAntiphon).toBeUndefined();
    });
  });

  describe("ferial vs festal determination", () => {
    it("isFerial=false for Lord's Days", async () => {
      const { result } = renderDailyOffice("2025-12-07");

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isFerial).toBe(false);
    });

    it("isFerial=false for Feast Days", async () => {
      const { result } = renderDailyOffice("2025-12-01");

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isFerial).toBe(false);
    });

    it("isFerial=false during Octaves (non-special days)", async () => {
      const { result } = renderDailyOffice("2025-12-27");

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isFerial).toBe(false);
    });

    it("isFerial=true for Holy Innocents on weekday during octave", async () => {
      const { result } = renderDailyOffice("2026-12-28");

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isFerial).toBe(true);
    });

    it("isFerial=true for Ember Days in Whitsuntide during octave", async () => {
      const { result } = renderDailyOffice("2026-05-27");

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isFerial).toBe(true);
    });

    it("isFerial=true for solemn days", async () => {
      const { result } = renderDailyOffice("2026-11-02");

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isFerial).toBe(true);
    });

    it("isFerial=true for regular weekdays (not festal)", async () => {
      const { result } = renderDailyOffice("2026-07-15");

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isFerial).toBe(true);
    });
  });

  describe("today data", () => {
    it("returns today as formatted date string", async () => {
      const { result } = renderDailyOffice();

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.today).toBe("Thursday, December 25");
    });

    it("returns dateString in YYYY-MM-DD format", async () => {
      const { result } = renderDailyOffice();

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.dateString).toBe("2025-12-25");
    });
  });

  describe("window.BGLinks integration", () => {
    it("calls BGLinks.linkVerses when loading completes", async () => {
      const mockLinkVerses = vi.fn();
      (
        window as unknown as {
          BGLinks: { version: string; linkVerses: () => void };
        }
      ).BGLinks = {
        version: "",
        linkVerses: mockLinkVerses,
      };

      const { result } = renderDailyOffice();

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(
        (window as unknown as { BGLinks: { version: string } }).BGLinks.version,
      ).toBe("NKJV");
      expect(mockLinkVerses).toHaveBeenCalled();
    });

    it("does not error when BGLinks is undefined", async () => {
      (window as unknown as { BGLinks: unknown }).BGLinks = undefined;

      const { result } = renderDailyOffice();

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Should complete without error
      expect(result.current.isLoading).toBe(false);
    });
  });
});
