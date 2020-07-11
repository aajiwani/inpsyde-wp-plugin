#!/bin/bash

node /app/helper/wordpress_install.js

DISPLAY= npx cypress run --env wordpress_host=${WORDPRESS_HOST},wordpress_user=${WP_ADMIN_USER_NAME},wordpress_pass=${WP_ADMIN_PASSWORD}

node /app/helper/modify_wordpress_install.js