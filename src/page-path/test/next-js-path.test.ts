import { PagePath } from "..";

interface BookPath {
  name: string;
  page?: number;
}

describe("nextJsPath", () => {
  test("default", () => {
    const route = new PagePath({
      root: "/path",
      path: ["first", "second"],
      query: ["page", "mode"],
    });
    expect(route.nextJsPath).toBe("/path/[first]/[second]");
  });

  test("root", () => {
    const route = new PagePath("/path");
    expect(route.nextJsPath).toBe("/path");
  });

  test("book", () => {
    const route = new PagePath<BookPath>("/book");
    expect(route.nextJsPath).toBe("/book");
  });
});
