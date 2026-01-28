ARG BUILDPLATFORM

FROM --platform=$BUILDPLATFORM oven/bun:1.3@sha256:6cd5f00020e48b77a253bc8249f6b6dd3d92b3c04c2607f1f5a6d7dbf0a6fca3 AS build
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
ENV NODE_ENV=production
RUN bun run build

FROM nginx:1.29-alpine@sha256:7d7a15b8a280c661051955f14c2b91fed3e23724ddba18d2f53e8b44e74ab37a

ARG BUILD_TIMESTAMP="n/a"
ARG COMMIT_HASH="n/a"
ARG IMAGE_NAME="website"
ARG IMAGE_URL_BASE="github.com/barnes-c"
ARG VERSION="dev"
ARG IMAGE_TAG="${VERSION}"

ENV NODE_ENV=production

LABEL \
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

COPY ./.docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/out /usr/share/nginx/html

RUN adduser -D -H -u 1001 -s /sbin/nologin appuser \
    && mkdir -p /var/cache/nginx /var/run /var/log/nginx \
    && chown -R 1001:1001 /usr/share/nginx/html /var/cache/nginx /var/run /var/log/nginx /etc/nginx

USER 1001
EXPOSE 8080
