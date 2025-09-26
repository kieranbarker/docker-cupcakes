FROM node:22
WORKDIR /home/node/cupcakes
COPY package*.json .
RUN npm ci
COPY . .

# "postgres" is the network alias for the Postgres container, meaning we don't
# need to know its IP address.
ENV PGHOST=postgres
ENV PGPORT=5432
ENV PGDATABASE=cupcakes_db
ENV PGUSER=baker
ENV PGPASSWORD=muffins

EXPOSE 3000
CMD [ "node", "app.js" ]