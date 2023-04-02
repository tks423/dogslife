# Use a Node.js LTS version as the base image
FROM node:lts

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the Node.js dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the application listens on
EXPOSE 3000

# Start the Node.js application
CMD ["npm", "start"]
