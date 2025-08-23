#!/bin/sh

until nc -z maximizer_postgres 5432; do
  echo "Waiting for PostgresSQL..."
  sleep 2
done

npm i
echo "PostgresSQl is ready."

# echo "Starting migrations..."
# node ace migration:run
# echo "Seeding database..."
# node ace db:seed
echo "Starting the app..."
npm run dev