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

describe("GET /api/lessons", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("base endpoint (all lessons)", () => {
    it("returns all lessons with liturgicalYear", async () => {
      const [req, params] = createRequest("/api/lessons");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      expect(data).toHaveProperty("liturgicalYear");
      expect(typeof data.liturgicalYear).toBe("number");
    });

    it("returns lessons for entire liturgical year", async () => {
      const [req, params] = createRequest("/api/lessons");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      // Should have many date entries (roughly 364-366 days)
      const dateKeys = Object.keys(data).filter((k) => k !== "liturgicalYear");
      expect(dateKeys.length).toBeGreaterThan(360);
      expect(dateKeys.length).toBeLessThanOrEqual(366);
    });

    it("entries are sorted chronologically", async () => {
      const [req, params] = createRequest("/api/lessons");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      const dates = Object.keys(data).filter((k) => k !== "liturgicalYear");
      for (let i = 1; i < dates.length; i++) {
        expect(dates[i] > dates[i - 1]).toBe(true);
      }
    });
  });

  describe("/api/lessons/today", () => {
    it("returns lessons for today", async () => {
      const [req, params] = createRequest("/api/lessons/today", ["today"]);
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      expect(data).toHaveProperty("liturgicalYear");

      // Should have exactly one date key besides liturgicalYear
      const dateKeys = Object.keys(data).filter((k) => k !== "liturgicalYear");
      expect(dateKeys.length).toBe(1);
    });

    it("returns lesson with title and readings", async () => {
      const [req, params] = createRequest("/api/lessons/today", ["today"]);
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      const dateKeys = Object.keys(data).filter((k) => k !== "liturgicalYear");
      const lesson = data[dateKeys[0]];

      expect(lesson).toHaveProperty("title");
      expect(lesson).toHaveProperty("morning");
      expect(lesson).toHaveProperty("evening");
    });
  });

  describe("/api/lessons/tomorrow", () => {
    it("returns lessons for tomorrow", async () => {
      const [req, params] = createRequest("/api/lessons/tomorrow", [
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

    it("returns lesson with proper structure", async () => {
      const [req, params] = createRequest("/api/lessons/tomorrow", [
        "tomorrow",
      ]);
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      const dateKeys = Object.keys(data).filter((k) => k !== "liturgicalYear");
      const lesson = data[dateKeys[0]];

      expect(lesson).toHaveProperty("title");
      expect(lesson).toHaveProperty("morning");
      expect(lesson).toHaveProperty("evening");
    });
  });

  describe("/api/lessons?date=YYYY-MM-DD", () => {
    it("returns lessons for a specific date", async () => {
      const [req, params] = createRequest("/api/lessons?date=2025-12-25");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      expect(data).toHaveProperty("liturgicalYear");
      expect(data).toHaveProperty("2025-12-25");
    });

    it("returns correct liturgical year for date", async () => {
      // December 25, 2025 is in liturgical year 2026
      const [req, params] = createRequest("/api/lessons?date=2025-12-25");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(data.liturgicalYear).toBe(2026);
    });

    it("returns Christmas Day lessons", async () => {
      const [req, params] = createRequest("/api/lessons?date=2025-12-25");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      const lesson = data["2025-12-25"];
      expect(lesson.title).toContain("Christmas");
    });

    it("returns First Sunday of Advent lessons", async () => {
      const [req, params] = createRequest("/api/lessons?date=2025-11-30");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      const lesson = data["2025-11-30"];
      expect(lesson.title).toBe("First Sunday of Advent");
    });

    it("returns Easter Sunday lessons", async () => {
      const [req, params] = createRequest("/api/lessons?date=2026-04-05");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      expect(data.liturgicalYear).toBe(2026);

      const lesson = data["2026-04-05"];
      expect(lesson.title).toContain("Easter");
    });
  });

  describe("/api/lessons?date=YYYY", () => {
    it("returns all lessons for a liturgical year", async () => {
      const [req, params] = createRequest("/api/lessons?date=2026");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      expect(data).toHaveProperty("liturgicalYear");

      // Should have many date entries
      const dateKeys = Object.keys(data).filter((k) => k !== "liturgicalYear");
      expect(dateKeys.length).toBeGreaterThan(360);
    });

    it("starts from January 1 of the specified year", async () => {
      const [req, params] = createRequest("/api/lessons?date=2026");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      // The liturgical year containing Jan 1, 2026 starts in late 2025
      const dateKeys = Object.keys(data)
        .filter((k) => k !== "liturgicalYear")
        .sort();
      expect(dateKeys[0]).toBe("2025-11-30"); // First Sunday of Advent 2025
    });
  });

  describe("lesson structure", () => {
    it("each lesson has title, morning, and evening", async () => {
      const [req, params] = createRequest("/api/lessons?date=2025-12-25");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      const lesson = data["2025-12-25"];
      expect(lesson).toHaveProperty("title");
      expect(typeof lesson.title).toBe("string");
      expect(lesson).toHaveProperty("morning");
      expect(lesson).toHaveProperty("evening");
    });

    it("morning has first and second readings", async () => {
      const [req, params] = createRequest("/api/lessons?date=2025-12-25");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      const lesson = data["2025-12-25"];
      expect(lesson.morning).toHaveProperty("first");
      expect(lesson.morning).toHaveProperty("second");
    });

    it("evening has first and second readings", async () => {
      const [req, params] = createRequest("/api/lessons?date=2025-12-25");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      const lesson = data["2025-12-25"];
      expect(lesson.evening).toHaveProperty("first");
      expect(lesson.evening).toHaveProperty("second");
    });

    it("readings are arrays of strings", async () => {
      const [req, params] = createRequest("/api/lessons?date=2025-12-25");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      const lesson = data["2025-12-25"];

      expect(Array.isArray(lesson.morning.first)).toBe(true);
      expect(Array.isArray(lesson.morning.second)).toBe(true);
      expect(Array.isArray(lesson.evening.first)).toBe(true);
      expect(Array.isArray(lesson.evening.second)).toBe(true);

      // Each reading array should contain strings
      if (lesson.morning.first.length > 0) {
        expect(typeof lesson.morning.first[0]).toBe("string");
      }
    });
  });

  describe("error handling", () => {
    it("returns 400 for invalid date format", async () => {
      const [req, params] = createRequest("/api/lessons?date=12-25-2025");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(400);
      expect(data).toHaveProperty("error");
      expect(data.error).toBe("Date is not formatted as YYYY or YYYY-MM-DD");
    });

    it("returns 400 for invalid date format with slashes", async () => {
      const [req, params] = createRequest("/api/lessons?date=2025/12/25");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(400);
      expect(data.error).toBe("Date is not formatted as YYYY or YYYY-MM-DD");
    });

    it("returns 400 for partial date format", async () => {
      const [req, params] = createRequest("/api/lessons?date=2025-12");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(400);
      expect(data.error).toBe("Date is not formatted as YYYY or YYYY-MM-DD");
    });

    it("returns 400 for invalid date value", async () => {
      const [req, params] = createRequest("/api/lessons?date=2025-13-45");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(400);
      expect(data.error).toBe("Invalid date");
    });

    it("returns 400 for February 30", async () => {
      const [req, params] = createRequest("/api/lessons?date=2025-02-30");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(400);
      expect(data.error).toBe("Invalid date");
    });

    it("returns 400 for non-leap year February 29", async () => {
      const [req, params] = createRequest("/api/lessons?date=2025-02-29");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(400);
      expect(data.error).toBe("Invalid date");
    });

    it("accepts leap year February 29", async () => {
      const [req, params] = createRequest("/api/lessons?date=2024-02-29");
      const response = await GET(req, params);

      expect(response.status).toBe(200);
    });
  });

  describe("specific liturgical dates", () => {
    it("returns Ash Wednesday lessons", async () => {
      // Ash Wednesday 2026 is February 18
      const [req, params] = createRequest("/api/lessons?date=2026-02-18");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      const lesson = data["2026-02-18"];
      expect(lesson.title).toContain("Ash Wednesday");
    });

    it("returns Good Friday lessons", async () => {
      // Good Friday 2026 is April 3
      const [req, params] = createRequest("/api/lessons?date=2026-04-03");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      const lesson = data["2026-04-03"];
      expect(lesson.title).toContain("Good Friday");
    });

    it("returns Pentecost lessons", async () => {
      // Pentecost 2026 is May 24
      const [req, params] = createRequest("/api/lessons?date=2026-05-24");
      const response = await GET(req, params);
      const data = await getJsonResponse(response);

      expect(response.status).toBe(200);
      const lesson = data["2026-05-24"];
      expect(lesson.title).toContain("Pentecost");
    });
  });
});
