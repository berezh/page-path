import { PagePath } from "..";

interface BookPath {
  page?: number;
  mode?: string;
}

describe("AppRoute: port", () => {
  test("default", () => {
    const route = new PagePath<BookPath>("http://localhost:3200", { path: ["mode"] });
    expect(route.build({ mode: "test" })).toBe("http://localhost:3200/test");
  });
});
