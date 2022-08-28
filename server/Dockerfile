FROM node:18.7.0


RUN mkdir /app

WORKDIR /app


COPY package.json .

RUN npm install


COPY . .

EXPOSE 5000
CMD ["node", "index.js"]