FROM node:14.3.0

WORKDIR "/app"

COPY ./package.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "start-prod" ]