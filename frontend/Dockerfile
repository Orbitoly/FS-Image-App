# Use latest LTS version of Node.js
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install PNPM globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package.json and pnpm-lock.yaml to leverage Docker cache
COPY package.json pnpm-lock.yaml ./

# Install dependencies using PNPM
RUN pnpm install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Build the application
RUN pnpm run build

# Expose port (Vite default is 5173)
EXPOSE 5173

# Start the application in preview mode (optimized static build)
CMD ["pnpm", "run", "preview", "--host"]
