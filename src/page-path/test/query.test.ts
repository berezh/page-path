import { PagePath } from '..';

interface BookPath {
    page?: number;
    mode?: string;
}

describe('AppRoute: query', () => {
    test('default', () => {
        const route = new PagePath<BookPath>({
            root: '/path/',
            query: ['page', 'mode'],
        });

        const url = route.build({
            page: 1,
            mode: 'view',
        });

        expect(url).toBe('/path/?mode=view&page=1');
    });

    test('default v2', () => {
        const route = new PagePath<BookPath>('/path/', {
            query: ['page', 'mode'],
        });

        const url = route.build({
            page: 1,
            mode: 'view',
        });

        expect(url).toBe('/path/?mode=view&page=1');
    });
});
