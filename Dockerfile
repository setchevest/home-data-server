FROM node:latest
RUN mkdir -p /usr/src/app/dist
COPY /dist /usr/src/app/dist/
COPY package*.json /usr/src/app/
WORKDIR /usr/src/app
EXPOSE 8080
RUN npm install
CMD ["npm", "start"]