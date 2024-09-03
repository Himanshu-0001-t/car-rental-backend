FROM node:20
WORKDIR /src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 6000
CMD [ "node", "index.js" ]