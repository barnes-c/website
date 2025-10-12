FROM oven/bun:1.3 AS build
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

FROM nginx:1.29-alpine

ARG BUILD_TIMESTAMP="n/a"
ARG COMMIT_HASH="n/a"
ARG IMAGE_NAME="website"
ARG IMAGE_TAG="${VERSION}"
ARG IMAGE_URL_BASE="github.com/barnes-c"
ARG VCS_REF="${COMMIT_HASH}"
ARG VERSION="dev"

LABEL \
    org.opencontainers.image.created="${BUILD_TIMESTAMP}" \
    org.opencontainers.image.description="Website for https://barnes.biz" \
    org.opencontainers.image.documentation="https://www.barnes.biz" \
    org.opencontainers.image.licenses="GPLv3"\
    org.opencontainers.image.ref.name="${IMAGE_NAME}" \
    org.opencontainers.image.revision="${VCS_REF}" \
    org.opencontainers.image.source="https://${IMAGE_URL_BASE}/${IMAGE_NAME}.git" \
    org.opencontainers.image.source="https://github.com/barnes-c/website" \
    org.opencontainers.image.title="website" \
    org.opencontainers.image.url="https://${IMAGE_URL_BASE}/${IMAGE_NAME}" \
    org.opencontainers.image.vendor="Barnes-C" \
    org.opencontainers.image.version="${IMAGE_TAG}"

COPY ./.docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
