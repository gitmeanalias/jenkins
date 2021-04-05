FROM node:10-alpine

COPY package.json package-lock.json ./

RUN npm install && mkdir /api && mv ./node_modules ./api

WORKDIR /api

COPY . .

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
