FROM node:22.4-alpine3.19 as builder
ARG build_script
ENV BUILD_SCRIPT=${build_script} \
    BUILD_DIR=dist

WORKDIR /build/src

COPY package.json package-lock.json ./
RUN npm install

COPY ./ ./
RUN npm run ${BUILD_SCRIPT}

RUN mkdir /build/app
RUN mv ${BUILD_DIR}/ /build/app/build

FROM bitnami/nginx:1.25
ENV WORKDIR=/var/www/app \
    LOG_LEVEL="INFO" \
    DEBUG='False'

USER 0

RUN install_packages curl

WORKDIR ${WORKDIR}

COPY --from=builder /build/app/build/ ./
RUN chown -R 1001:1001 ./

COPY --chmod=755 ./.devops/nginx/init.sh /docker-entrypoint-initdb.d/custom_init_script.sh
COPY --chown=1001:0 ./.devops/nginx/server.conf /opt/bitnami/nginx/conf/server_blocks/server.conf
COPY ./.devops/nginx/nginx.conf /opt/bitnami/nginx/conf/nginx.conf

USER 1001

EXPOSE 8000
EXPOSE 8080