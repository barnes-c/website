ARG BUILDPLATFORM

FROM --platform=$BUILDPLATFORM oven/bun:1.3@sha256:87416c977a612a204eb54ab9f3927023c2a3c971f4f345a01da08ea6262ae30e AS build
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
ENV NODE_ENV=production
RUN bun run build

FROM node:25-alpine@sha256:bdf2cca6fe3dabd014ea60163eca3f0f7015fbd5c7ee1b0e9ccb4ced6eb02ef4

RUN apk upgrade --no-cache

ARG BUILD_TIMESTAMP="n/a"
ARG COMMIT_HASH="n/a"
ARG IMAGE_NAME="website"
ARG IMAGE_URL_BASE="github.com/barnes-c"
ARG VERSION="dev"
ENV HOSTNAME=0.0.0.0
ENV NODE_ENV=production
ENV PORT=8080

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

WORKDIR /app

COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

RUN adduser -D -H -u 1001 -s /sbin/nologin appuser \
    && chown -R 1001:1001 /app

USER 1001
EXPOSE 8080

CMD ["node", "server.js"]
