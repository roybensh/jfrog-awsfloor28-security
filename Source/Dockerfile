FROM node:16-bullseye

# Create app directory
WORKDIR /usr/src/app
COPY package*.json ./
RUN apt update
# added to ease demo for remote shell
RUN apt-get install -y ncat
# If you are building your code for production
RUN npm ci --only=production
EXPOSE 3000

COPY server.js ./
COPY public public/
COPY views views/
COPY fake-creds.txt /usr/src/
CMD [ "node", "server.js" ]