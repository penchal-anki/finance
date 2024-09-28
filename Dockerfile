# Use the official Node.js 18 image as base
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json ./

# Install dependencies with a retry mechanism
RUN npm install 

# Copy the rest of your application code to the working directory
COPY . .

# Build the application
RUN npm run build
EXPOSE 3001

# Command to run your application using npm
CMD ["npm", "start"]