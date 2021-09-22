ARG TAG=16
FROM node:${TAG} as builder

ARG APP_DIR=/app

WORKDIR ${APP_DIR}

ADD frontend frontend
ADD common common

WORKDIR ${APP_DIR}/frontend

RUN npm i -g @angular/cli
RUN npm ci

RUN ng build

###############

ARG TAG=16
FROM node:${TAG} 

ARG APP_DIR=/app

WORKDIR ${APP_DIR}

COPY --from=builder ${APP_DIR}/frontend/dist/frontend ./frontend
