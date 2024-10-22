import { PagePath } from "..";

interface BookPath {
  name: string;
  page?: number;
}

describe("AppRoute: isActive", () => {
  describe("isActive", () => {
    test("root", () => {
      const route = new PagePath<BookPath>({
        root: "/book",
      });
      expect(route.isActive("/book")).toBe(true);
      expect(route.isActive("/BOOK")).toBe(true);
      expect(route.isActive("/book/")).toBe(true);
      expect(route.isActive("book")).toBe(true);

      expect(route.isActive("/book1")).toBe(false);
    });

    test("query params", () => {
      const route = new PagePath<BookPath>({
        root: "/book",
        query: ["name", "page"],
      });

      expect(route.isActive("/book?name=alfabet", { name: "alfabet" })).toBe(true);
    });

    test("path params", () => {
      const route = new PagePath<BookPath>("/book", {
        path: ["name"],
      });

      expect(route.isActive("/book/alfabet", { name: "alfabet" })).toBe(true);
    });

    test("params with /", () => {
      const route = new PagePath<BookPath>({
        root: "/book",
        query: ["name", "page"],
      });

      expect(route.isActive("/book/?name=alfabet", { name: "alfabet" })).toBe(true);
    });

    test("params with hash", () => {
      const route = new PagePath<BookPath>({
        root: "/book",
        query: ["name", "page"],
      });

      expect(route.isActive("/book#123")).toBe(true);
      expect(route.isActive("/book/?name=alfabet#123", { name: "alfabet" })).toBe(true);
    });

    // root: clean /
  });

  describe("cleanHash", () => {
    it("root", () => {
      const route = new PagePath<BookPath>({
        root: "/book",
      });

      expect(route.cleanHash("/hello#hash")).toBe("/hello");
      expect(route.cleanHash("/#hash")).toBe("/");
      expect(route.cleanHash("#hash")).toBe("");
    });
  });
});
