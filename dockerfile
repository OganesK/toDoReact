FROM node:16

WORKDIR /app/server
COPY /server/package*.json .
RUN npm install
COPY ./server/ ./

WORKDIR /app/client
COPY /client/package*.json .
RUN npm install 
COPY /client/ ./

RUN npm run build
RUN rm -rf ./node_modules

WORKDIR /app/server

ENV PORT=3001 NODE_ENV=production
EXPOSE 3001

CMD ["npm", "start"]