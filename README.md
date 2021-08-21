# page-path

Page path builder

<a href="https://www.npmjs.com/package/page-path">
    <img src="https://nodei.co/npm/page-path.png?mini=true"/>
</a>

## Installation:

```
npm install page-path
```

## Usage

1. Define path interface
```tsx
interface BookPath {
    name: string;
    page?: number;
}
```

2. Create page path 

```tsx
const bookPagePath = new PagePath<BookPath>('/book', {
    path: ['name'],
    query: ['page'],
});
```

3. Build path

```tsx
const path = bookPagePath.build({ name: 'alphabet', page: 7 });
// path: "/book/alphabet?page=7"
```

#### constructor

```tsx
    // PagePath class
    constructor(root: string, options: PagePathOptions);
```

Parameters:
`root` - root path.

`options`: path's options. See [PagePathOptions](#PagePathOptions)



#### build(params: any): string

Parameters:
`params` - costom defined params values.

Returns built URL based on passed parameters.



### PagePathOptions

`PagePath` class constructor receives `string` or `PagePathOptions` interface. `string` type represents `root` value.

| Name    | Required | Type                        | Description          | Example                 |
| ------- | -------- | --------------------------- | -------------------- | ----------------------- |
| `path`  | No       | `string` or `Array<string>` | Subdirectories names | /book/**alphabet**?page=7 |
| `query` | No       | `string` or `Array<string>` | Queries names        | /book/alphabet?**page**=7 |
| `ending`  | No      | `string`                    | root path's ending. Use case example: `nextjs` static pages | /book**.html** |




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
        path={AppPaths.index.routePath}
        component={IndexPage}
    />
    <Route
        exact={true}
        path={AppPaths.contact.routePath}
        component={ContactPage}
    />
    <Route
        exact={true}
        path={AppPaths.book.routePath}
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
    book: new PagePath<BookPath>('/book/', {
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
