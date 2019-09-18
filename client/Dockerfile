FROM alpine:3.9
ENV NODE_VERSION 12.10.0
# Create app directory and us it as the working directory
RUN mkdir -p /app/calendarious/client
# Go into the app folder by making it the working directory
WORKDIR /app/calendarious/client
# Copy the local package.json and package-lock.json files into the container
COPY package.json yarn.lock /app/calendarious/client
# Install dependencies
RUN yarn
# Copy local code into the container
COPY . /app/calendarious/client
# Build for production.
RUN yarn run build
