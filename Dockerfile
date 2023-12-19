# Pull NodeJS LTS latest image
FROM node:20

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install

# copy all files
COPY . .

# Bind port 8000
EXPOSE 8000
ENV PORT=8000
ENV HOST=0.0.0.0

# Run the app
CMD [ "npm", "start" ]
