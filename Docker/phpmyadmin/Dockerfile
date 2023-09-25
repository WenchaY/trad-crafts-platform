FROM phpmyadmin/phpmyadmin:fpm-alpine
LABEL version="1.0"
LABEL description="php-apache"


# execute patches
RUN apk add patch
ADD patches /var/www/html/patches
RUN patch -p1 < patches/0001-Add-custom-scripts.patch
