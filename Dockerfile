FROM node:22-alpine3.20

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies and dev tools
RUN npm install

# Copy app files
COPY . .

# Make wait-for-postgres.sh executable
COPY wait-for-postgres.sh .
RUN chmod +x wait-for-postgres.sh

# Expose your backend ports
EXPOSE 3333

# Run wait-for-postgres.sh then start with nodemon
CMD ["sh", "-c", "./wait-for-postgres.sh"]
