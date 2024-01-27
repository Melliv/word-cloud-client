FROM node:lts-alpine as build
WORKDIR /website
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000