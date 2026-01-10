ARG BUILDPLATFORM

FROM --platform=$BUILDPLATFORM oven/bun:1.3@sha256:e90cdbaf9ccdb3d4bd693aa335c3310a6004286a880f62f79b18f9b1312a8ec3 AS build
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
ENV NODE_ENV=production
RUN bun run build

FROM nginx:1.29-alpine@sha256:c083c3799197cfff91fe5c3c558db3d2eea65ccbbfd419fa42a64d2c39a24027

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
