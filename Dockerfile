# FROM node:latest

FROM cypress/included:3.3.2
# ARG WORDPRESS_HOST
# ENV WORDPRESS_HOST $WORDPRESS_HOST

# Add docker-compose-wait tool -------------------
ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

# update and add all the steps for running with xvfb
RUN apt-get update &&\
apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget \
xvfb x11vnc x11-xkb-utils xfonts-100dpi xfonts-75dpi xfonts-scalable xfonts-cyrillic x11-apps

# add the required dependencies
WORKDIR /app
RUN npm i puppeteer cheerio mysql

# Finally copy the build application
COPY ./helper /app
# COPY ./helper/modify_wordpress_install.js /app

COPY ./run-env-setup.sh /app

# RUN mkdir -p /app/cypress/integration

COPY ./cypress /app

# make sure we can run without a UI
ENV DISPLAY :99
RUN Xvfb :99 -screen 0 1024x768x16 &

# Make the installation happen
# RUN node /app/wordpress_install.js

# Modify the site URL to be rightful
# RUN node /app/modify_wordpress_install.js