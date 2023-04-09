ARG NODE_ALPINE_VERSION
ARG PORT

FROM node:${NODE_ALPINE_VERSION} as builder
# Create app directory
WORKDIR /usr/src/nestjs-security-rest-api-gateway
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install -g @nestjs/cli

RUN npm install

COPY . ./

RUN npm run build nestjs-security-rest-api-gateway

FROM node:${NODE_ALPINE_VERSION} as production

WORKDIR /home/node/nestjs-security-rest-api-gateway

RUN chown node:node /home/node/nestjs-security-rest-api-gateway

RUN apk add --no-cache tzdata
ENV TZ=Europe/Madrid

USER node

COPY --from=builder --chown=node:node /usr/src/nestjs-security-rest-api-gateway/package*.json /home/node/nestjs-security-rest-api-gateway/
COPY --from=builder --chown=node:node /usr/src/nestjs-security-rest-api-gateway/node_modules /home/node/nestjs-security-rest-api-gateway/node_modules
COPY --from=builder --chown=node:node /usr/src/nestjs-security-rest-api-gateway/dist /home/node/nestjs-security-rest-api-gateway/dist

EXPOSE ${PORT}

ENTRYPOINT ["node", "dist/main"]