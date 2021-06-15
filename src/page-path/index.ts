import { stringifyUrl, parseUrl } from 'query-string';

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
    public isActive(path: string, params: Partial<TParams>): boolean;
    public isActive(p1: any, p2?: any): boolean {
        if (p2) {
            return this.isPathEqual(this.build(p2), p1);
        } else {
            return this.isRootEqual(this.fullRoot, p1);
        }
    }

    private get fullRoot() {
        return this.ending ? `${this.root}${this.ending}` : this.root;
    }

    private isPathEqual(path1: string, path2: string): boolean {
        const pu1 = parseUrl((path1 || '').toLowerCase());
        const pu2 = parseUrl((path2 || '').toLowerCase());

        const keys1 = Object.keys(pu1.query);
        const keys2 = Object.keys(pu2.query);

        if (keys1.length === keys2.length) {
            for (const key of keys1) {
                if (pu1.query[key] !== pu2.query[key]) {
                    return false;
                }
            }
        }
        else {
            return false;
        }

        return this.isRootEqual(pu1.url, pu2.url) && pu1.fragmentIdentifier === pu2.fragmentIdentifier;
    }

    private isRootEqual(root1: string, root2: string): boolean {
        return this.cleanRoot(root1).toLowerCase() === this.cleanRoot(root2).toLowerCase();
    }

    private cleanRoot(root: string): string {
        return (root || '').replace(/^\//gi, '').replace(/\/$/gi, '');
    }
}
