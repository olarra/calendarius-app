FROM alpine:3.9
ENV NODE_VERSION 12.10.0
# Create app directory and us it as the working directory
RUN mkdir -p /app/calendarious/server
# Go into the app folder by making it the working directory
WORKDIR /app/calendarious/server
# Copy the local package.json and package-lock.json files into the container
COPY package.json yarn.lock /app/calendarious/server
# Install dependencies
RUN yarn
# Copy local code into the container
COPY . /app/calendarious/server
# Build for production.
RUN yarn run dev:server
