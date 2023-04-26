FROM node:20.0 AS builder

WORKDIR /app

COPY nest-cli.json .
COPY package.json .
COPY package-lock.json .
COPY tsconfig.build.json .
COPY tsconfig.json .

COPY src src
COPY test test

RUN npm i -g typescript @nestjs/cli
RUN npm ci
RUN nest build

FROM node:20.0

WORKDIR /app

COPY --from=builder /app/dist .
COPY package.json .
COPY package-lock.json .

RUN npm ci

ENV MONGO_URL=mongodb://localhost:27017/bgg
ENV PORT=3000

EXPOSE ${PORT}

ENTRYPOINT node main
