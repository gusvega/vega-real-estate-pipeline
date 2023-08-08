# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install app dependencies
RUN yarn install

# Copy the app source code to the container
COPY . .

# Build the React app for production
RUN yarn build

# Expose the desired port (e.g., 80)
EXPOSE 80

# Start the app
CMD ["yarn", "start"]
