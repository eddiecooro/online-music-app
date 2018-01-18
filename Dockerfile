FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm Install

# Bundle app source
COPY . .

EXPOSE 3001

CMD [ "npm", "start" ]