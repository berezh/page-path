import { stringifyUrl } from 'query-string';

import { UrlBuilder } from '../url-builder';
import { PagePathOptions } from './interfaces';

export class PagePath<TParams = { [key: string]: string | number }> {
    private readonly root: string = '';
    private readonly path: string[] = [];
    private readonly query: string[] = [];
    private readonly ending: string | undefined = undefined;

    constructor(options: string | PagePathOptions) {
        const innerOptions: PagePathOptions =
            typeof options === 'string' ? { root: options } : options;

        const { root: innerRoot } = innerOptions;

        const { path, query, ending } = innerOptions;

        this.ending = ending;

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

        if (innerRoot) {
            if (innerRoot.length > 1) {
                this.root = innerRoot.replace(/\/$/gi, '');
            } else {
                this.root = innerRoot;
            }
        }
    }

    public build(params?: TParams): string {
        let resultUrl = `${this.root}`;

        if (params) {
            for (let i = 0; i < this.path.length; i++) {
                const pathKey = this.path[i];
                const pathValue = (params as any)[pathKey];
                if (pathValue) {
                    resultUrl += `/${pathValue}`;
                } else {
                    break;
                }
            }
        }

        if (this.ending) {
            resultUrl = `${resultUrl}${this.ending}`;
        }

        if (params) {
            const query: { [key: string]: string } = {};
            if (this.query.length) {
                for (let i = 0; i < this.query.length; i++) {
                    const queryKey = this.query[i];
                    query[queryKey] = (params as any)[queryKey];
                }
            }

            if (this.query.length) {
                resultUrl = stringifyUrl(
                    { url: resultUrl, query },
                    { skipNull: true, skipEmptyString: true },
                );
            }

            // todo: check if has params to replace, if not - skip
            return UrlBuilder.build(resultUrl, params);
        }

        return resultUrl;
    }

    public isActive(path: string): boolean;
    public isActive<TParams>(params: TParams, path: string): boolean;
    public isActive(p1: any, p2?: any): boolean {
        if (p2) {
            return this.build(p1) === p2;
        } else {
            return this.fullRoot === p1;
        }
    }

    private get fullRoot() {
        return this.ending ? `${this.root}${this.ending}` : this.root;
    }
}
