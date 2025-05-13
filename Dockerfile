FROM node:20.12.2-alpine

# Create app directory
WORKDIR /usr/src/app

# Update Alpine packages and clean up
RUN apk update && apk upgrade && \
    apk add --no-cache dumb-init && \
    rm -rf /var/cache/apk/*

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application source code
COPY . .

# Create directory for uploads with proper permissions
RUN mkdir -p ./uploads && \
    chown -R node:node /usr/src/app

# Switch to non-root user
USER node

# Expose the application port
EXPOSE 3000

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Command to run the application
CMD ["node", "index.js"]