# NEST-NEXT SEGREGATED EXAMPLE

This example demonstrates how to use nest-next to add server side rendering to [nest](https://github.com/nestjs/nest) with [next.js](https://github.com/zeit/next.js/).

All needed components are expected to be in a mono repo with multiple projects, with this folder being the root of the repo.

To run this project, the "ui" and "server" project must be built, in any order. The "dto" project will be implicitly built by the "server" project. After both of those builds, the "server" project can be started in either dev or production mode.

It is important that "ui" references to "dto" refer to the TypeScript files (.ts files in the "src" folder), and NOT the declaration files (.d.ts files in the "dist" folder), due to how Next not being compiled in the same fashion as the server.
