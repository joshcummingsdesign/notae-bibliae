import { renderHook, waitFor } from "@testing-library/react";
import { vi, beforeEach, afterEach, describe, it, expect } from "vitest";

// Create mock calendar instance that will be returned by Calendar constructor
const createMockCalendar = () => ({
  getToday: vi.fn(() => ({
    format: vi.fn((fmt: string) =>
      fmt === "YYYY-MM-DD" ? "2025-12-25" : "Thursday, December 25"
    ),
    add: vi.fn(() => ({
      format: vi.fn(() => "2025-12-26"),
    })),
  })),
  isSolemn: vi.fn(() => false),
  isOctaveOfChristmas: vi.fn(() => false),
  isOctaveOfEpiphany: vi.fn(() => false),
  isOctaveOfEaster: vi.fn(() => false),
  isOctaveOfPentecost: vi.fn(() => false),
  isEaster: vi.fn(() => false),
  isPentecost: vi.fn(() => false),
  isChristmas: vi.fn(() => false),
  isWhitsuntide: vi.fn(() => false),
  isAdvent: vi.fn(() => false),
  isChristmastide: vi.fn(() => false),
  isEastertide: vi.fn(() => false),
  getOAntiphons: vi.fn(() => ({})),
  isFeastOfASaint: vi.fn(() => false),
  isSaintDay: vi.fn(() => false),
  isTransfiguration: vi.fn(() => false),
  isAnnunciation: vi.fn(() => false),
  isEmberDayInWhitsuntide: vi.fn(() => false),
  isPurification: vi.fn(() => false),
  isAscensiontide: vi.fn(() => false),
  isEpiphanytide: vi.fn(() => false),
  isLent: vi.fn(() => false),
  isPreLent: vi.fn(() => false),
  isTrinitytide: vi.fn(() => false),
  isHolyInnocents: vi.fn(() => false),
  isSeptuagesimaToEaster: vi.fn(() => false),
  isRogationDay: vi.fn(() => false),
  isLordsDay: vi.fn(() => false),
  isFeastDay: vi.fn(() => false),
  isVigil: vi.fn(() => false),
});

let mockCalendar = createMockCalendar();

// Mock the Calendar class before importing the hook
vi.mock("@/models/calendar", () => {
  return {
    Calendar: function () {
      return mockCalendar;
    },
  };
});

// Import after mocking
import { useDailyOffice } from "./useDailyOffice";

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
    // Create fresh mock calendar for each test
    mockCalendar = createMockCalendar();

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
      const { result } = renderHook(() => useDailyOffice("morning"));
      expect(result.current.isLoading).toBe(true);
    });

    it("sets isLoading=false after data loads", async () => {
      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });
  });

  describe("data fetching", () => {
    it("fetches from lectionary endpoint", async () => {
      renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledTimes(1);
      });

      expect(global.fetch).toHaveBeenCalledWith(
        "/api/lectionary/today?withLinks=true"
      );
    });

    it("sets lectionaryData state from response", async () => {
      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.lectionaryData).not.toBeNull();
      expect(result.current.lectionaryData?.primaryObservance).toBe(
        "Christmas Day"
      );
    });

    it("handles fetch errors gracefully", async () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      global.fetch = vi.fn(() => Promise.reject(new Error("Network error")));

      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith(
          "Error fetching daily office data:",
          expect.any(Error)
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

      const { result } = renderHook(() => useDailyOffice("morning"));

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

      renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledTimes(1);
      });
    });

    it("stores data in localStorage after successful fetch", async () => {
      const { result } = renderHook(() => useDailyOffice("morning"));

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

  describe("Te Deum rules (shouldSingTeDeum)", () => {
    it("shouldSingTeDeum=true for Feast Days", async () => {
      mockCalendar.isFeastDay.mockReturnValue(true);

      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.shouldSingTeDeum).toBe(true);
    });

    it("shouldSingTeDeum=true for Lord's Days", async () => {
      mockCalendar.isLordsDay.mockReturnValue(true);

      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.shouldSingTeDeum).toBe(true);
    });

    it("shouldSingTeDeum=true during Christmastide", async () => {
      mockCalendar.isChristmastide.mockReturnValue(true);

      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.shouldSingTeDeum).toBe(true);
    });

    it("shouldSingTeDeum=true during Octave of Epiphany", async () => {
      mockCalendar.isOctaveOfEpiphany.mockReturnValue(true);

      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.shouldSingTeDeum).toBe(true);
    });

    it("shouldSingTeDeum=true during Eastertide", async () => {
      mockCalendar.isEastertide.mockReturnValue(true);

      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.shouldSingTeDeum).toBe(true);
    });

    it("shouldSingTeDeum=true during Whitsuntide", async () => {
      mockCalendar.isWhitsuntide.mockReturnValue(true);

      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.shouldSingTeDeum).toBe(true);
    });
  });

  describe("Te Deum rules (shouldOmitTeDeum)", () => {
    it("shouldOmitTeDeum=true during Advent", async () => {
      mockCalendar.isAdvent.mockReturnValue(true);

      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.shouldOmitTeDeum).toBe(true);
    });

    it("shouldOmitTeDeum=true for Holy Innocents on weekday", async () => {
      mockCalendar.isHolyInnocents.mockReturnValue(true);
      mockCalendar.isLordsDay.mockReturnValue(false);

      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.shouldOmitTeDeum).toBe(true);
    });

    it("shouldOmitTeDeum=false for Holy Innocents on Sunday", async () => {
      mockCalendar.isHolyInnocents.mockReturnValue(true);
      mockCalendar.isLordsDay.mockReturnValue(true);

      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.shouldOmitTeDeum).toBe(false);
    });

    it("shouldOmitTeDeum=true during Septuagesima to Easter", async () => {
      mockCalendar.isSeptuagesimaToEaster.mockReturnValue(true);

      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.shouldOmitTeDeum).toBe(true);
    });

    it("shouldOmitTeDeum=true for solemn days", async () => {
      mockCalendar.isSolemn.mockReturnValue(true);

      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.shouldOmitTeDeum).toBe(true);
    });

    it("shouldOmitTeDeum=true for Rogation Days", async () => {
      mockCalendar.isRogationDay.mockReturnValue(true);

      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.shouldOmitTeDeum).toBe(true);
    });

    it("shouldOmitTeDeum=true for Ember Days in Whitsuntide", async () => {
      mockCalendar.isEmberDayInWhitsuntide.mockReturnValue(true);

      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.shouldOmitTeDeum).toBe(true);
    });
  });

  describe("invitatory page by season", () => {
    it("returns page 306 for Advent", async () => {
      mockCalendar.isAdvent.mockReturnValue(true);

      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.invitatoryPage).toBe(306);
    });

    it("returns page 308 for Christmastide", async () => {
      mockCalendar.isChristmastide.mockReturnValue(true);

      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.invitatoryPage).toBe(308);
    });

    it("returns page 310 for Epiphanytide", async () => {
      mockCalendar.isEpiphanytide.mockReturnValue(true);

      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.invitatoryPage).toBe(310);
    });

    it("returns page 310 for Transfiguration", async () => {
      mockCalendar.isTransfiguration.mockReturnValue(true);

      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.invitatoryPage).toBe(310);
    });

    it("returns page 312 for Lent", async () => {
      mockCalendar.isLent.mockReturnValue(true);

      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.invitatoryPage).toBe(312);
    });

    it("returns page 312 for Pre-Lent", async () => {
      mockCalendar.isPreLent.mockReturnValue(true);

      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.invitatoryPage).toBe(312);
    });

    it("returns page 314 for Eastertide", async () => {
      mockCalendar.isEastertide.mockReturnValue(true);

      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.invitatoryPage).toBe(314);
    });

    it("returns page 316 for Ascensiontide", async () => {
      mockCalendar.isAscensiontide.mockReturnValue(true);

      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.invitatoryPage).toBe(316);
    });

    it("returns page 318 for Whitsuntide", async () => {
      mockCalendar.isWhitsuntide.mockReturnValue(true);

      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.invitatoryPage).toBe(318);
    });

    it("returns page 320 for Trinitytide", async () => {
      mockCalendar.isTrinitytide.mockReturnValue(true);

      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.invitatoryPage).toBe(320);
    });

    it("returns page 322 for Annunciation", async () => {
      mockCalendar.isAnnunciation.mockReturnValue(true);

      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.invitatoryPage).toBe(322);
    });

    it("returns page 322 for Purification", async () => {
      mockCalendar.isPurification.mockReturnValue(true);

      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.invitatoryPage).toBe(322);
    });

    it("returns page 324 for Saint Day", async () => {
      mockCalendar.isSaintDay.mockReturnValue(true);

      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.invitatoryPage).toBe(324);
    });
  });

  describe("O Antiphons (evening prayer)", () => {
    it("returns currentAntiphon during O Antiphon period", async () => {
      const oAntiphonData = {
        title: "O Sapientia",
        latin: "O Sapientia...",
        english: "O Wisdom...",
      };
      mockCalendar.getOAntiphons.mockReturnValue({
        "2025-12-25": oAntiphonData,
      });

      const { result } = renderHook(() => useDailyOffice("evening"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.currentAntiphon).toEqual(oAntiphonData);
    });

    it("returns undefined outside O Antiphon period", async () => {
      mockCalendar.getOAntiphons.mockReturnValue({});

      const { result } = renderHook(() => useDailyOffice("evening"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.currentAntiphon).toBeUndefined();
    });
  });

  describe("ferial vs festal determination", () => {
    it("isFerial=false for Lord's Days", async () => {
      mockCalendar.isLordsDay.mockReturnValue(true);

      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isFerial).toBe(false);
    });

    it("isFerial=false for Feast Days", async () => {
      mockCalendar.isFeastDay.mockReturnValue(true);

      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isFerial).toBe(false);
    });

    it("isFerial=false during Octaves (non-special days)", async () => {
      mockCalendar.isOctaveOfChristmas.mockReturnValue(true);

      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isFerial).toBe(false);
    });

    it("isFerial=true for Holy Innocents on weekday during octave", async () => {
      mockCalendar.isOctaveOfChristmas.mockReturnValue(true);
      mockCalendar.isHolyInnocents.mockReturnValue(true);
      mockCalendar.isLordsDay.mockReturnValue(false);

      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isFerial).toBe(true);
    });

    it("isFerial=true for Ember Days in Whitsuntide during octave", async () => {
      mockCalendar.isOctaveOfPentecost.mockReturnValue(true);
      mockCalendar.isEmberDayInWhitsuntide.mockReturnValue(true);

      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isFerial).toBe(true);
    });

    it("isFerial=true for solemn days", async () => {
      mockCalendar.isSolemn.mockReturnValue(true);

      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isFerial).toBe(true);
    });

    it("isFerial=true for regular weekdays (not festal)", async () => {
      // All flags false = ferial day
      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isFerial).toBe(true);
    });
  });

  describe("today data", () => {
    it("returns today as formatted date string", async () => {
      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.today).toBe("Thursday, December 25");
    });

    it("returns dateString in YYYY-MM-DD format", async () => {
      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.dateString).toBe("2025-12-25");
    });
  });

  describe("window.BGLinks integration", () => {
    it("calls BGLinks.linkVerses when loading completes", async () => {
      const mockLinkVerses = vi.fn();
      (window as unknown as { BGLinks: { version: string; linkVerses: () => void } }).BGLinks = {
        version: "",
        linkVerses: mockLinkVerses,
      };

      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect((window as unknown as { BGLinks: { version: string } }).BGLinks.version).toBe("ESV");
      expect(mockLinkVerses).toHaveBeenCalled();
    });

    it("does not error when BGLinks is undefined", async () => {
      (window as unknown as { BGLinks: unknown }).BGLinks = undefined;

      const { result } = renderHook(() => useDailyOffice("morning"));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Should complete without error
      expect(result.current.isLoading).toBe(false);
    });
  });
});
