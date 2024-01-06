# Use the official Node.js image as the base image
FROM node:18.13-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which the Angular app will run
EXPOSE 4200

# Start the Angular application
CMD ["npm", "start"]
