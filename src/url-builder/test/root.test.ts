import { PagePath } from "../..";

interface BookPath {
  name: string;
  page?: number;
}

describe("AppRoute", () => {
  it("default", () => {
    const route = new PagePath({
      root: "/path",
      path: ["first", "second"],
      query: ["page", "mode"],
    });
    const url = route.build({
      first: "one",
      second: "two",
      page: 1,
      mode: "view",
    });
    expect(url).toBe("/path/one/two?mode=view&page=1");
  });

  it("root", () => {
    const route = new PagePath("/");
    const url = route.build({});
    expect(url).toBe("/");
  });

  it("book", () => {
    const route = new PagePath<BookPath>("/book/:name");
    expect(route.build({ name: "alfabet" })).toBe("/book/alfabet");
  });

  it("book - ending", () => {
    const route = new PagePath<BookPath>({
      root: "/book",
      ending: ".html",
    });
    expect(route.build()).toBe("/book.html");
  });

  it("book: ending + query", () => {
    const route = new PagePath<BookPath>({
      root: "/book/:name",
      query: "page",
      ending: ".html",
    });
    expect(route.build({ name: "alfabet", page: 10 })).toBe("/book/alfabet.html?page=10");
  });

  it("book: isActive", () => {
    const route = new PagePath<BookPath>({
      root: "/book",
    });
    expect(route.isActive("/book")).toBe(true);
    expect(route.isActive("/book1")).toBe(false);
  });

  it("book: ending + isActive", () => {
    const route = new PagePath<BookPath>({
      root: "/book",
      ending: ".html",
    });

    expect(route.isActive("/book.html")).toBe(true);
    expect(route.isActive("/book")).toBe(false);
  });
});
