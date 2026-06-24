import { PagePath } from "../..";

interface BookPath {
  name: string;
  page?: number;
}

describe("AppRoute: isActive", () => {
  it("root", () => {
    const route = new PagePath<BookPath>({
      root: "/book",
    });
    expect(route.isActive("/book")).toBe(true);
    expect(route.isActive("/BOOK")).toBe(true);
    expect(route.isActive("/book/")).toBe(true);
    expect(route.isActive("book")).toBe(true);

    expect(route.isActive("/book1")).toBe(false);
  });

  it("query params", () => {
    const route = new PagePath<BookPath>({
      root: "/book",
      query: ["name", "page"],
    });

    expect(route.isActive("/book?name=alfabet", { name: "alfabet" })).toBe(true);
  });

  it("path params", () => {
    const route = new PagePath<BookPath>("/book", {
      path: ["name"],
    });

    expect(route.isActive("/book/alfabet", { name: "alfabet" })).toBe(true);
  });

  it("params with /", () => {
    const route = new PagePath<BookPath>({
      root: "/book",
      query: ["name", "page"],
    });

    expect(route.isActive("/book/?name=alfabet", { name: "alfabet" })).toBe(true);
  });

  // root: clean /
});
