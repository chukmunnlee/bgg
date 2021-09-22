ARG TAG=16
ARG FRONTEND
FROM node:${TAG} as builder

ARG APP_DIR=/app

WORKDIR ${APP_DIR}

ADD backend backend
ADD common common

WORKDIR ${APP_DIR}/backend

RUN npm i -g @nestjs/cli
RUN npm ci

RUN nest build

###############

FROM ${FRONTEND}

ARG APP_DIR=/app

WORKDIR ${APP_DIR}

COPY --from=builder ${APP_DIR}/backend/dist ./dist

ADD backend/package.json .
ADD backend/package-lock.json .
RUN npm ci

ENV PORT=3000 BGG_CLIENT=/app/frontend

HEALTHCHECK --interval=60s --timeout=3s --start-period=5s --retries=3 \
	CMD curl -f localhost:$PORT/healthz || exit 1

ENTRYPOINT [ "node", "dist/main" ]
