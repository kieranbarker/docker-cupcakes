FROM postgres:18

ENV POSTGRES_USER=baker
ENV POSTGRES_PASSWORD=muffins
ENV POSTGRES_DB=cupcakes_db

COPY seed.sql /docker-entrypoint-initdb.d/
EXPOSE 5432