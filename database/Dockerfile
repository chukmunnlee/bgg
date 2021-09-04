ARG TAG=8
FROM mysql:${TAG}

# build arguments
ARG ROOT_PASSWORD=changeit 

# environment variables
ENV MYSQL_ROOT_PASSWORD=${ROOT_PASSWORD}

ADD bgg.sql /docker-entrypoint-initdb.d

EXPOSE 3306

HEALTHCHECK --interval=60s --timeout=3s --start-period=5s --retries=3 \
	CMD mysqladmin ping -uroot -p${MYSQL_ROOT_PASSWORD} || exit 1
