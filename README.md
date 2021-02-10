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

`PagePath` class constructor receives `string` or `PagePathOptions` interface. `string` type represents `path` value.

| Name          | Required | Type                        | Description          |
| ------------- | -------- | --------------------------- | -------------------- |
| `path`        | Yes      | `string`                    | Root path            |
| `pathParams`  | No       | `string` or `Array<string>` | Subdirectories names |
| `queryParams` | No       | `string` or `Array<string>` | Queries names        |

## Using with `react-router-dom`

### Define interface

```tsx
export interface BookPath {
    name: string;
}
```

### Define container

```tsx
import { PagePath } from 'page-path';

export const AppPaths = {
    index: new PagePath('/'),
    contact: new PagePath('/contact'),
    book: new PagePath<BookPath>('/book/:name'),
};
```

### Define routes

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

### Define achor

```tsx
<a href={AppPaths.index.url()}>Home</a> // => <a href="/">Home</a>
<a href={AppPaths.contact.url()}>Contact</a> // => <a href="/contact">Contact</a>
<a href={AppPaths.book.url({ name: 'alphabet' })}>Alphabet</a> // => <a href="/book/alphabet">Alphabet</a>
```
