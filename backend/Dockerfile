ARG TAG=16
FROM node:${TAG} as builder

ARG APP_DIR=/app

WORKDIR ${APP_DIR}
ADD nest-cli.json .
ADD package.json .
ADD package-lock.json .
ADD tsconfig.build.json .
ADD tsconfig.json .

ADD src src

RUN npm i -g @nestjs/cli
RUN npm ci

RUN nest build

###############

ARG TAG=16
FROM node:${TAG} 

ARG APP_DIR=/app

WORKDIR ${APP_DIR}

COPY --from=builder ${APP_DIR}/dist ./dist

ADD package.json .
ADD package-lock.json .
RUN npm ci

ENV PORT=3000

HEALTHCHECK --interval=60s --timeout=3s --start-period=5s --retries=3 \
	CMD curl -f localhost:$PORT/healthz || exit 1

ENTRYPOINT [ "node", "dist/main" ]
