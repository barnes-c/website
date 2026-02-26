ARG BUILDPLATFORM

FROM --platform=$BUILDPLATFORM oven/bun:1.3@sha256:b86c67b531d87b4db11470d9b2bd0c519b1976eee6fcd71634e73abfa6230d2e AS build
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
ENV NODE_ENV=production
RUN bun run build

ARG NODE_IMAGE_DIGEST=sha256:e4bf2a82ad0a4037d28035ae71529873c069b13eb0455466ae0bc13363826e34
FROM node:22-alpine@${NODE_IMAGE_DIGEST}

RUN apk upgrade --no-cache

ARG BUILD_TIMESTAMP="n/a"
ARG COMMIT_HASH="n/a"
ARG IMAGE_NAME="website"
ARG IMAGE_URL_BASE="github.com/barnes-c"
ARG VERSION="dev"
ARG IMAGE_TAG="${VERSION}"

ENV NODE_ENV=production
ENV PORT=8080
ENV HOSTNAME=0.0.0.0

LABEL \
    org.opencontainers.image.authors="https://github.com/barnes-c" \
    org.opencontainers.image.base.name="node:22-alpine" \
    org.opencontainers.image.base.digest="${NODE_IMAGE_DIGEST}" \
    org.opencontainers.image.created="${BUILD_TIMESTAMP}" \
    org.opencontainers.image.description="Website for https://barnes.biz" \
    org.opencontainers.image.documentation="https://barnes.biz" \
    org.opencontainers.image.licenses="GPL-3.0-only" \
    org.opencontainers.image.ref.name="${IMAGE_NAME}" \
    org.opencontainers.image.revision="${COMMIT_HASH}" \
    org.opencontainers.image.source="https://${IMAGE_URL_BASE}/${IMAGE_NAME}.git" \
    org.opencontainers.image.title="website" \
    org.opencontainers.image.url="https://${IMAGE_URL_BASE}/${IMAGE_NAME}" \
    org.opencontainers.image.vendor="Barnes-C" \
    org.opencontainers.image.version="${VERSION}"

WORKDIR /app

COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

RUN adduser -D -H -u 1001 -s /sbin/nologin appuser \
    && chown -R 1001:1001 /app

USER 1001
EXPOSE 8080

CMD ["node", "server.js"]
