import { PagePath } from "..";

interface BookPath {
  name: string;
  page?: number;
}

describe("routePath", () => {
  test("default", () => {
    const route = new PagePath({
      root: "/path",
      path: ["first", "second"],
      query: ["page", "mode"],
    });
    expect(route.routerPath).toBe("/path/:first/:second");
  });

  test("root", () => {
    const route = new PagePath("/path");
    expect(route.routerPath).toBe("/path");
  });

  test("book", () => {
    const route = new PagePath<BookPath>("/book");
    expect(route.routerPath).toBe("/book");
  });
});
