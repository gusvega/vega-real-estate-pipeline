#runtime as the base image
FROM alpine:3.18

# Node version
ENV NODE_VERSION 18.0.0

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Set Yarn version
ENV YARN_VERSION 1.22.19

# Install Yarn
RUN apk add --no-cache yarn=${YARN_VERSION}-r0

#Install app dependencies
RUN yarn install

# Copy the app source code to the container
COPY . .

# Build the React app for production
RUN yarn build

# Expose the desired port
EXPOSE 80

# Start app
CMD ["yarn", "start"]
