#!/bin/bash

STATUS_PORT=${STATUS_PORT:="8000"}
SERVER_PORT=${SERVER_PORT:="8080"}
sed -i "s|{{STATUS_PORT}}|${STATUS_PORT}|g" /opt/bitnami/nginx/conf/server_blocks/server.conf
sed -i "s|{{SERVER_PORT}}|${SERVER_PORT}|g" /opt/bitnami/nginx/conf/server_blocks/server.conf