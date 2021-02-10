import { stringifyUrl } from 'query-string';

import { UrlBuilder } from '../url-builder';
import { PagePathOptions } from './interfaces';

export class PagePath<TParams = { [key: string]: string | number }> {
    public readonly path: string = '';
    public readonly pathParams: string[] = [];
    public readonly queryParams: string[] = [];

    constructor(options: string | PagePathOptions) {
        let innerPath = '';

        if (typeof options === 'string') {
            innerPath = options;
        } else {
            innerPath = options.path;

            const { pathParams, queryParams } = options;
            if (typeof pathParams === 'string') {
                this.pathParams.push(pathParams);
            } else if (Array.isArray(pathParams)) {
                this.pathParams = [...pathParams];
            }
            if (typeof queryParams === 'string') {
                this.queryParams.push(queryParams);
            } else if (Array.isArray(queryParams)) {
                this.queryParams = [...queryParams];
            }
        }

        if (innerPath) {
            if (innerPath.length > 1) {
                this.path = innerPath.replace(/\/$/gi, '');
            } else {
                this.path = innerPath;
            }
        }
    }

    public url(params?: TParams): string {
        let { path } = this;
        if (params) {
            for (let i = 0; i < this.pathParams.length; i++) {
                const pathKey = this.pathParams[i];
                const pathValue = (params as any)[pathKey];
                if (pathValue) {
                    path += `/${pathValue}`;
                } else {
                    break;
                }
            }
            const query: { [key: string]: string } = {};
            if (this.queryParams.length) {
                for (let i = 0; i < this.queryParams.length; i++) {
                    const queryKey = this.queryParams[i];
                    query[queryKey] = (params as any)[queryKey];
                }
            }

            if (this.pathParams.length || this.queryParams.length) {
                return stringifyUrl(
                    { url: path, query },
                    { skipNull: true, skipEmptyString: true },
                );
            } else {
                return UrlBuilder.build(path, params);
            }
        }

        return path;
    }

    public isActive(path: string): boolean;
    public isActive<TParams>(params: TParams, path: string): boolean;
    public isActive(p1: any, p2?: any): boolean {
        if (p2) {
            return this.url(p1) === p2;
        } else {
            return this.path === p1;
        }
    }
}
