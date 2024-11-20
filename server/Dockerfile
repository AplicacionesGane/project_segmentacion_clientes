FROM node:lts-slim

WORKDIR /app

COPY . .

RUN npm install && npm run build

EXPOSE 4020

CMD ["npm", "start"]