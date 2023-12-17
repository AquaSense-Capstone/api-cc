# Pull NodeJS LTS latest image
FROM node:20

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install

# execute prisma
RUN npx prisma generate

# copy all files
COPY . .

# Bind port 3000
EXPOSE 8080
ENV PORT=8080
ENV HOST=0.0.0.0

# Setup Environment
ENV DATABASE_NAME=db_aquasense
ENV DATABASE_USER=root
ENV DATABASE_PASSWORD=aquasense
ENV DATABASE_CONNECTION=localhost


# Run the app
CMD [ "npm", "start" ]
