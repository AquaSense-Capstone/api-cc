# Pull NodeJS LTS latest image
FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install

# copy all files
COPY . .

# Bind port 3000
EXPOSE 3000
ENV PORT=3000
ENV HOST=0.0.0.0

# Run the app
CMD [ "npm", "start" ]
