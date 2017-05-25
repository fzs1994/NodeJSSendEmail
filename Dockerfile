FROM node:boron
MAINTAINER fsaiyed@officebrain.com

# Create app Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundule app source
COPY server.js /usr/src/app

EXPOSE 3000

CMD [ "node", "server.js" ]


