FROM node:14.18.0-alpine AS development

# move to directory, create if not exists
RUN mkdir /usr/src/app -p
WORKDIR /usr/src/app

# install and cache app dependencies
# a wildcard is used to the package.json and package-lock.json
COPY package*.json ./

RUN npm install glob rimraf
RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:14.18.0-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN mkdir /usr/src/app -p
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3000

# start app
CMD ["node", "dist/main.js"]