FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

COPY src/modules/subscriptions/templates/ dist/modules/subscriptions/templates/

CMD ["node", "dist/main"]
