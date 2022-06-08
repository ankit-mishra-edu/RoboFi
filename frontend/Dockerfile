### Stage 1: build ###
FROM node:16.13.0-alpine as node

# Set working directory.
WORKDIR /usr/src/app

# Copy app dependencies.
COPY package.json .

# Install angular globally and app dependencies.
RUN npm i -g @angular/cli@11.2.4
RUN npm install

# Copy file from frontend.
COPY . .

# Build angular app
RUN ng build --configuration production


### Stage 2: delivery ###
FROM nginx:1.21.6-alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy output directory from node to nginx image.
COPY --from=node /usr/src/app/dist/robo-fi /usr/share/nginx/html
