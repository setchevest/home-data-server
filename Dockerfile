FROM node:latest
RUN ln -sf /usr/share/zoneinfo/America/Argentina/Buenos_Aires /etc/localtime
RUN mkdir -p /usr/src/app/src
COPY /src /usr/src/app/src/
COPY package*.json /usr/src/app/
COPY tsconfig.json /usr/src/app/
WORKDIR /usr/src/app
RUN npm install
RUN npm run build
RUN mkdir -p /usr/src/app/dist/public
COPY /dist/public /usr/src/app/dist/public
EXPOSE 8080
CMD ["npm", "start"]