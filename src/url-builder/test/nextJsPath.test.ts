import { PagePath } from "../..";

interface BookPath {
  name: string;
  page?: number;
}

describe("nextJsPath", () => {
  it("default", () => {
    const route = new PagePath({
      root: "/path",
      path: ["first", "second"],
      query: ["page", "mode"],
    });
    expect(route.nextJsPath).toBe("/path/[first]/[second]");
  });

  it("root", () => {
    const route = new PagePath("/path");
    expect(route.nextJsPath).toBe("/path");
  });

  it("book", () => {
    const route = new PagePath<BookPath>("/book");
    expect(route.nextJsPath).toBe("/book");
  });
});
