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
COPY index.html /usr/src/app

CMD [ "node", "server.js" ]


