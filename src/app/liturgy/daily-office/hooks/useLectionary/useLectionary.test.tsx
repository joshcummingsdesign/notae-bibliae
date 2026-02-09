import { renderHook, waitFor, act } from "@testing-library/react";
import { vi, beforeEach, afterEach, describe, it, expect } from "vitest";

// Create mock calendar instance that will be returned by Calendar constructor
const createMockCalendar = (dateString: string, formattedDate: string) => ({
  getToday: vi.fn(() => ({
    format: vi.fn((fmt: string) =>
      fmt === "YYYY-MM-DD" ? dateString : formattedDate
    ),
    add: vi.fn(() => ({
      format: vi.fn((fmt: string) =>
        fmt === "YYYY-MM-DD" ? "2025-12-26" : "Friday, December 26, 2025"
      ),
    })),
  })),
});

let mockTodayCalendar = createMockCalendar(
  "2025-12-25",
  "Thursday, December 25, 2025"
);
let mockTomorrowCalendar = createMockCalendar(
  "2025-12-26",
  "Friday, December 26, 2025"
);

// Mock the Calendar class before importing the hook
vi.mock("@/models/calendar", () => {
  return {
    Calendar: function (date?: unknown) {
      // If date is passed, it's tomorrow's calendar
      if (date) {
        return mockTomorrowCalendar;
      }
      return mockTodayCalendar;
    },
  };
});

// Import after mocking
import { useLectionary } from "./useLectionary";

// Mock API responses
const mockTodayResponse = {
  liturgicalYear: 2026,
  "2025-12-25": {
    season: "Christmastide",
    primaryObservance: "Christmas Day",
    morning: {
      first: ["Isaiah 9:2-7"],
      second: ["Luke 2:1-14"],
      collects: [{ title: "Christmas Day", text: "Almighty God..." }],
    },
    evening: {
      first: ["Isaiah 62:1-5"],
      second: ["Matthew 1:18-25"],
      collects: [{ title: "Christmas Day", text: "Almighty God..." }],
    },
  },
};

const mockTomorrowResponse = {
  liturgicalYear: 2026,
  "2025-12-26": {
    season: "Christmastide",
    primaryObservance: "St. Stephen",
    morning: {
      first: ["2 Chronicles 24:17-22"],
      second: ["Acts 6:8-7:2a, 51-60"],
      collects: [{ title: "St. Stephen", text: "Grant, O Lord..." }],
    },
    evening: {
      first: ["Genesis 4:1-10"],
      second: ["Acts 7:54-60"],
      collects: [{ title: "St. Stephen", text: "Grant, O Lord..." }],
    },
  },
};

// Helper to setup fetch mock
const mockFetch = () => {
  global.fetch = vi.fn((input: RequestInfo | URL) => {
    const url = typeof input === "string" ? input : input.toString();
    if (url.includes("/api/lectionary/today")) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTodayResponse),
      } as Response);
    }
    if (url.includes("/api/lectionary/tomorrow")) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTomorrowResponse),
      } as Response);
    }
    return Promise.reject(new Error("Unknown URL"));
  }) as typeof fetch;
};

describe("useLectionary", () => {
  beforeEach(() => {
    mockTodayCalendar = createMockCalendar(
      "2025-12-25",
      "Thursday, December 25, 2025"
    );
    mockTomorrowCalendar = createMockCalendar(
      "2025-12-26",
      "Friday, December 26, 2025"
    );

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
      const { result } = renderHook(() => useLectionary());
      expect(result.current.isLoading).toBe(true);
    });

    it("sets isLoading=false after data loads", async () => {
      const { result } = renderHook(() => useLectionary());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });
  });

  describe("data fetching", () => {
    it("fetches from both today and tomorrow endpoints", async () => {
      renderHook(() => useLectionary());

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledTimes(2);
      });

      expect(global.fetch).toHaveBeenCalledWith(
        "/api/lectionary/today?withLinks=true"
      );
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/lectionary/tomorrow?withLinks=true"
      );
    });

    it("sets today data from response", async () => {
      const { result } = renderHook(() => useLectionary());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.today.data).not.toBeNull();
      expect(result.current.today.data?.primaryObservance).toBe("Christmas Day");
      expect(result.current.today.date).toBe("Thursday, December 25, 2025");
    });

    it("sets tomorrow data from response", async () => {
      const { result } = renderHook(() => useLectionary());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.tomorrow.data).not.toBeNull();
      expect(result.current.tomorrow.data?.primaryObservance).toBe(
        "St. Stephen"
      );
      expect(result.current.tomorrow.date).toBe("Friday, December 26, 2025");
    });

    it("handles fetch errors gracefully", async () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      global.fetch = vi.fn(() => Promise.reject(new Error("Network error")));

      const { result } = renderHook(() => useLectionary());

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith(
          "Error fetching lectionary data:",
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
        "2025-12-25": { data: mockTodayResponse },
        "2025-12-26": { data: mockTomorrowResponse },
      };
      localStorage.setItem("lectionary", JSON.stringify(cachedData));

      const { result } = renderHook(() => useLectionary());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Should not have fetched since cache was used
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it("fetches fresh data if cache is missing today", async () => {
      const cachedData = {
        "2025-12-24": { data: mockTodayResponse },
        "2025-12-26": { data: mockTomorrowResponse },
      };
      localStorage.setItem("lectionary", JSON.stringify(cachedData));

      renderHook(() => useLectionary());

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledTimes(2);
      });
    });

    it("fetches fresh data if cache is missing tomorrow", async () => {
      const cachedData = {
        "2025-12-25": { data: mockTodayResponse },
        "2025-12-27": { data: mockTomorrowResponse },
      };
      localStorage.setItem("lectionary", JSON.stringify(cachedData));

      renderHook(() => useLectionary());

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledTimes(2);
      });
    });

    it("stores data in localStorage after successful fetch", async () => {
      const { result } = renderHook(() => useLectionary());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const cached = localStorage.getItem("lectionary");
      expect(cached).not.toBeNull();

      const parsed = JSON.parse(cached!);
      expect(parsed["2025-12-25"]).toBeDefined();
      expect(parsed["2025-12-25"].data).toBeDefined();
      expect(parsed["2025-12-26"]).toBeDefined();
      expect(parsed["2025-12-26"].data).toBeDefined();
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

      const { result } = renderHook(() => useLectionary());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(
        (window as unknown as { BGLinks: { version: string } }).BGLinks.version
      ).toBe("ESV");
      expect(mockLinkVerses).toHaveBeenCalled();
    });

    it("does not error when BGLinks is undefined", async () => {
      (window as unknown as { BGLinks: unknown }).BGLinks = undefined;

      const { result } = renderHook(() => useLectionary());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Should complete without error
      expect(result.current.isLoading).toBe(false);
    });

    it("exposes refreshBibleGatewayLinks function", async () => {
      const mockLinkVerses = vi.fn();
      (
        window as unknown as {
          BGLinks: { version: string; linkVerses: () => void };
        }
      ).BGLinks = {
        version: "",
        linkVerses: mockLinkVerses,
      };

      const { result } = renderHook(() => useLectionary());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Reset mock to check manual call
      mockLinkVerses.mockClear();

      act(() => {
        result.current.refreshBibleGatewayLinks();
      });

      expect(mockLinkVerses).toHaveBeenCalledTimes(1);
    });
  });

  describe("returned data structure", () => {
    it("returns today with date and data properties", async () => {
      const { result } = renderHook(() => useLectionary());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.today).toHaveProperty("date");
      expect(result.current.today).toHaveProperty("data");
    });

    it("returns tomorrow with date and data properties", async () => {
      const { result } = renderHook(() => useLectionary());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.tomorrow).toHaveProperty("date");
      expect(result.current.tomorrow).toHaveProperty("data");
    });

    it("returns null data before loading completes", () => {
      const { result } = renderHook(() => useLectionary());

      expect(result.current.today.data).toBeNull();
      expect(result.current.tomorrow.data).toBeNull();
    });
  });
});
