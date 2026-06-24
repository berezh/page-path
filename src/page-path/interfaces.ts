export interface PagePathOptions {
  root: string;
  path?: string | string[];
  query?: string | string[];
  /// Path ending
  ending?: string;
}

export interface PagePathBuildOptions {
  addQuery?: { [key: string]: string | number } | string;
  removeQueryKey?: string | string[];
}
