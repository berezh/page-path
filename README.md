# page-path

Page path builder and container

<a href="https://www.npmjs.com/package/page-path">
    <img src="https://nodei.co/npm/page-path.png?mini=true"/>
</a>

## Installation:

```
npm install page-path
```

## Options

### PagePathOptions

`PagePath` class constructor receives `string` or `PagePathOptions` interface. `string` type represents `root` value.

| Name    | Required | Type                        | Description          |
| ------- | -------- | --------------------------- | -------------------- |
| `root`  | Yes      | `string`                    | Root path            |
| `path`  | No       | `string` or `Array<string>` | Subdirectories names |
| `query` | No       | `string` or `Array<string>` | Queries names        |

## Using in `react-router-dom`

Define interface

```tsx
export interface BookPath {
    name: string;
}
```

Define container

```tsx
import { PagePath } from 'page-path';

export const AppPaths = {
    index: new PagePath('/'),
    contact: new PagePath('/contact'),
    book: new PagePath<BookPath>('/book/:name'),
};
```

Define routes

```tsx
import { Switch, Route } from 'react-router-dom';
...
<Switch>
    <Route
        exact={true}
        path={AppPaths.index.path}
        component={IndexPage}
    />
    <Route
        exact={true}
        path={AppPaths.contact.path}
        component={ContactPage}
    />
    <Route
        exact={true}
        path={AppPaths.book.path}
        component={BookPage}
    />
    ...
</Switch>
```

Define achors

```tsx
<a href={AppPaths.index.url()}>Home</a>
// => <a href="/">Home</a>
<a href={AppPaths.contact.url()}>Contact</a>
// => <a href="/contact">Contact</a>
<a href={AppPaths.book.url({ name: 'alphabet' })}>Alphabet</a>
// => <a href="/book/alphabet">Alphabet</a>
```

## Using in `next` or `gatsby`

Define interface

```tsx
export interface BookPath {
    name: string;
    page?: number;
}
```

Define container

```tsx
import { PagePath } from 'page-path';

export const AppPaths = {
    book: new PagePath<BookPath>({
        root: '/book/',
        path: ['name'],
        query: ['page'],
    }),
};
```

Define achors

```tsx
<a href={AppPaths.book.url({ name: 'alphabet', page: 1 })}>Alphabet</a>
// => <a href="/book/alphabet?page=1">Alphabet</a>
<a href={AppPaths.book.url({ name: 'geography', page: 2 })}>Geography</a>
// => <a href="/book/geography?page=2">Geography</a>
```
