FROM node:20-alpine
LABEL authors="gabrielmendanha"

WORKDIR /front

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8001

CMD ["npm", "run", "dev", "--", "--host", "--port=8001"]