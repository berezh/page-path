export class UrlBuilder {
    private static getValue(value?: any): any {
        if (value === undefined || value === null) {
            return '';
        } else {
            return value;
        }
    }

    public static build<TParams>(path: string, params: TParams): string {
        let url = UrlBuilder.buildParentheses(path, params);
        url = UrlBuilder.buildPoints(url, params);
        return url;
    }

    private static buildParentheses<TParams>(path: string, params: TParams): string {
        let url = path;
        const paramsArray = Object.entries(params || {}) as Array<[keyof TParams, any]>;
        for (const [paramName, value] of paramsArray) {
            // For example, /:projectId\??/. JS eats one backslash while parsing literal.
            // const paramRegex = new RegExp(`\\[${paramName}\\](\\(.*?\\))?\\??`);
            const paramRegex = new RegExp(`\\[${paramName}\\]`);
            if (paramRegex.test(path)) {
                url = url.replace(paramRegex, UrlBuilder.getValue(value));
            } else {
                // throw new Error(`Parameter ${paramName} is missing in path`);
            }
        }
        // replace empty
        url = url.replace(new RegExp(`\\[[a-z0-9]+\\]`, 'gi'), '');

        return url;
    }

    private static buildPoints<TParams>(path: string, params: TParams): string {
        let url = path;
        const paramsArray = Object.entries(params || {}) as Array<[keyof TParams, any]>;
        for (const [paramName, value] of paramsArray) {
            // For example, /:projectId\??/. JS eats one backslash while parsing literal.
            const paramRegex = new RegExp(`:${paramName}`);
            if (paramRegex.test(path)) {
                url = url.replace(paramRegex, value === undefined ? '' : value);
            } else {
                // throw new Error(`Parameter ${paramName} is missing in path`);
            }
        }

        // replace empty
        url = url.replace(new RegExp(`:[a-z0-9]+(\\?)?`, 'gi'), '');

        return url;
    }
}
