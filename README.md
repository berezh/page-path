# page-path

Redux dialog stuff

<a href="https://www.npmjs.com/package/page-path">
    <img src="https://nodei.co/npm/page-path.png?mini=true"/>
</a>

## Installation:

```
npm install page-path
```

## Define paths

```tsx
import { PagePath } from 'page-path';

const index = new AppRoute('/');
const contact = new AppRoute('/contact');

export const AppPaths = {
    index,
    contact,
};
```

## Use with react-router-dom

```tsx
import { Switch, Route } from 'react-router-dom';
...
<Switch>
    <Route
        exact={true}
        path={AppPaths.index.url()}
        component={IndexPage}
    />
    <Route
        exact={true}
        path={AppPaths.contact.url()}
        component={ContactPage}
    />
    ...
</Switch>
```
