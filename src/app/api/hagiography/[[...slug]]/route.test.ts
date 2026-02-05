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

describe("GET /api/hagiography", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("base endpoint (all readings)", () => {
    it("returns all readings with liturgicalYear", async () => {
      const [req, params] = createRequest("/api/hagiography");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      expect(data).toHaveProperty("liturgicalYear");
      expect(typeof data.liturgicalYear).toBe("number");
    });

    it("returns readings keyed by date", async () => {
      const [req, params] = createRequest("/api/hagiography");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      const dateKeys = Object.keys(data).filter((k) => k !== "liturgicalYear");
      expect(dateKeys.length).toBeGreaterThan(0);

      // All keys should be dates
      for (const key of dateKeys) {
        expect(key).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    });

    it("only includes dates with readings", async () => {
      const [req, params] = createRequest("/api/hagiography");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      const dateKeys = Object.keys(data).filter((k) => k !== "liturgicalYear");
      // Should have far fewer than 365 days
      expect(dateKeys.length).toBeLessThan(100);
      expect(dateKeys.length).toBeGreaterThan(20);
    });
  });

  describe("/api/hagiography/today", () => {
    it("returns reading for today with liturgicalYear", async () => {
      const [req, params] = createRequest("/api/hagiography/today", ["today"]);
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      expect(data).toHaveProperty("liturgicalYear");

      // Should have exactly one date key besides liturgicalYear
      const dateKeys = Object.keys(data).filter((k) => k !== "liturgicalYear");
      expect(dateKeys.length).toBe(1);
    });

    it("date key matches today's date format", async () => {
      const [req, params] = createRequest("/api/hagiography/today", ["today"]);
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      const dateKeys = Object.keys(data).filter((k) => k !== "liturgicalYear");
      expect(dateKeys[0]).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  describe("/api/hagiography/tomorrow", () => {
    it("returns reading for tomorrow", async () => {
      const [req, params] = createRequest("/api/hagiography/tomorrow", [
        "tomorrow",
      ]);
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      expect(data).toHaveProperty("liturgicalYear");

      const dateKeys = Object.keys(data).filter((k) => k !== "liturgicalYear");
      expect(dateKeys.length).toBe(1);
    });
  });

  describe("/api/hagiography?date=YYYY-MM-DD", () => {
    it("returns reading for specific date", async () => {
      const [req, params] = createRequest("/api/hagiography?date=2025-12-06");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      expect(data).toHaveProperty("liturgicalYear");
      expect(data).toHaveProperty("2025-12-06");
    });

    it("returns Saint Nicholas reading for Dec 6", async () => {
      const [req, params] = createRequest("/api/hagiography?date=2025-12-06");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      const reading = data["2025-12-06"];
      expect(reading).not.toBeNull();
      expect(reading.title).toBe("Saint Nicholas, Bishop");
    });

    it("returns null for date without reading", async () => {
      const [req, params] = createRequest("/api/hagiography?date=2025-12-25");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      expect(data["2025-12-25"]).toBeNull();
    });
  });

  describe("/api/hagiography?date=YYYY", () => {
    it("returns all readings for a liturgical year", async () => {
      const [req, params] = createRequest("/api/hagiography?date=2026");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      expect(data).toHaveProperty("liturgicalYear");

      const dateKeys = Object.keys(data).filter((k) => k !== "liturgicalYear");
      expect(dateKeys.length).toBeGreaterThan(20);
    });

    it("starts from First Sunday of Advent", async () => {
      const [req, params] = createRequest("/api/hagiography?date=2026");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      const dateKeys = Object.keys(data)
        .filter((k) => k !== "liturgicalYear")
        .sort();

      // First reading should be on or after First Sunday of Advent 2025
      expect(dateKeys[0] >= "2025-11-30").toBe(true);
    });
  });

  describe("invalid slugs", () => {
    it("returns 404 for invalid slug", async () => {
      const [req, params] = createRequest("/api/hagiography/invalid", [
        "invalid",
      ]);
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(404);
      expect(data).toHaveProperty("error");
      expect(data.error).toBe("Not found");
    });

    it("returns 404 for nested invalid slug", async () => {
      const [req, params] = createRequest("/api/hagiography/foo/bar", [
        "foo",
        "bar",
      ]);
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(404);
      expect(data.error).toBe("Not found");
    });
  });

  describe("error handling", () => {
    it("returns 400 for invalid date format", async () => {
      const [req, params] = createRequest("/api/hagiography?date=12-25-2025");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(400);
      expect(data).toHaveProperty("error");
      expect(data.error).toBe("Date is not formatted as YYYY or YYYY-MM-DD");
    });

    it("returns 400 for invalid date format with slashes", async () => {
      const [req, params] = createRequest("/api/hagiography?date=2025/12/25");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(400);
      expect(data.error).toBe("Date is not formatted as YYYY or YYYY-MM-DD");
    });

    it("returns 400 for partial date format", async () => {
      const [req, params] = createRequest("/api/hagiography?date=2025-12");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(400);
      expect(data.error).toBe("Date is not formatted as YYYY or YYYY-MM-DD");
    });

    it("returns 400 for invalid date value", async () => {
      const [req, params] = createRequest("/api/hagiography?date=2025-13-45");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(400);
      expect(data.error).toBe("Invalid date");
    });

    it("returns 400 for February 30", async () => {
      const [req, params] = createRequest("/api/hagiography?date=2025-02-30");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(400);
      expect(data.error).toBe("Invalid date");
    });

    it("returns 400 for non-leap year February 29", async () => {
      const [req, params] = createRequest("/api/hagiography?date=2025-02-29");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(400);
      expect(data.error).toBe("Invalid date");
    });

    it("accepts leap year February 29", async () => {
      const [req, params] = createRequest("/api/hagiography?date=2024-02-29");
      const response = await GET(req, params);

      expect(response.status).toBe(200);
    });
  });

  describe("response structure", () => {
    it("reading has title field", async () => {
      const [req, params] = createRequest("/api/hagiography?date=2025-12-06");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      const reading = data["2025-12-06"];
      expect(reading).toHaveProperty("title");
      expect(typeof reading.title).toBe("string");
    });

    it("reading has morning field", async () => {
      const [req, params] = createRequest("/api/hagiography?date=2025-12-06");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      const reading = data["2025-12-06"];
      expect(reading).toHaveProperty("morning");
      expect(typeof reading.morning).toBe("string");
    });

    it("reading may have evening field", async () => {
      const [req, params] = createRequest("/api/hagiography?date=2025-12-06");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      const reading = data["2025-12-06"];
      // Saint Nicholas has evening
      expect(reading).toHaveProperty("evening");
      expect(typeof reading.evening).toBe("string");
    });

    it("reading may have link field", async () => {
      const [req, params] = createRequest("/api/hagiography?date=2025-12-13");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      const reading = data["2025-12-13"];
      // Saint Lucy has link
      expect(reading).toHaveProperty("link");
      expect(typeof reading.link).toBe("string");
      expect(reading.link).toContain("/people/saints/");
    });
  });

  describe("specific dates", () => {
    it("returns Saint Nicholas reading for Dec 6", async () => {
      const [req, params] = createRequest("/api/hagiography?date=2025-12-06");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      const reading = data["2025-12-06"];
      expect(reading.title).toBe("Saint Nicholas, Bishop");
      expect(reading.morning).toBe("LFF 554, pars. 1-2");
    });

    it("returns null for Christmas (not a saint)", async () => {
      const [req, params] = createRequest("/api/hagiography?date=2025-12-25");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      expect(data["2025-12-25"]).toBeNull();
    });

    it("returns Saint Hilary reading for Jan 13", async () => {
      const [req, params] = createRequest("/api/hagiography?date=2026-01-13");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      const reading = data["2026-01-13"];
      expect(reading.title).toBe(
        "Saint Hilary, Bishop and Doctor of the Church"
      );
    });
  });
});
