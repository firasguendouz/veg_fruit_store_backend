# Use a specific Node.js version (>=18.18)
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the container
COPY package*.json ./
# Copy the Prisma folder into the container
COPY prisma ./prisma
# Install dependencies
RUN npm install

# Generate Prisma Client
RUN npx prisma generate

# Copy the rest of the application code into the container
COPY . .

# Expose the port your app will run on
EXPOSE 3000

# Command to run the app
CMD ["npm", "run", "start"]
