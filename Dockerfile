FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all source code
COPY . .

# Expose container port
EXPOSE 3000

# Start the app on all network interfaces
CMD ["node", "app.js"]
