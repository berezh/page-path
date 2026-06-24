import qs from "query-string";

import { UrlBuilder } from "../url-builder";
import { PagePathOptions, PagePathBuildOptions } from "./interfaces";

export class PagePath<TParams = { [key: string]: string | number }> {
  private readonly root: string = "";

  private readonly path: string[] = [];

  private readonly query: string[] = [];

  private readonly ending: string | undefined = undefined;

  constructor(root: string);

  constructor(options: PagePathOptions);

  constructor(root: string, options: Omit<PagePathOptions, "root">);

  constructor(p1: string | PagePathOptions, p2?: Omit<PagePathOptions, "root">) {
    const innerOptions: PagePathOptions = typeof p1 === "string" ? { root: p1, ...p2 } : p1;

    const { root: innerRoot } = innerOptions;

    const { path, query, ending } = innerOptions;

    this.ending = ending;

    if (typeof path === "string") {
      this.path.push(path);
    } else if (Array.isArray(path)) {
      this.path = [...path];
    }
    if (typeof query === "string") {
      this.query.push(query);
    } else if (Array.isArray(query)) {
      this.query = [...query];
    }

    if (innerRoot) {
      this.root = innerRoot;
    }
  }

  private extractQuery(param?: { [key: string]: string | number } | string) {
    let result: { [key: string]: string | number | undefined } = {};

    if (param) {
      if (typeof param === "object") {
        result = { ...param };
      } else if (typeof param === "string") {
        const { query } = qs.parseUrl(param);
        for (const queryKey in query) {
          result[queryKey] = query[queryKey]?.toString();
        }
      }
    }

    return result;
  }

  private applyOptions(queryIn: { [key: string]: string | number | undefined }, options?: PagePathBuildOptions) {
    const { addQuery, removeQueryKey } = options || {};

    const query = { ...queryIn, ...this.extractQuery(addQuery) };

    if (removeQueryKey) {
      const removeKeys = typeof removeQueryKey === "string" ? [removeQueryKey] : removeQueryKey;
      for (const key of removeKeys) {
        delete query[key];
      }
    }

    return query;
  }

  public build(params?: TParams, options?: PagePathBuildOptions): string {
    let resultUrl = this.buildPathParam(params);

    if (this.ending) {
      resultUrl = `${resultUrl}${this.ending}`;
    }

    if (params) {
      let query: { [key: string]: string | number | undefined } = {};
      if (this.query.length) {
        for (const queryKey of this.query) {
          query[queryKey] = params[queryKey];
        }
      }

      query = this.applyOptions(query, options);

      resultUrl = qs.stringifyUrl({ url: resultUrl, query }, { skipNull: true, skipEmptyString: true });

      return UrlBuilder.build(resultUrl, params);
    }

    return resultUrl;
  }

  private buildPathParam(params?: TParams): string {
    let resultUrl = `${this.root}`;
    if (params) {
      for (const pathKey of this.path) {
        const pathValue = params[pathKey];
        if (pathValue) {
          resultUrl += `/${pathValue}`;
        } else {
          break;
        }
      }
    }
    return resultUrl;
  }

  public isActive(path: string | Partial<TParams>): boolean;

  public isActive(path: string, params: Partial<TParams>): boolean;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public isActive(p1: any, p2?: any): boolean {
    if (p2) {
      return this.isPathEqual(this.build(p2), p1);
    } else if (typeof p1 === "string") {
      return this.isRootEqual(this.fullRoot, p1);
    } else {
      return this.isPathEqual(this.build(p1), this.fullRoot);
    }
  }

  public isRootPathActive(path: string) {
    const rootPath1 = this.cleanRoot(this.root);
    const rootPath2 = this.cleanRoot(path);

    const index = rootPath2.indexOf(rootPath1);
    return index === 0;
  }

  public get routerPath() {
    const pathes = this.path.map(x => `:${x}`).join("/");
    return `${this.root}${this.path.length ? "/" : ""}${pathes}`;
  }

  public get nextJsPath() {
    const pathes = this.path.map(x => `[${x}]`).join("/");
    return `${this.root}${this.path.length ? "/" : ""}${pathes}`;
  }

  public get url() {
    return this.fullRoot;
  }

  private get fullRoot() {
    return this.ending ? `${this.root}${this.ending}` : this.root;
  }

  private isPathEqual(path1: string, path2: string): boolean {
    const pu1 = qs.parseUrl((path1 || "").toLowerCase());
    const pu2 = qs.parseUrl((path2 || "").toLowerCase());

    const keys1 = Object.keys(pu1.query);
    const keys2 = Object.keys(pu2.query);

    if (keys1.length === keys2.length) {
      for (const key of keys1) {
        if (pu1.query[key] !== pu2.query[key]) {
          return false;
        }
      }
    } else {
      return false;
    }

    return this.isRootEqual(pu1.url, pu2.url) && pu1.fragmentIdentifier === pu2.fragmentIdentifier;
  }

  private isRootEqual(root1: string, root2: string): boolean {
    return this.cleanRoot(root1) === this.cleanRoot(root2);
  }

  private cleanRoot(root: string): string {
    return (root || "").replace(/^\//gi, "").replace(/\/$/gi, "").toLowerCase();
  }
}
