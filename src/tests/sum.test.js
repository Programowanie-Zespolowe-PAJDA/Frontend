import { expect, test } from "vitest";
import { sum } from "./sum";

test("adds 1 + 2", () => {
    expect(sum(1, 2)).toBe(3);
});
