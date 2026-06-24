import { PagePath } from "../..";
import { PagePathBuildOptions } from "../../page-path/interfaces";

interface BookPath {
  page?: number;
  mode?: string;
}

describe("AppRoute: query", () => {
  it("default", () => {
    const route = new PagePath<BookPath>({
      root: "/path/",
      query: ["page", "mode"],
    });

    const url = route.build({
      page: 1,
      mode: "view",
    });

    expect(url).toBe("/path/?mode=view&page=1");
  });

  it("default v2", () => {
    const route = new PagePath<BookPath>("/path/", {
      query: ["page", "mode"],
    });

    const url = route.build({
      page: 1,
      mode: "view",
    });

    expect(url).toBe("/path/?mode=view&page=1");
  });
});

function buildPagePath(params: Partial<BookPath>, options: PagePathBuildOptions, expectUrl: string) {
  const pagePath = new PagePath<BookPath>({
    root: "/path/",
    query: ["page", "mode"],
  });

  const url = pagePath.build(params, options);

  expect(url).toBe(expectUrl);
}

describe("AppRoute options: addQuery", () => {
  it("as object - simple", () => {
    buildPagePath(
      {
        mode: "view",
      },
      {
        addQuery: {
          row: 1,
          label: "text",
        },
      },
      "/path/?label=text&mode=view&row=1"
    );
  });

  it("as object - simple - empty before", () => {
    buildPagePath(
      {},
      {
        addQuery: {
          row: 1,
          label: "text",
        },
      },
      "/path/?label=text&row=1"
    );
  });

  it("as object - empty start", () => {
    buildPagePath(
      {},
      {
        addQuery: {
          row: 1,
          label: "text",
        },
      },
      "/path/?label=text&row=1"
    );
  });

  it("as object - rewrite", () => {
    buildPagePath(
      {
        mode: "view",
      },
      {
        addQuery: {
          row: 1,
          mode: "text",
        },
      },
      "/path/?mode=text&row=1"
    );
  });

  it("as url - simple", () => {
    buildPagePath(
      {
        mode: "view",
      },
      {
        addQuery: "/path/?label=text&row=1",
      },
      "/path/?label=text&mode=view&row=1"
    );
  });

  it("as relative url - rewrite", () => {
    buildPagePath(
      {
        mode: "view",
      },
      {
        addQuery: "/path/?mode=text&row=1",
      },
      "/path/?mode=text&row=1"
    );
  });

  it("as full url - rewrite", () => {
    buildPagePath(
      {
        mode: "view",
      },
      {
        addQuery: "https://site.com/path/?mode=text&row=1",
      },
      "/path/?mode=text&row=1"
    );
  });
});

describe("AppRoute options: removeQueryKey", () => {
  it("single", () => {
    buildPagePath(
      {
        mode: "view",
        page: 1,
      },
      {
        removeQueryKey: "mode",
      },
      "/path/?page=1"
    );
  });

  it("multiple", () => {
    buildPagePath(
      {
        mode: "view",
        page: 1,
      },
      {
        removeQueryKey: ["mode", "page"],
      },
      "/path/"
    );
  });

  it("single from addQuery", () => {
    buildPagePath(
      {
        mode: "view",
        page: 1,
      },
      {
        addQuery: { label: "name" },
        removeQueryKey: "label",
      },
      "/path/?mode=view&page=1"
    );
  });
});
