import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "./route";

// Helper to create mock NextRequest
const createRequest = (
  url: string,
  slug?: string[]
): [NextRequest, { params: Promise<{ slug?: string[] }> }] => {
  const request = new NextRequest(new URL(url, "http://localhost:3000"));
  const params = { params: Promise.resolve({ slug }) };
  return [request, params];
};

// Helper to parse JSON response
const getJsonResponse = async (response: Response) => {
  return response.json();
};

describe("GET /api/collects", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("base endpoint (all collects)", () => {
    it("returns all collects with liturgicalYear", async () => {
      const [req, params] = createRequest("/api/collects");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      expect(data).toHaveProperty("liturgicalYear");
      expect(typeof data.liturgicalYear).toBe("number");
    });

    it("returns collects for entire liturgical year", async () => {
      const [req, params] = createRequest("/api/collects");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      // Should have many date entries (roughly 364-366 days)
      const dateKeys = Object.keys(data).filter((k) => k !== "liturgicalYear");
      expect(dateKeys.length).toBeGreaterThan(360);
      expect(dateKeys.length).toBeLessThanOrEqual(366);
    });

    it("entries are sorted chronologically", async () => {
      const [req, params] = createRequest("/api/collects");
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

  describe("/api/collects/today", () => {
    it("returns collects for today", async () => {
      const [req, params] = createRequest("/api/collects/today", ["today"]);
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      expect(data).toHaveProperty("liturgicalYear");

      // Should have exactly one date key besides liturgicalYear
      const dateKeys = Object.keys(data).filter((k) => k !== "liturgicalYear");
      expect(dateKeys.length).toBe(1);
    });

    it("returns array of collects for the date", async () => {
      const [req, params] = createRequest("/api/collects/today", ["today"]);
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      const dateKeys = Object.keys(data).filter((k) => k !== "liturgicalYear");
      const collects = data[dateKeys[0]];

      expect(Array.isArray(collects)).toBe(true);
    });
  });

  describe("/api/collects/tomorrow", () => {
    it("returns collects for tomorrow", async () => {
      const [req, params] = createRequest("/api/collects/tomorrow", [
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

    it("returns array of collects", async () => {
      const [req, params] = createRequest("/api/collects/tomorrow", [
        "tomorrow",
      ]);
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      const dateKeys = Object.keys(data).filter((k) => k !== "liturgicalYear");
      const collects = data[dateKeys[0]];

      expect(Array.isArray(collects)).toBe(true);
    });
  });

  describe("/api/collects?date=YYYY-MM-DD", () => {
    it("returns collects for a specific date", async () => {
      const [req, params] = createRequest("/api/collects?date=2025-12-25");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      expect(data).toHaveProperty("liturgicalYear");
      expect(data).toHaveProperty("2025-12-25");
    });

    it("returns correct liturgical year for date", async () => {
      // December 25, 2025 is in liturgical year 2026
      const [req, params] = createRequest("/api/collects?date=2025-12-25");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(data.liturgicalYear).toBe(2026);
    });

    it("returns Christmas Day collect", async () => {
      const [req, params] = createRequest("/api/collects?date=2025-12-25");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      const collects = data["2025-12-25"];
      expect(Array.isArray(collects)).toBe(true);
      expect(collects.length).toBeGreaterThan(0);

      const titles = collects.map((c: any) => c.title);
      expect(titles).toContain("Christmas Day");
    });

    it("returns First Sunday of Advent collect", async () => {
      const [req, params] = createRequest("/api/collects?date=2025-11-30");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      const collects = data["2025-11-30"];
      expect(collects.length).toBeGreaterThan(0);
      expect(collects[0].title).toBe("First Sunday of Advent");
    });

    it("returns Easter Day collect", async () => {
      const [req, params] = createRequest("/api/collects?date=2026-04-05");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      expect(data.liturgicalYear).toBe(2026);

      const collects = data["2026-04-05"];
      const titles = collects.map((c: any) => c.title);
      expect(titles).toContain("Easter Day");
    });

    it("returns empty array for date with no special collect", async () => {
      // Pick a random weekday that might not have a special collect
      const [req, params] = createRequest("/api/collects?date=2026-03-10");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      // Should return an array (possibly empty)
      expect(Array.isArray(data["2026-03-10"])).toBe(true);
    });
  });

  describe("/api/collects?date=YYYY", () => {
    it("returns all collects for a liturgical year", async () => {
      const [req, params] = createRequest("/api/collects?date=2026");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      expect(data).toHaveProperty("liturgicalYear");

      // Should have many date entries
      const dateKeys = Object.keys(data).filter((k) => k !== "liturgicalYear");
      expect(dateKeys.length).toBeGreaterThan(360);
    });

    it("starts from First Sunday of Advent", async () => {
      const [req, params] = createRequest("/api/collects?date=2026");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      // The liturgical year containing Jan 1, 2026 starts in late 2025
      const dateKeys = Object.keys(data)
        .filter((k) => k !== "liturgicalYear")
        .sort();
      expect(dateKeys[0]).toBe("2025-11-30"); // First Sunday of Advent 2025
    });
  });

  describe("collect structure", () => {
    it("each collect has title, collect, source, and date", async () => {
      const [req, params] = createRequest("/api/collects?date=2025-12-25");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      const collects = data["2025-12-25"];
      expect(collects.length).toBeGreaterThan(0);

      for (const collect of collects) {
        expect(collect).toHaveProperty("title");
        expect(collect).toHaveProperty("collect");
        expect(collect).toHaveProperty("source");
        expect(collect).toHaveProperty("date");
        expect(typeof collect.title).toBe("string");
        expect(typeof collect.collect).toBe("string");
        expect(typeof collect.source).toBe("string");
      }
    });

    it("collect text is non-empty", async () => {
      const [req, params] = createRequest("/api/collects?date=2025-12-25");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      const collects = data["2025-12-25"];
      for (const collect of collects) {
        expect(collect.collect.length).toBeGreaterThan(0);
      }
    });

    it("dates map to arrays of collects", async () => {
      const [req, params] = createRequest("/api/collects");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      const dateKeys = Object.keys(data).filter((k) => k !== "liturgicalYear");
      for (const date of dateKeys.slice(0, 10)) {
        expect(Array.isArray(data[date])).toBe(true);
      }
    });
  });

  describe("error handling", () => {
    it("returns 400 for invalid date format", async () => {
      const [req, params] = createRequest("/api/collects?date=12-25-2025");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(400);
      expect(data).toHaveProperty("error");
      expect(data.error).toBe("Date is not formatted as YYYY or YYYY-MM-DD");
    });

    it("returns 400 for invalid date format with slashes", async () => {
      const [req, params] = createRequest("/api/collects?date=2025/12/25");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(400);
      expect(data.error).toBe("Date is not formatted as YYYY or YYYY-MM-DD");
    });

    it("returns 400 for partial date format", async () => {
      const [req, params] = createRequest("/api/collects?date=2025-12");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(400);
      expect(data.error).toBe("Date is not formatted as YYYY or YYYY-MM-DD");
    });

    it("returns 400 for invalid date value", async () => {
      const [req, params] = createRequest("/api/collects?date=2025-13-45");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(400);
      expect(data.error).toBe("Invalid date");
    });

    it("returns 400 for February 30", async () => {
      const [req, params] = createRequest("/api/collects?date=2025-02-30");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(400);
      expect(data.error).toBe("Invalid date");
    });

    it("returns 400 for non-leap year February 29", async () => {
      const [req, params] = createRequest("/api/collects?date=2025-02-29");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(400);
      expect(data.error).toBe("Invalid date");
    });

    it("accepts leap year February 29", async () => {
      const [req, params] = createRequest("/api/collects?date=2024-02-29");
      const response = await GET(req, params);

      expect(response.status).toBe(200);
    });
  });

  describe("specific liturgical dates", () => {
    it("returns Ash Wednesday collect", async () => {
      // Ash Wednesday 2026 is February 18
      const [req, params] = createRequest("/api/collects?date=2026-02-18");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      const collects = data["2026-02-18"];
      const titles = collects.map((c: any) => c.title);
      expect(titles).toContain("Ash Wednesday");
    });

    it("returns Good Friday collect", async () => {
      // Good Friday 2026 is April 3
      const [req, params] = createRequest("/api/collects?date=2026-04-03");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      const collects = data["2026-04-03"];
      const titles = collects.map((c: any) => c.title);
      expect(titles.some((t: string) => t.includes("Good Friday"))).toBe(true);
    });

    it("returns Pentecost collect", async () => {
      // Pentecost 2026 is May 24
      const [req, params] = createRequest("/api/collects?date=2026-05-24");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      const collects = data["2026-05-24"];
      const titles = collects.map((c: any) => c.title);
      expect(titles.some((t: string) => t.includes("Pentecost"))).toBe(true);
    });

    it("returns Trinity Sunday collect", async () => {
      // Trinity Sunday 2026 is May 31
      const [req, params] = createRequest("/api/collects?date=2026-05-31");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      const collects = data["2026-05-31"];
      const titles = collects.map((c: any) => c.title);
      expect(titles).toContain("Trinity Sunday");
    });

    it("returns Epiphany collect", async () => {
      const [req, params] = createRequest("/api/collects?date=2026-01-06");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      const collects = data["2026-01-06"];
      const titles = collects.map((c: any) => c.title);
      expect(titles).toContain("The Epiphany");
    });
  });
});
