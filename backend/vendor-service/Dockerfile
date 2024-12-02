FROM node:16

WORKDIR /app

RUN apt-get update && apt-get install -y curl

# Copy the service-specific package.json
COPY ./package.json ./
# COPY ../../package.json ../../package-lock.json ./


# Copy the root-level package-lock.json
# COPY ./package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the application port
EXPOSE 3001

# Start the application
CMD ["npm", "start"]
