#!/bin/bash

docker-compose down
sudo rm -rf data plugins wordpress
docker rmi wordpress-docker_wp_install:latest

sudo rm -rf cypress/screenshots cypress/videos