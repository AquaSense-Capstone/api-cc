# Pull NodeJS LTS latest image
FROM node:20

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# copy env.example to .env
COPY env.example .env

# install dependencies
RUN npm install

# execute prisma
RUN npx prisma generate

ARG DATABASE_USER=root
ARG DATABASE_NAME=db_aquasense
ARG DATABASE_PASSWORD=aquasense
ARG DATABASE_CONNECTION=localhost

# copy all files
COPY . .

# Bind port 3000
EXPOSE 8080
ENV PORT=8080
ENV HOST=0.0.0.0

# Setup Environment
ENV DATABASE_NAME $DATABASE_NAME
ENV DATABASE_USER $DATABASE_USER
ENV DATABASE_PASSWORD $DATABASE_PASSWORD
ENV DATABASE_CONNECTION $DATABASE_CONNECTION

# Run the app
CMD [ "npm", "start" ]
