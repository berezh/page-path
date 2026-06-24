import { PagePath } from "../..";

interface BookPath {
  name: string;
  page?: number;
}

describe("routePath", () => {
  it("default", () => {
    const route = new PagePath({
      root: "/path",
      path: ["first", "second"],
      query: ["page", "mode"],
    });
    expect(route.routerPath).toBe("/path/:first/:second");
  });

  it("root", () => {
    const route = new PagePath("/path");
    expect(route.routerPath).toBe("/path");
  });

  it("book", () => {
    const route = new PagePath<BookPath>("/book");
    expect(route.routerPath).toBe("/book");
  });

  it("optional path 1", () => {
    const route = new PagePath<BookPath>({
      root: "/path",
      path: ["name", "page"],
    });
    expect(route.build({ name: "rex" })).toBe("/path/rex");
    expect(route.build({ name: "rex", page: 1 })).toBe("/path/rex/1");
  });
});
