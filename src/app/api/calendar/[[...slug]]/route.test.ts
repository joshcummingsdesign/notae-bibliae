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

describe("GET /api/calendar", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("base endpoint (all seasons)", () => {
    it("returns all calendar items with liturgicalYear", async () => {
      const [req, params] = createRequest("/api/calendar");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      expect(data).toHaveProperty("liturgicalYear");
      expect(typeof data.liturgicalYear).toBe("number");
    });

    it("returns season data in the response", async () => {
      const [req, params] = createRequest("/api/calendar");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      // Should have at least one season key besides liturgicalYear
      const keys = Object.keys(data).filter((k) => k !== "liturgicalYear");
      expect(keys.length).toBeGreaterThan(0);
    });

    it("strips markdown links by default", async () => {
      const [req, params] = createRequest("/api/calendar");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      // Check that no markdown link patterns exist in titles
      const seasons = Object.keys(data).filter((k) => k !== "liturgicalYear");
      for (const season of seasons) {
        const dates = Object.keys(data[season]);
        for (const date of dates) {
          for (const item of data[season][date]) {
            expect(item.title).not.toMatch(/\[.*\]\(.*\)/);
          }
        }
      }
    });

    it("preserves markdown links when withLinks=true", async () => {
      const [req, params] = createRequest("/api/calendar?withLinks=true");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      expect(data).toHaveProperty("liturgicalYear");
    });
  });

  describe("/api/calendar/today", () => {
    it("returns items for today", async () => {
      const [req, params] = createRequest("/api/calendar/today", ["today"]);
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      expect(data).toHaveProperty("liturgicalYear");

      // Should have exactly one season key besides liturgicalYear
      const keys = Object.keys(data).filter((k) => k !== "liturgicalYear");
      expect(keys.length).toBe(1);

      // The season should contain exactly one date entry
      const season = keys[0];
      const dates = Object.keys(data[season]);
      expect(dates.length).toBe(1);
    });

    it("returns items with stripped links by default", async () => {
      const [req, params] = createRequest("/api/calendar/today", ["today"]);
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      const keys = Object.keys(data).filter((k) => k !== "liturgicalYear");
      const season = keys[0];
      const dates = Object.keys(data[season]);
      const items = data[season][dates[0]];

      for (const item of items) {
        expect(item.title).not.toMatch(/\[.*\]\(.*\)/);
      }
    });
  });

  describe("/api/calendar/tomorrow", () => {
    it("returns items for tomorrow", async () => {
      const [req, params] = createRequest("/api/calendar/tomorrow", [
        "tomorrow",
      ]);
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      expect(data).toHaveProperty("liturgicalYear");

      // Should have exactly one season key besides liturgicalYear
      const keys = Object.keys(data).filter((k) => k !== "liturgicalYear");
      expect(keys.length).toBe(1);

      // The season should contain exactly one date entry
      const season = keys[0];
      const dates = Object.keys(data[season]);
      expect(dates.length).toBe(1);
    });
  });

  describe("/api/calendar?date=YYYY-MM-DD", () => {
    it("returns items for a specific date", async () => {
      const [req, params] = createRequest("/api/calendar?date=2025-12-25");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      expect(data).toHaveProperty("liturgicalYear");

      const keys = Object.keys(data).filter((k) => k !== "liturgicalYear");
      expect(keys.length).toBe(1);

      const season = keys[0];
      expect(data[season]).toHaveProperty("2025-12-25");
    });

    it("returns correct liturgical year for date", async () => {
      // December 25, 2025 is in liturgical year 2026
      const [req, params] = createRequest("/api/calendar?date=2025-12-25");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(data.liturgicalYear).toBe(2026);
    });

    it("returns items for Easter Sunday", async () => {
      const [req, params] = createRequest("/api/calendar?date=2026-04-05");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      expect(data).toHaveProperty("liturgicalYear");
      expect(data.liturgicalYear).toBe(2026);
    });
  });

  describe("/api/calendar?date=YYYY", () => {
    it("returns all items for a liturgical year", async () => {
      const [req, params] = createRequest("/api/calendar?date=2026");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      expect(data).toHaveProperty("liturgicalYear");

      // Should have multiple seasons
      const keys = Object.keys(data).filter((k) => k !== "liturgicalYear");
      expect(keys.length).toBeGreaterThan(0);
    });
  });

  describe("withLinks parameter", () => {
    it("strips markdown links when withLinks is not set", async () => {
      const [req, params] = createRequest("/api/calendar?date=2025-12-25");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      const keys = Object.keys(data).filter((k) => k !== "liturgicalYear");
      const season = keys[0];
      const items = data[season]["2025-12-25"];

      for (const item of items) {
        expect(item.title).not.toMatch(/\[.*\]\(.*\)/);
      }
    });

    it("strips markdown links when withLinks=false", async () => {
      const [req, params] = createRequest(
        "/api/calendar?date=2025-12-25&withLinks=false"
      );
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      const keys = Object.keys(data).filter((k) => k !== "liturgicalYear");
      const season = keys[0];
      const items = data[season]["2025-12-25"];

      for (const item of items) {
        expect(item.title).not.toMatch(/\[.*\]\(.*\)/);
      }
    });

    it("preserves markdown links when withLinks=true for specific date", async () => {
      const [req, params] = createRequest(
        "/api/calendar?date=2025-12-25&withLinks=true"
      );
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      // Response structure should be valid
      const keys = Object.keys(data).filter((k) => k !== "liturgicalYear");
      expect(keys.length).toBe(1);
    });

    it("preserves markdown links when withLinks=true for today", async () => {
      const [req, params] = createRequest(
        "/api/calendar/today?withLinks=true",
        ["today"]
      );
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
    });
  });

  describe("error handling", () => {
    it("returns 400 for invalid date format", async () => {
      const [req, params] = createRequest("/api/calendar?date=12-25-2025");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(400);
      expect(data).toHaveProperty("error");
      expect(data.error).toBe("Date is not formatted as YYYY or YYYY-MM-DD");
    });

    it("returns 400 for invalid date format with slashes", async () => {
      const [req, params] = createRequest("/api/calendar?date=2025/12/25");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(400);
      expect(data.error).toBe("Date is not formatted as YYYY or YYYY-MM-DD");
    });

    it("returns 400 for partial date format", async () => {
      const [req, params] = createRequest("/api/calendar?date=2025-12");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(400);
      expect(data.error).toBe("Date is not formatted as YYYY or YYYY-MM-DD");
    });

    it("returns 400 for invalid date value", async () => {
      const [req, params] = createRequest("/api/calendar?date=2025-13-45");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(400);
      expect(data.error).toBe("Invalid date");
    });

    it("returns 400 for February 30", async () => {
      const [req, params] = createRequest("/api/calendar?date=2025-02-30");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(400);
      expect(data.error).toBe("Invalid date");
    });

    it("returns 400 for non-leap year February 29", async () => {
      const [req, params] = createRequest("/api/calendar?date=2025-02-29");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(400);
      expect(data.error).toBe("Invalid date");
    });

    it("accepts leap year February 29", async () => {
      const [req, params] = createRequest("/api/calendar?date=2024-02-29");
      const response = await GET(req, params);

      expect(response.status).toBe(200);
    });
  });

  describe("response structure", () => {
    it("returns items with expected properties", async () => {
      const [req, params] = createRequest("/api/calendar?date=2025-12-25");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      const keys = Object.keys(data).filter((k) => k !== "liturgicalYear");
      const season = keys[0];
      const items = data[season]["2025-12-25"];

      expect(Array.isArray(items)).toBe(true);
      if (items.length > 0) {
        const item = items[0];
        expect(item).toHaveProperty("title");
        expect(typeof item.title).toBe("string");
      }
    });

    it("groups items by season and date", async () => {
      const [req, params] = createRequest("/api/calendar?date=2025-12-25");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      // Structure should be: { liturgicalYear, [season]: { [date]: items[] } }
      expect(typeof data.liturgicalYear).toBe("number");

      const seasons = Object.keys(data).filter((k) => k !== "liturgicalYear");
      for (const season of seasons) {
        expect(typeof data[season]).toBe("object");
        const dates = Object.keys(data[season]);
        for (const date of dates) {
          expect(Array.isArray(data[season][date])).toBe(true);
        }
      }
    });
  });
});
