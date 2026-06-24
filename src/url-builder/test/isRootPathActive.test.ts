import { PagePath } from "../..";

interface BookPath {
  name: string;
  page?: number;
}

describe("AppRoute: isRootPathActive", () => {
  it("root", () => {
    const route = new PagePath<BookPath>({
      root: "/book",
    });

    expect(route.isRootPathActive("/book")).toBe(true);
    expect(route.isRootPathActive("/BOOK")).toBe(true);
    expect(route.isRootPathActive("/book/")).toBe(true);
    expect(route.isRootPathActive("book")).toBe(true);

    expect(route.isActive("/book1")).toBe(false);
  });

  it("query params", () => {
    const route = new PagePath<BookPath>({
      root: "/book",
      query: ["name"],
    });

    expect(route.isRootPathActive("/book?name=alfabet")).toBe(true);

    expect(route.isRootPathActive("/section/book?name=alfabet")).toBe(false);
  });

  it("path params", () => {
    const route = new PagePath<BookPath>("/book", {
      path: ["name"],
    });

    expect(route.isRootPathActive("/book/alfabet")).toBe(true);
    expect(route.isRootPathActive("/secrion/book/alfabet")).toBe(false);
  });

  it("params with /", () => {
    const route = new PagePath<BookPath>({
      root: "/book",
      query: ["name"],
    });

    expect(route.isRootPathActive("/book/?name=alfabet")).toBe(true);
  });
});
