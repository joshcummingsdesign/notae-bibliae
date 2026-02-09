import { describe, it, expect, beforeAll } from "vitest";
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

describe("GET /api/lectionary", () => {
  // Cache responses to avoid repeated expensive calls
  let baseResponse: Response;
  let baseData: Record<string, unknown>;
  let todayResponse: Response;
  let todayData: Record<string, unknown>;
  let tomorrowResponse: Response;
  let tomorrowData: Record<string, unknown>;
  let christmasResponse: Response;
  let christmasData: Record<string, unknown>;
  let advent1Response: Response;
  let advent1Data: Record<string, unknown>;
  let stNicholasResponse: Response;
  let stNicholasData: Record<string, unknown>;
  let easterResponse: Response;
  let easterData: Record<string, unknown>;
  let yearResponse: Response;
  let yearData: Record<string, unknown>;
  let withLinksResponse: Response;
  let withLinksData: Record<string, unknown>;
  let leapYearResponse: Response;

  beforeAll(async () => {
    // Fetch all needed responses once
    const [baseReq, baseParams] = createRequest("/api/lectionary");
    baseResponse = await GET(baseReq, baseParams);
    baseData = await baseResponse.clone().json();

    const [todayReq, todayParams] = createRequest("/api/lectionary/today", [
      "today",
    ]);
    todayResponse = await GET(todayReq, todayParams);
    todayData = await todayResponse.clone().json();

    const [tomorrowReq, tomorrowParams] = createRequest(
      "/api/lectionary/tomorrow",
      ["tomorrow"]
    );
    tomorrowResponse = await GET(tomorrowReq, tomorrowParams);
    tomorrowData = await tomorrowResponse.clone().json();

    const [christmasReq, christmasParams] = createRequest(
      "/api/lectionary?date=2025-12-25"
    );
    christmasResponse = await GET(christmasReq, christmasParams);
    christmasData = await christmasResponse.clone().json();

    const [advent1Req, advent1Params] = createRequest(
      "/api/lectionary?date=2025-11-30"
    );
    advent1Response = await GET(advent1Req, advent1Params);
    advent1Data = await advent1Response.clone().json();

    const [stNicholasReq, stNicholasParams] = createRequest(
      "/api/lectionary?date=2025-12-06"
    );
    stNicholasResponse = await GET(stNicholasReq, stNicholasParams);
    stNicholasData = await stNicholasResponse.clone().json();

    const [easterReq, easterParams] = createRequest(
      "/api/lectionary?date=2026-04-05"
    );
    easterResponse = await GET(easterReq, easterParams);
    easterData = await easterResponse.clone().json();

    const [yearReq, yearParams] = createRequest("/api/lectionary?date=2026");
    yearResponse = await GET(yearReq, yearParams);
    yearData = await yearResponse.clone().json();

    const [withLinksReq, withLinksParams] = createRequest(
      "/api/lectionary?withLinks=true"
    );
    withLinksResponse = await GET(withLinksReq, withLinksParams);
    withLinksData = await withLinksResponse.clone().json();

    const [leapYearReq, leapYearParams] = createRequest(
      "/api/lectionary?date=2024-02-29"
    );
    leapYearResponse = await GET(leapYearReq, leapYearParams);
  });

  describe("base endpoint (all data)", () => {
    it("returns all lectionary items with liturgicalYear", () => {
      expect(baseResponse.status).toBe(200);
      expect(baseData).toHaveProperty("liturgicalYear");
      expect(typeof baseData.liturgicalYear).toBe("number");
    });

    it("returns date keys in YYYY-MM-DD format", () => {
      const dateKeys = Object.keys(baseData).filter(
        (k) => k !== "liturgicalYear"
      );
      expect(dateKeys.length).toBeGreaterThan(0);

      for (const key of dateKeys) {
        expect(key).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    });

    it("strips markdown links by default", () => {
      const dateKeys = Object.keys(baseData).filter(
        (k) => k !== "liturgicalYear"
      );
      for (const key of dateKeys.slice(0, 10)) {
        const item = baseData[key] as Record<string, unknown>;
        expect(item.primaryObservance).not.toMatch(/\]\(/);
        if (item.secondaryObservance) {
          expect(item.secondaryObservance).not.toMatch(/\]\(/);
        }
      }
    });

    it("preserves markdown links when withLinks=true", () => {
      expect(withLinksResponse.status).toBe(200);
      expect(withLinksData).toHaveProperty("liturgicalYear");
    });
  });

  describe("/api/lectionary/today", () => {
    it("returns items for today", () => {
      expect(todayResponse.status).toBe(200);
      expect(todayData).toHaveProperty("liturgicalYear");

      const dateKeys = Object.keys(todayData).filter(
        (k) => k !== "liturgicalYear"
      );
      expect(dateKeys.length).toBe(1);
    });

    it("returns LectionaryItem with correct structure", () => {
      const dateKeys = Object.keys(todayData).filter(
        (k) => k !== "liturgicalYear"
      );
      const item = todayData[dateKeys[0]] as Record<string, unknown>;

      expect(item).toHaveProperty("season");
      expect(item).toHaveProperty("primaryObservance");
      expect(item).toHaveProperty("morning");
      expect(item).toHaveProperty("evening");

      const morning = item.morning as Record<string, unknown>;
      expect(morning).toHaveProperty("first");
      expect(morning).toHaveProperty("second");
      expect(morning).toHaveProperty("collects");
      expect(Array.isArray(morning.first)).toBe(true);
      expect(Array.isArray(morning.second)).toBe(true);
      expect(Array.isArray(morning.collects)).toBe(true);

      const evening = item.evening as Record<string, unknown>;
      expect(evening).toHaveProperty("first");
      expect(evening).toHaveProperty("second");
      expect(evening).toHaveProperty("collects");
    });

    it("returns items with stripped links by default", () => {
      const dateKeys = Object.keys(todayData).filter(
        (k) => k !== "liturgicalYear"
      );
      const item = todayData[dateKeys[0]] as Record<string, unknown>;

      expect(item.primaryObservance).not.toMatch(/\]\(/);
    });
  });

  describe("/api/lectionary/tomorrow", () => {
    it("returns items for tomorrow", () => {
      expect(tomorrowResponse.status).toBe(200);
      expect(tomorrowData).toHaveProperty("liturgicalYear");

      const dateKeys = Object.keys(tomorrowData).filter(
        (k) => k !== "liturgicalYear"
      );
      expect(dateKeys.length).toBe(1);
    });
  });

  describe("/api/lectionary?date=YYYY-MM-DD", () => {
    it("returns items for a specific date", () => {
      expect(christmasResponse.status).toBe(200);
      expect(christmasData).toHaveProperty("liturgicalYear");
      expect(christmasData).toHaveProperty("2025-12-25");
    });

    it("returns correct liturgical year for date", () => {
      // December 25, 2025 is in liturgical year 2026
      expect(christmasData.liturgicalYear).toBe(2026);
    });

    it("returns Christmas Day data", () => {
      const item = christmasData["2025-12-25"] as Record<string, unknown>;
      expect(item.primaryObservance).toBe("Christmas Day");
      expect(item.season).toBe("Christmastide");
    });

    it("returns items for Easter Sunday", () => {
      expect(easterResponse.status).toBe(200);
      expect(easterData.liturgicalYear).toBe(2026);
      const item = easterData["2026-04-05"] as Record<string, unknown>;
      expect(item.primaryObservance).toBe("Easter Day");
    });
  });

  describe("/api/lectionary?date=YYYY", () => {
    it("returns all items for a liturgical year", () => {
      expect(yearResponse.status).toBe(200);
      expect(yearData).toHaveProperty("liturgicalYear");

      const dateKeys = Object.keys(yearData).filter(
        (k) => k !== "liturgicalYear"
      );
      expect(dateKeys.length).toBeGreaterThan(360);
    });
  });

  describe("withLinks parameter", () => {
    it("strips markdown links when withLinks is not set", () => {
      const item = christmasData["2025-12-25"] as Record<string, unknown>;
      expect(item.primaryObservance).not.toMatch(/\]\(/);
    });
  });

  describe("error handling", () => {
    it("returns 404 for invalid slug", async () => {
      const [req, params] = createRequest("/api/lectionary/invalid", [
        "invalid",
      ]);
      const response = await GET(req, params);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data).toHaveProperty("error");
      expect(data.error).toBe("Not found");
    });

    it("returns 400 for invalid date format", async () => {
      const [req, params] = createRequest("/api/lectionary?date=12-25-2025");
      const response = await GET(req, params);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data).toHaveProperty("error");
      expect(data.error).toBe("Date is not formatted as YYYY or YYYY-MM-DD");
    });

    it("returns 400 for invalid date format with slashes", async () => {
      const [req, params] = createRequest("/api/lectionary?date=2025/12/25");
      const response = await GET(req, params);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Date is not formatted as YYYY or YYYY-MM-DD");
    });

    it("returns 400 for partial date format", async () => {
      const [req, params] = createRequest("/api/lectionary?date=2025-12");
      const response = await GET(req, params);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Date is not formatted as YYYY or YYYY-MM-DD");
    });

    it("returns 400 for invalid date value", async () => {
      const [req, params] = createRequest("/api/lectionary?date=2025-13-45");
      const response = await GET(req, params);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Invalid date");
    });

    it("returns 400 for February 30", async () => {
      const [req, params] = createRequest("/api/lectionary?date=2025-02-30");
      const response = await GET(req, params);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Invalid date");
    });

    it("returns 400 for non-leap year February 29", async () => {
      const [req, params] = createRequest("/api/lectionary?date=2025-02-29");
      const response = await GET(req, params);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe("Invalid date");
    });

    it("accepts leap year February 29", () => {
      expect(leapYearResponse.status).toBe(200);
    });
  });

  describe("response structure", () => {
    it("returns LectionaryItem with expected properties", () => {
      const item = christmasData["2025-12-25"] as Record<string, unknown>;

      expect(item).toHaveProperty("season");
      expect(item).toHaveProperty("primaryObservance");
      expect(item).toHaveProperty("morning");
      expect(item).toHaveProperty("evening");

      expect(typeof item.season).toBe("string");
      expect(typeof item.primaryObservance).toBe("string");
    });

    it("morning and evening have lesson arrays", () => {
      const item = christmasData["2025-12-25"] as Record<string, unknown>;
      const morning = item.morning as Record<string, unknown>;
      const evening = item.evening as Record<string, unknown>;

      expect(Array.isArray(morning.first)).toBe(true);
      expect(Array.isArray(morning.second)).toBe(true);
      expect(Array.isArray(morning.collects)).toBe(true);

      expect(Array.isArray(evening.first)).toBe(true);
      expect(Array.isArray(evening.second)).toBe(true);
      expect(Array.isArray(evening.collects)).toBe(true);
    });

    it("Sunday has communion readings", () => {
      const item = advent1Data["2025-11-30"] as Record<string, unknown>;
      const morning = item.morning as Record<string, unknown>;
      const communion = morning.communion as Record<string, unknown>;

      expect(communion).toBeDefined();
      expect(communion.epistle).toBeDefined();
      expect(communion.gospel).toBeDefined();
    });

    it("saint day has third lesson (hagiography)", () => {
      const item = stNicholasData["2025-12-06"] as Record<string, unknown>;
      const morning = item.morning as Record<string, unknown>;
      const third = morning.third as Record<string, unknown>;

      expect(third).toBeDefined();
      expect(third.title).toContain("Nicholas");
    });

    it("collect items have title and text", () => {
      const item = christmasData["2025-12-25"] as Record<string, unknown>;
      const morning = item.morning as Record<string, unknown>;
      const collects = morning.collects as Record<string, unknown>[];

      expect(collects.length).toBeGreaterThan(0);
      expect(collects[0]).toHaveProperty("title");
      expect(collects[0]).toHaveProperty("text");
    });
  });
});
