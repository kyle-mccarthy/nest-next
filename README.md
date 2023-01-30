<div align="center">
  <h1 style="margin: 0;">Nest-Next</h1>
  <p>Render Module to add Nextjs support for Nestjs.</p>
  <a href="https://www.npmjs.com/package/nest-next"><img src="https://img.shields.io/npm/v/nest-next?style=flat-square" alt="npm"></a> <a href="http://makeapullrequest.com"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome"></a> <a href="https://github.com/kyle-mccarthy/nest-next/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="GitHub license"></a></p>

</div>

> nest-next provides a nestjs module to integrate next.js into a nest.js application, it allows the rendering of next.js pages via nestjs controllers and providing initial props to the page as well.

<!-- vim-markdown-toc GFM -->

### Table of Contents

- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Peer Dependencies](#peer-dependencies)
- [Usage](#usage)
- [Configuration](#configuration)
  - [Views/Pages Folder](#viewspages-folder)
  - [Dev Mode](#dev-mode)
  - [tsconfig.json](#tsconfigjson)
  - [Pass-through 404s](#pass-through-404s)
- [Rendering Pages](#rendering-pages)
- [Rendering the initial props](#rendering-the-initial-props)
- [Handling Errors](#handling-errors)
  - [Custom error handler](#custom-error-handler)
    - [ErrorHandler Typedef](#errorhandler-typedef)
    - [Setting ErrorHandler](#setting-errorhandler)
    - [Error Flow (Diagram)](#error-flow-diagram)
- [Examples folder structure](#examples-folder-structure)
  - [Basic Setup](#basic-setup)
  - [Monorepo](#monorepo)
- [Known Issues](#known-issues)
- [Contributing](#contributing)
- [License](#license)

<!-- vim-markdown-toc -->

### Installation

```bash
yarn add nest-next

# or

npm install nest-next
```

### Peer Dependencies

- `react`
- `react-dom`
- `next`

if you are using next.js with typescript which most likely is the case, you will need to also install the typescript types for react and react-dom.

### Usage

Import the RenderModule into your application's root module and call the forRootAsync method.

```typescript
import { Module } from '@nestjs/common';
import Next from 'next';
import { RenderModule } from 'nest-next';

@Module({
  imports: [
    RenderModule.forRootAsync(Next({ dev: process.env.NODE_ENV !== 'production' })),
    ...
  ],
  ...
})
export class AppModule {}
```

### Configuration

The RenderModule accepts configuration options as the second argument in the forRootAsync method.

```typescript
interface RenderOptions {
  viewsDir: null | string;
  dev: boolean;
}
```

#### Views/Pages Folder

By default the the renderer will serve pages from the `/pages/views` dir. Due to limitations with
Next, the `/pages` directory is not configurable, but the directory within the `/pages` directory is configurable.

The `viewsDir` option determines the folder inside of `pages` to render from. By default the value is `/views` but this can be changed or set to null to render from the root of `pages`.

#### Dev Mode

By default the dev mode will be set to `true` unless the option is overwritten. Currently the dev mode determines how the errors should be serialized before being sent to next.

#### tsconfig.json

Next 9 added [built-in zero-config typescript support](https://nextjs.org/blog/next-9#built-in-zero-config-typescript-support). This change is great in general, but next requires specific settings in the tsconfig which are incompatible with what are needed for the server. However, these settings can easily be overridden in the `tsconfig.server.json` file.

If you are having issues with unexpected tokens, files not emitting when building for production, warnings about `allowJs` and `declaration` not being used together, and other typescript related errors; see the `tsconfig.server.json` [file in the example project](/examples/basic/tsconfig.server.json) for the full config.

#### Pass-through 404s

Instead of having Nest handle the response for requests that 404, they can be forwarded to Next's request handler.

```typescript
RenderModule.forRootAsync(
  Next({
    dev: process.env.NODE_ENV !== 'production',
    dir: resolve(__dirname, '..'),
  }),
  { passthrough404: true, viewsDir: null },
),
```

See [this discussion](https://github.com/kyle-mccarthy/nest-next/issues/38#issuecomment-647867509) for more context.

### Rendering Pages

The `RenderModule` overrides the Express/Fastify render. To render a page in your controller import
the Render decorator from `@nestjs/common` and add it to the method that will render the page. The
path for the page is relative to the `/pages` directory.

```typescript
import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('Index')
  public index() {
    // initial props
    return {
      title: 'Next with Nest',
    };
  }
}
```

Additionally, the render function is made available on the res object.

```typescript
@Controller()
export class AppController {
  @Get()
  public index(@Res() res: RenderableResponse) {
    res.render('Index', {
      title: 'Next with Nest',
    });
  }
}
```

The render function takes in the view, as well as the initial props passed to the page.

```typescript
render = (view: string, initialProps?: any) => any;
```

### Rendering the initial props

The initial props sent to the next.js view page can be accessed from the context's query method inside the getInitialProps method.

```typescript
import { NextPage, NextPageContext } from 'next';

// The component's props type
type PageProps = {
  title: string;
};

// extending the default next context type
type PageContext = NextPageContext & {
  query: PageProps;
};

// react component
const Page: NextPage<PageProps> = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

// assigning the initial props to the component's props
Page.getInitialProps = (ctx: PageContext) => {
  return {
    title: ctx.query.title,
  };
};

export default Page;
```

### Handling Errors

By default, errors will be handled and rendered with next's error renderer, which uses the [customizable](https://nextjs.org/docs/#custom-error-handling) \_error page. Additionally, errors can be intercepted by setting your own error handler.

#### Custom error handler

A custom error handler can be set to override or enhance the default behavior. This can be used for things such as logging the error or rendering a different response.

In your custom error handler you have the option of just intercepting and inspecting the error, or sending your own response. If a response is sent from the error handler, the request is considered done and the error won't be forwarded to next's error renderer. If a response is not sent in the error handler, after the handler returns the error is forwarded to the error renderer. See the request flow below for visual explanation.

##### ErrorHandler Typedef

```typescript
export type ErrorHandler = (
  err: any,
  req: any,
  res: any,
  pathname: any,
  query: ParsedUrlQuery,
) => Promise<any>;
```

##### Setting ErrorHandler

You can set the error handler by getting the RenderService from nest's container.

```typescript
// in main.ts file after registering the RenderModule

const main() => {
  ...

  // get the RenderService
  const service = server.get(RenderService);

  service.setErrorHandler(async (err, req, res) => {
    // send JSON response
    res.send(err.response);
  });

  ...
}

```

##### Error Flow (Diagram)

_The image is linked to a larger version_

[![error filter sequence diagram](./docs/out/error-filter-sequence-sm.png)](./docs/out/error-filter-sequence.png)

### Examples folder structure

Fully setup projects can be viewed in the [examples folder](/examples)

#### Basic Setup

Next renders pages from the pages directory. The Nest source code can remain in the default `/src` folder

    /src
      /main.ts
      /app.module.ts
      /app.controller.ts
    /pages
      /views
        /Index.jsx
    /components
      ...
    babel.config.js
    next.config.js
    nodemon.json
    tsconfig.json
    tsconfig.server.json

#### Monorepo

Next renders pages from the pages directory in the "ui" subproject. The Nest project is in the "server" folder.
In order to make the properties type safe between the "ui" and "server" projects, there is a folder called "dto"
outside of both projects. Changes in it during "dev" runs trigger recompilation of both projects.

    /server
      /src
        /main.ts
        /app.module.ts
        /app.controller.ts
      nodemon.json
      tsconfig.json
      ...
    /ui
      /pages
        /index.tsx
        /about.tsx
      next-env.d.ts
      tsconfig.json
      ...
    /dto
      /src
        /AboutPage.ts
        /IndexPage.ts
      package.json

To run this project, the "ui" and "server" project must be built, in any order. The "dto" project will be implicitly built by the "server" project. After both of those builds, the "server" project can be started in either dev or production mode.

It is important that "ui" references to "dto" refer to the TypeScript files (.ts files in the "src" folder), and NOT the declaration files (.d.ts files in the "dist" folder), due to how Next not being compiled in the same fashion as the server.

### Known issues

Currently Next ["catch all routes"](https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes) pages do not work correctly. See issue [#101](https://github.com/kyle-mccarthy/nest-next/issues/101) for details.

### Contributing

To contribute make sure your changes pass the test suite. To run test suite `docker`, `docker-compose` are required. Run `npm run test` to run tests. Playwright will be installed with required packages. To run tests in Next development mode run `npm run test-dev`. You can also specify `NODE_VERSION` and major `NEXT_VERSION` variables to run tests in specific environments.

### License

MIT License

Copyright (c) 2018-present Kyle McCarthy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
