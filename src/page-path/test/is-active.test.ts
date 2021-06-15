import { PagePath } from '..';

interface BookPath {
    name: string;
    page?: number;
}

describe('AppRoute: isActive', () => {
    test('root', () => {
        const route = new PagePath<BookPath>({
            root: '/book',
        });
        expect(route.isActive('/book')).toBe(true);
        expect(route.isActive('/BOOK')).toBe(true);
        expect(route.isActive('/book/')).toBe(true);
        expect(route.isActive('book')).toBe(true);

        expect(route.isActive('/book1')).toBe(false);
    });

    test('params', () => {
        const route = new PagePath<BookPath>({
            root: '/book',
            query: ['name', 'page']
        });

        expect(route.isActive('/book?name=alfabet', { name: 'alfabet' })).toBe(true);
    });

    test('params with /', () => {
        const route = new PagePath<BookPath>({
            root: '/book',
            query: ['name', 'page']
        });

        expect(route.isActive('/book/?name=alfabet', { name: 'alfabet' })).toBe(true);
    });

    // root: clean /
});
