FROM node:10-slim

WORKDIR /app
ENV NODE_ENV development

RUN npm install -g yarn
RUN npm install -g nodemon

COPY .env .
COPY package.json .

RUN yarn install --modules-folder ../node_modules

CMD [ "yarn", "watch" ]

EXPOSE 9229
EXPOSE 3000