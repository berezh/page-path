import { stringifyUrl } from 'query-string';

import { UrlBuilder } from '../url-builder';
import { PagePathOptions } from './interfaces';

export class PagePath<TParams = { [key: string]: string | number }> {
    private readonly rootPath: string = '';
    private readonly path: string[] = [];
    private readonly query: string[] = [];

    constructor(options: string | PagePathOptions) {
        let innerRoot = '';

        if (typeof options === 'string') {
            innerRoot = options;
        } else {
            innerRoot = options.root;

            const { path, query } = options;
            if (typeof path === 'string') {
                this.path.push(path);
            } else if (Array.isArray(path)) {
                this.path = [...path];
            }
            if (typeof query === 'string') {
                this.query.push(query);
            } else if (Array.isArray(query)) {
                this.query = [...query];
            }
        }

        if (innerRoot) {
            if (innerRoot.length > 1) {
                this.rootPath = innerRoot.replace(/\/$/gi, '');
            } else {
                this.rootPath = innerRoot;
            }
        }
    }

    public build(params?: TParams): string {
        let { rootPath } = this;
        if (params) {
            for (let i = 0; i < this.path.length; i++) {
                const pathKey = this.path[i];
                const pathValue = (params as any)[pathKey];
                if (pathValue) {
                    rootPath += `/${pathValue}`;
                } else {
                    break;
                }
            }

            const query: { [key: string]: string } = {};
            if (this.query.length) {
                for (let i = 0; i < this.query.length; i++) {
                    const queryKey = this.query[i];
                    query[queryKey] = (params as any)[queryKey];
                }
            }

            if (this.path.length || this.query.length) {
                return stringifyUrl(
                    { url: rootPath, query },
                    { skipNull: true, skipEmptyString: true },
                );
            } else {
                return UrlBuilder.build(rootPath, params);
            }
        }

        return rootPath;
    }

    public get root(): string {
        return this.rootPath;
    }

    public isActive(path: string): boolean;
    public isActive<TParams>(params: TParams, path: string): boolean;
    public isActive(p1: any, p2?: any): boolean {
        if (p2) {
            return this.build(p1) === p2;
        } else {
            return this.rootPath === p1;
        }
    }
}
