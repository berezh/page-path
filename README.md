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

| Name    | Required | Type                        | Description          | Example                 |
| ------- | -------- | --------------------------- | -------------------- | ----------------------- |
| `root`  | Yes      | `string`                    | Root path            | /`book`/alphabet?page=7 |
| `path`  | No       | `string` or `Array<string>` | Subdirectories names | /book/`alphabet`?page=7 |
| `query` | No       | `string` or `Array<string>` | Queries names        | /book/alphabet?`page`=7 |

### PagePath

#### build(params: any): string

Parameters:
`params` - URL's params passed to url builder.

Returns built URL based on passed parameters.

Example:

```tsx
// interface
interface BookPath {
    name: string;
    page?: number;
}

// page path
const bookPagePath = new PagePath<BookPath>({
    root: '/book',
    path: ['name'],
    query: ['page'],
});

// build path
const path = bookPagePath.build({ name: 'alphabet', page: 7 });
// path: "/book/alphabet?page=7"
```

### root

Returns `root` path.

Example:

```tsx
// page path
const bookPagePath = new PagePath({
    root: '/book/:name',
});

// build path
const root = bookPagePath.root;
// path: "/book/:name"
```

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
        path={AppPaths.index.root}
        component={IndexPage}
    />
    <Route
        exact={true}
        path={AppPaths.contact.root}
        component={ContactPage}
    />
    <Route
        exact={true}
        path={AppPaths.book.root}
        component={BookPage}
    />
    ...
</Switch>
```

Define achors

```tsx
<a href={AppPaths.index.build()}>Home</a>
// => <a href="/">Home</a>
<a href={AppPaths.contact.build()}>Contact</a>
// => <a href="/contact">Contact</a>
<a href={AppPaths.book.build({ name: 'alphabet' })}>Alphabet</a>
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
<a href={AppPaths.book.build({ name: 'alphabet', page: 1 })}>Alphabet</a>
// => <a href="/book/alphabet?page=1">Alphabet</a>
<a href={AppPaths.book.build({ name: 'geography', page: 2 })}>Geography</a>
// => <a href="/book/geography?page=2">Geography</a>
```
