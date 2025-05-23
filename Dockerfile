# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json /app/
RUN npm install
COPY . .

# Bundle app source including the public and src directories
COPY ./public /app/public
COPY ./src /app/src

# Make port 5173 available to the world outside this container
EXPOSE 5173

# Run npm start when the container launches
CMD ["npm", "run", "start"]
