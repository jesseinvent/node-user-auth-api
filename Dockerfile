FROM node:15

RUN npm install -g npm@8.1.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN ["npm", "start"]

EXPOSE 3000