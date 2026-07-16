import { describe, expect, it } from "vitest";
import { smartQuotes } from "@/utils/smartQuotes";
import { splitCollectOpening } from "./Collects";

describe("smartQuotes", () => {
  it.each([
    ['He said &quot;Amen&quot;.', "He said “Amen”."],
    ["He said &#34;Amen&#34;.", "He said “Amen”."],
    ["Christ&apos;s mercy", "Christ’s mercy"],
    ["Christ&#39;s mercy", "Christ’s mercy"],
    ["man's understanding", "man’s understanding"],
  ])("formats %s", (text, expected) => {
    expect(smartQuotes(text)).toBe(expected);
  });
});

describe("splitCollectOpening", () => {
  it.each([
    [
      "O God, who by the leading of a star didst manifest thy only-begotten Son.",
      "O God,",
      " who by the leading of a star didst manifest thy only-begotten Son.",
    ],
    [
      "O Almighty God, who hast committed to the hands of men the ministry of reconciliation.",
      "O Almighty God,",
      " who hast committed to the hands of men the ministry of reconciliation.",
    ],
    [
      "O Lord Jesus Christ, who at thy first coming didst send thy messenger.",
      "O Lord",
      " Jesus Christ, who at thy first coming didst send thy messenger.",
    ],
    [
      "Almighty God, give us grace that we may cast away the works of darkness.",
      "Almighty God,",
      " give us grace that we may cast away the works of darkness.",
    ],
    [
      "Almighty and everliving God, who, for the greater confirmation of the faith.",
      "Almighty",
      " and everliving God, who, for the greater confirmation of the faith.",
    ],
    [
      "Bless-ed Lord, who hast caus-ed all holy Scriptures to be written.",
      "Bless-ed Lord,",
      " who hast caus-ed all holy Scriptures to be written.",
    ],
    [
      "Lord, we beseech thee to keep thy household the Church.",
      "Lord,",
      " we beseech thee to keep thy household the Church.",
    ],
    [
      "Grant, O Lord, that, in all our sufferings here upon earth.",
      "Grant,",
      " O Lord, that, in all our sufferings here upon earth.",
    ],
    [
      "Grant to us, Lord, we beseech thee, the spirit to think and do.",
      "Grant",
      " to us, Lord, we beseech thee, the spirit to think and do.",
    ],
    [
      "We beseech thee, Almighty God, look upon the hearty desires.",
      "We",
      " beseech thee, Almighty God, look upon the hearty desires.",
    ],
    [
      "Hear, we beseech thee, O merciful God, the prayers of thy servants.",
      "Hear,",
      " we beseech thee, O merciful God, the prayers of thy servants.",
    ],
    [
      "Most high, omnipotent, good Lord, grant thy people grace.",
      "Most",
      " high, omnipotent, good Lord, grant thy people grace.",
    ],
    [
      "Almighty, everlasting God, who hast ordain-ed the Paschal mystery.",
      "Almighty,",
      " everlasting God, who hast ordain-ed the Paschal mystery.",
    ],
  ])("splits %s", (text, largeText, rest) => {
    expect(splitCollectOpening(text)).toEqual({ largeText, rest });
  });

  it("falls back to the first word when there is no comma", () => {
    expect(splitCollectOpening("Almighty God hear our prayer")).toEqual({
      largeText: "Almighty",
      rest: " God hear our prayer",
    });
  });
});
