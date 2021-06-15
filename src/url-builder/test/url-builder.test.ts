import { UrlBuilder } from '..';

describe('UrlBuilder', () => {
    test('Parentheses query 1', () => {
        expect(UrlBuilder.build('/path?p1=[v1]', { v1: undefined })).toBe('/path?p1=');
    });

    test('Parentheses query 2', () => {
        expect(UrlBuilder.build('/path?p1=[v1]&p2=[v2]&p3=[v3]', { v1: 'pv1' })).toBe('/path?p1=pv1&p2=&p3=');
    });

    test('book', () => {
        expect(UrlBuilder.build('/book/:name', { name: 'my-book' })).toBe('/book/my-book');
    });

    test('book', () => {
        expect(UrlBuilder.build('/book/:name.html?page=10', { name: 'my-book' })).toBe('/book/my-book.html?page=10');
    });
});
