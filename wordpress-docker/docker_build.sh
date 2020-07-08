#!/bin/bash

docker-compose up -d
CONT=$(docker ps -aqf "name=local-wp-install")
docker logs -f ${CONT}