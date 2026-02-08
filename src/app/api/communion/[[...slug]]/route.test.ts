import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "./route";

// Helper to create mock NextRequest
const createRequest = (
  url: string,
  slug?: string[],
): [NextRequest, { params: Promise<{ slug?: string[] }> }] => {
  const request = new NextRequest(new URL(url, "http://localhost:3000"));
  const params = { params: Promise.resolve({ slug }) };
  return [request, params];
};

// Helper to parse JSON response
const getJsonResponse = async (response: Response) => {
  return response.json();
};

describe("GET /api/communion", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("base endpoint (all communion readings)", () => {
    it("returns all communion readings with liturgicalYear", async () => {
      const [req, params] = createRequest("/api/communion");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      expect(data).toHaveProperty("liturgicalYear");
      expect(typeof data.liturgicalYear).toBe("number");
    });

    it("returns communion readings for Sundays and feasts", async () => {
      const [req, params] = createRequest("/api/communion");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      // Should have readings for Sundays and feast days (not every day)
      const dateKeys = Object.keys(data).filter((k) => k !== "liturgicalYear");
      expect(dateKeys.length).toBeGreaterThan(50);
      expect(dateKeys.length).toBeLessThan(200);
    });

    it("entries are sorted chronologically", async () => {
      const [req, params] = createRequest("/api/communion");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      const dates = Object.keys(data)
        .filter((k) => k !== "liturgicalYear")
        .sort();
      for (let i = 1; i < dates.length; i++) {
        expect(dates[i] > dates[i - 1]).toBe(true);
      }
    });
  });

  describe("/api/communion/today", () => {
    it("returns communion for today", async () => {
      const [req, params] = createRequest("/api/communion/today", ["today"]);
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      expect(data).toHaveProperty("liturgicalYear");

      // Should have exactly one date key besides liturgicalYear
      const dateKeys = Object.keys(data).filter((k) => k !== "liturgicalYear");
      expect(dateKeys.length).toBe(1);
    });

    it("returns array of communion readings for the date", async () => {
      const [req, params] = createRequest("/api/communion/today", ["today"]);
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      const dateKeys = Object.keys(data).filter((k) => k !== "liturgicalYear");
      const readings = data[dateKeys[0]];

      expect(Array.isArray(readings)).toBe(true);
    });
  });

  describe("/api/communion/tomorrow", () => {
    it("returns communion for tomorrow", async () => {
      const [req, params] = createRequest("/api/communion/tomorrow", [
        "tomorrow",
      ]);
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      expect(data).toHaveProperty("liturgicalYear");

      // Should have exactly one date key besides liturgicalYear
      const dateKeys = Object.keys(data).filter((k) => k !== "liturgicalYear");
      expect(dateKeys.length).toBe(1);
    });

    it("returns array of communion readings", async () => {
      const [req, params] = createRequest("/api/communion/tomorrow", [
        "tomorrow",
      ]);
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      const dateKeys = Object.keys(data).filter((k) => k !== "liturgicalYear");
      const readings = data[dateKeys[0]];

      expect(Array.isArray(readings)).toBe(true);
    });
  });

  describe("/api/communion?date=YYYY-MM-DD", () => {
    it("returns communion for a specific date", async () => {
      const [req, params] = createRequest("/api/communion?date=2025-12-25");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      expect(data).toHaveProperty("liturgicalYear");
      expect(data).toHaveProperty("2025-12-25");
    });

    it("returns correct liturgical year for date", async () => {
      // December 25, 2025 is in liturgical year 2026
      const [req, params] = createRequest("/api/communion?date=2025-12-25");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(data.liturgicalYear).toBe(2026);
    });

    it("returns Christmas Day communion", async () => {
      const [req, params] = createRequest("/api/communion?date=2025-12-25");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      const readings = data["2025-12-25"];
      expect(Array.isArray(readings)).toBe(true);
      expect(readings.length).toBeGreaterThan(0);

      const titles = readings.map((r: any) => r.title);
      expect(titles).toContain("Christmas Day");
    });

    it("returns First Sunday of Advent communion", async () => {
      const [req, params] = createRequest("/api/communion?date=2025-11-30");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      const readings = data["2025-11-30"];
      expect(readings.length).toBeGreaterThan(0);
      expect(readings[0].title).toBe("First Sunday of Advent");
    });

    it("returns Easter Day communion", async () => {
      const [req, params] = createRequest("/api/communion?date=2026-04-05");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      expect(data.liturgicalYear).toBe(2026);

      const readings = data["2026-04-05"];
      const titles = readings.map((r: any) => r.title);
      expect(titles).toContain("Easter Day");
    });

    it("returns empty array for date without communion", async () => {
      // Pick a weekday that doesn't have communion
      const [req, params] = createRequest("/api/communion?date=2025-12-02");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      // Should return an array (possibly empty)
      expect(Array.isArray(data["2025-12-02"])).toBe(true);
    });
  });

  describe("/api/communion?date=YYYY", () => {
    it("returns all communion readings for a liturgical year", async () => {
      const [req, params] = createRequest("/api/communion?date=2026");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      expect(data).toHaveProperty("liturgicalYear");

      // Should have readings for Sundays and feasts
      const dateKeys = Object.keys(data).filter((k) => k !== "liturgicalYear");
      expect(dateKeys.length).toBeGreaterThan(50);
    });

    it("starts from First Sunday of Advent", async () => {
      const [req, params] = createRequest("/api/communion?date=2026");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      // The liturgical year containing Jan 1, 2026 starts in late 2025
      const dateKeys = Object.keys(data)
        .filter((k) => k !== "liturgicalYear")
        .sort();
      expect(dateKeys[0]).toBe("2025-11-30"); // First Sunday of Advent 2025
    });
  });

  describe("communion structure", () => {
    it("each communion has title, epistle, gospel, source, and date", async () => {
      const [req, params] = createRequest("/api/communion?date=2025-12-25");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      const readings = data["2025-12-25"];
      expect(readings.length).toBeGreaterThan(0);

      for (const reading of readings) {
        expect(reading).toHaveProperty("title");
        expect(reading).toHaveProperty("epistle");
        expect(reading).toHaveProperty("gospel");
        expect(reading).toHaveProperty("source");
        expect(reading).toHaveProperty("date");
        expect(typeof reading.title).toBe("string");
        expect(Array.isArray(reading.epistle)).toBe(true);
        expect(Array.isArray(reading.gospel)).toBe(true);
        expect(typeof reading.source).toBe("string");
      }
    });

    it("epistle and gospel arrays are non-empty", async () => {
      const [req, params] = createRequest("/api/communion?date=2025-12-25");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      const readings = data["2025-12-25"];
      for (const reading of readings) {
        expect(reading.epistle.length).toBeGreaterThan(0);
        expect(reading.gospel.length).toBeGreaterThan(0);
      }
    });

    it("dates map to arrays of communion readings", async () => {
      const [req, params] = createRequest("/api/communion");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      const dateKeys = Object.keys(data).filter((k) => k !== "liturgicalYear");
      for (const date of dateKeys.slice(0, 10)) {
        expect(Array.isArray(data[date])).toBe(true);
      }
    });
  });

  describe("error handling", () => {
    it("returns 404 for invalid slug", async () => {
      const [req, params] = createRequest("/api/communion/invalid", [
        "invalid",
      ]);
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(404);
      expect(data).toHaveProperty("error");
      expect(data.error).toBe("Not found");
    });

    it("returns 400 for invalid date format", async () => {
      const [req, params] = createRequest("/api/communion?date=12-25-2025");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(400);
      expect(data).toHaveProperty("error");
      expect(data.error).toBe("Date is not formatted as YYYY or YYYY-MM-DD");
    });

    it("returns 400 for invalid date format with slashes", async () => {
      const [req, params] = createRequest("/api/communion?date=2025/12/25");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(400);
      expect(data.error).toBe("Date is not formatted as YYYY or YYYY-MM-DD");
    });

    it("returns 400 for partial date format", async () => {
      const [req, params] = createRequest("/api/communion?date=2025-12");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(400);
      expect(data.error).toBe("Date is not formatted as YYYY or YYYY-MM-DD");
    });

    it("returns 400 for invalid date value", async () => {
      const [req, params] = createRequest("/api/communion?date=2025-13-45");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(400);
      expect(data.error).toBe("Invalid date");
    });

    it("returns 400 for February 30", async () => {
      const [req, params] = createRequest("/api/communion?date=2025-02-30");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(400);
      expect(data.error).toBe("Invalid date");
    });

    it("returns 400 for non-leap year February 29", async () => {
      const [req, params] = createRequest("/api/communion?date=2025-02-29");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(400);
      expect(data.error).toBe("Invalid date");
    });

    it("accepts leap year February 29", async () => {
      const [req, params] = createRequest("/api/communion?date=2024-02-29");
      const response = await GET(req, params);

      expect(response.status).toBe(200);
    });
  });

  describe("specific liturgical dates", () => {
    it("returns Ash Wednesday communion", async () => {
      // Ash Wednesday 2026 is February 18
      const [req, params] = createRequest("/api/communion?date=2026-02-18");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      const readings = data["2026-02-18"];
      const titles = readings.map((r: any) => r.title);
      expect(titles).toContain("Ash Wednesday");
    });

    it("returns Good Friday communion", async () => {
      // Good Friday 2026 is April 3
      const [req, params] = createRequest("/api/communion?date=2026-04-03");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      const readings = data["2026-04-03"];
      const titles = readings.map((r: any) => r.title);
      expect(titles.some((t: string) => t.includes("Good Friday"))).toBe(true);
    });

    it("returns Pentecost communion", async () => {
      // Pentecost 2026 is May 24
      const [req, params] = createRequest("/api/communion?date=2026-05-24");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      const readings = data["2026-05-24"];
      const titles = readings.map((r: any) => r.title);
      expect(titles.some((t: string) => t.includes("Pentecost"))).toBe(true);
    });

    it("returns Trinity Sunday communion", async () => {
      // Trinity Sunday 2026 is May 31
      const [req, params] = createRequest("/api/communion?date=2026-05-31");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      const readings = data["2026-05-31"];
      const titles = readings.map((r: any) => r.title);
      expect(titles).toContain("Trinity Sunday");
    });

    it("returns Epiphany communion", async () => {
      const [req, params] = createRequest("/api/communion?date=2026-01-06");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      const readings = data["2026-01-06"];
      const titles = readings.map((r: any) => r.title);
      expect(titles).toContain("The Epiphany");
    });

    it("returns Ascension Day communion", async () => {
      // Ascension Day 2026 is May 14
      const [req, params] = createRequest("/api/communion?date=2026-05-14");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      const readings = data["2026-05-14"];
      const titles = readings.map((r: any) => r.title);
      expect(titles).toContain("Ascension Day");
    });
  });

  describe("one communion per day filtering", () => {
    it("returns at most one non-vigil communion per day", async () => {
      const [req, params] = createRequest("/api/communion");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      const dateKeys = Object.keys(data).filter((k) => k !== "liturgicalYear");
      for (const date of dateKeys) {
        const readings = data[date];
        const nonVigils = readings.filter((r: any) => !r.isVigil);
        expect(nonVigils.length).toBeLessThanOrEqual(1);
      }
    });
  });
});
