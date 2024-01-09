FROM node:14.17.0-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Install additional npm packages
RUN npm install aws-sdk express body-parser

# Copy the entire current directory contents into the container at /app
COPY . .

# Set AWS credentials using build arguments
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY


# Expose port 4000 to the outside world
EXPOSE 4000

# Command to run the application
CMD ["node", "app.js"]

