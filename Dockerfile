FROM node:8.16.0-slim

ADD . /steedos-contracts-app

WORKDIR /steedos-contracts-app

RUN yarn --force

CMD ["yarn", "start"]
