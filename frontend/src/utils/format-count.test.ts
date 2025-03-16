import { expect, describe, test, it } from "vitest";
import { formatCount } from "./format-count";

describe("formatCount", () => {
  it("should return the number as is for values less than 1000", () => {
    expect(formatCount(0)).toBe("0");
    expect(formatCount(1)).toBe("1");
    expect(formatCount(999)).toBe("999");
  });

  test("should format thousands with K suffix", () => {
    expect(formatCount(1000)).toBe("1K");
    expect(formatCount(1500)).toBe("1.5K");
    expect(formatCount(10500)).toBe("10.5K");
    expect(formatCount(999499)).toBe("999.5K");
  });

  test("should format millions with M suffix", () => {
    expect(formatCount(1000000)).toBe("1M");
    expect(formatCount(1500000)).toBe("1.5M");
    expect(formatCount(10500000)).toBe("10.5M");
  });
});
