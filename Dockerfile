# Use a specific Node.js version (>=18.18)
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Expose the port your app will run on
EXPOSE 3000

# Set environment variables for the app (Optional)
ENV NODE_ENV=production
ENV DB_HOST=db
ENV DB_PORT=5432
ENV DB_USER=postgres
ENV DB_PASSWORD=example
ENV DB_NAME=veg_fruit_store

# Command to run the app
CMD ["npx", "nodemon", "index.js"]
