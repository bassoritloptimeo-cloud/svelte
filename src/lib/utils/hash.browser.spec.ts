import {describe, expect, test} from "vitest";
import {createHashStore} from "./hash.ts";

describe("addPoint", () => {
	test("hash values", () => {
		const hash$ = createHashStore({a: "1", b: "2"});
		expect(hash$()).toStrictEqual({a: "1", b: "2"});
		hash$.set({a: "3"});
		expect(window.location.hash, "hash without default values").toBe("#a=3");
		expect(hash$()).toStrictEqual({a: "3", b: "2"});
		hash$.reset();
		expect(hash$()).toStrictEqual({a: "1", b: "2"});
		expect(window.location.hash, "hash reset").toBe("");
	});
});
