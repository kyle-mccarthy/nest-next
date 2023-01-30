#!/bin/bash

npm run build && cp -r dist tests/test-app/nest-next-dist

(cd tests; NODE_VERSION=${NODE_VERSION:-14} NEXT_VERSION=${NEXT_VERSION:-12} docker-compose up -d --build $1)

(cd tests/e2e; npm install; npx playwright install; npx playwright test)
