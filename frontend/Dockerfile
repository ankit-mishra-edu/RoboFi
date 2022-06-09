FROM node:16.13.0-alpine as node

# Set working directory.
WORKDIR /usr/src/app/frontend

# Copy file from frontend.
COPY . .

# Install app dependencies.
RUN npm install

# Build angular app
RUN npm run build:docker

# Run node server.js
CMD ["npm", "start"]

EXPOSE 80
