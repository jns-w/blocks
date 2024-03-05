FROM node:21-alpine
WORKDIR /app
COPY package.json .
RUN npm install --production
COPY . .
CMD ["npm", "start"]
EXPOSE 8181