# NestJS NextJS Integration

## Installation

    yarn add nest-next

## Usage

### Import and register the RenderModule

In the `main.ts`, import Next and prepare it. Get the `RenderService` and register it by passing it the
Nest application and next server.

    const dev = process.env.NODE_ENV !== 'production';
    const app = Next({ dev });

    await app.prepare();

    const server = await NestFactory.create(AppModule);

    const renderer = server.get(RenderModule);
    renderer.register(server, app);

    await server.listen(process.env.PORT || 3000);

In the `application.module.ts` import the RenderModule.

    import { Module } from '@nestjs/common';
    import { RenderModule } from 'nest-next';

    @Module({
      imports: [
        RenderModule,
        ...
      ],
      ....
    })
    export class AppModule {}

#### Default views/pages folder

By default the the renderer will serve pages from the `/pages/views` dir. Due to limitations with
Next the `/pages` dir is not configurable, but the directory within the `/pages` dir is configurable.

The `register` method on the `RenderModule` takes an optional parameter `viewsDir` which determine the
folder inside of `pages` to render from. By default the value is `/views` but this can be changed or
set to null to render from the root of `pages`.

    interface RegisterOptions {
      viewsDir: null | string;
    }

### Rendering Pages

The `RenderModule` overrides the Express/Fastify render. To render a page in your controller import
the Render decorator from `@nestjs/common` and add it to the method that will render the page. The
path for the page is relative to the `/pages` directory.

    import {
      Controller,
      Get,
      Render,
    } from '@nestjs/common';

    @Controller()
    export class AppController {

      @Get()
      @Render('Index')
      public icons() {
        // initial props
        return {
          title: 'Next with Nest',
        };
      }
    }

### Example folder structure

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
    next.config.js
    .babelrc
    .babelrc-server

## Configuring Next

**Required Dependencies**

- `@zeit/next-typescript`

**Next Config**

To enable typescript and custom server support with Next the `next.config.js` file must be modified.

    const withTypescript = require('@zeit/next-typescript');

    module.exports = withTypescript({
      useFileSystemPublicRoutes: false,
    });

**Babel**

The .babelrc file must be edited as well.

    {
      "presets": ["next/babel", "@zeit/next-typescript/babel"],
      "plugins": [
        [
          "@babel/plugin-proposal-decorators",
          {
            "legacy": true
          }
        ],
      ],
    }

## By Example

A fully setup project with some additional things (.env, caching) can be viewed in
the [example folder](/example)
