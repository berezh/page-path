import { PagePath } from '..';

interface BookPath {
    name: string;
}

describe('AppRoute', () => {
    test('default', () => {
        const route = new PagePath({
            path: '/path',
            pathParams: ['first', 'second'],
            queryParams: ['page', 'mode'],
        });
        const url = route.url({
            first: 'one',
            second: 'two',
            page: 1,
            mode: 'view',
        });
        expect(url).toBe('/path/one/two?mode=view&page=1');
    });

    test('root', () => {
        const route = new PagePath('/');
        const url = route.url({});
        expect(url).toBe('/');
    });

    test('book', () => {
        const route = new PagePath<BookPath>('/book/:name');
        expect(route.url({ name: 'alfabet' })).toBe('/book/alfabet');
    });
});
