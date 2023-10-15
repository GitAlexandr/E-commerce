FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
COPY package-lock.json ./
COPY . .
RUN npm i
EXPOSE 4005
CMD ["node", "index.js"]
