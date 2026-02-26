ARG BUILDPLATFORM

FROM --platform=$BUILDPLATFORM oven/bun:1.3@sha256:b86c67b531d87b4db11470d9b2bd0c519b1976eee6fcd71634e73abfa6230d2e AS build
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
ENV NODE_ENV=production
RUN bun run build

FROM nginx:1.29-alpine@sha256:1d13701a5f9f3fb01aaa88cef2344d65b6b5bf6b7d9fa4cf0dca557a8d7702ba

ARG BUILD_TIMESTAMP="n/a"
ARG COMMIT_HASH="n/a"
ARG IMAGE_NAME="website"
ARG IMAGE_URL_BASE="github.com/barnes-c"
ARG VERSION="dev"
ENV NODE_ENV=production

LABEL \
    org.opencontainers.image.authors="https://${IMAGE_URL_BASE}" \
    org.opencontainers.image.created="${BUILD_TIMESTAMP}" \
    org.opencontainers.image.description="Website for https://barnes.biz" \
    org.opencontainers.image.documentation="https://barnes.biz" \
    org.opencontainers.image.licenses="GPL-3.0-only" \
    org.opencontainers.image.ref.name="${VERSION}" \
    org.opencontainers.image.revision="${COMMIT_HASH}" \
    org.opencontainers.image.source="https://${IMAGE_URL_BASE}/${IMAGE_NAME}.git" \
    org.opencontainers.image.title="${IMAGE_NAME}" \
    org.opencontainers.image.url="https://${IMAGE_URL_BASE}/${IMAGE_NAME}" \
    org.opencontainers.image.vendor="Barnes-C" \
    org.opencontainers.image.version="${VERSION}"

COPY ./.docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/out /usr/share/nginx/html

RUN adduser -D -H -u 1001 -s /sbin/nologin appuser \
    && mkdir -p /var/cache/nginx /var/run \
    && chown -R 1001:1001 /usr/share/nginx/html /var/cache/nginx /var/run /etc/nginx

USER 1001
EXPOSE 8080
