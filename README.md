# Docker Cupcakes

This is a simple API that serves cupcake data from a database. The goal is to:

1. Demonstrate how to make two Docker containers work together.
2. Use [Docker Compose](https://docs.docker.com/compose/) to make the process more manageable.

## Create the network and volume

By design, Docker containers are isolated from each other. In order for two containers to "talk" to each other, they need to be on the same [**network**](https://docs.docker.com/network/). And because containers are isolated from the host, their data won't be persisted unless we mount a [**volume**](https://docs.docker.com/storage/volumes/).

1. `docker network create cupcakes`
2. `docker volume create pgdata`

## Build the Postgres image and run a container

There's a `Dockerfile` for the Postgres database in the `db` directory. We need to build the image and run a container. We'll put the container on the `cupcakes` network and give it a **network alias** that the other container can use instead of an IP address. We'll also mount the the `pgdata` volume to the `/var/lib/postgresql/data` directory in the container (where Postgres stores its data).

1. `docker build ./db -t cupcakes-db`
2. `docker run -d --network cupcakes --network-alias postgres -v pgdata:/var/lib/postgresql/data cupcakes-db`

## Build the Node image and run a container

There's a `Dockerfile` for the Node app in the root directory. We need to build the image and run a container. We'll put the container on the `cupcakes` network.

1. `docker build . -t cupcakes-app`
2. `docker run -dp 3000:3000 --network cupcakes cupcakes-app`

## Use Docker Compose

This works, but it's difficult to remember all these commands and flags! Using Docker Compose, we can configure all of our services in a single `compose.yaml` file and spin them up with a single command. And even better, Docker Compose automatically adds the services to the same network.

To build both images, we can run `docker compose build`. Then to spin everything up, we can run `docker compose up`. To tear everything down, we can run `docker compose down`.

1. `docker compose build`
2. `docker compose up`
3. `docker compose down`
