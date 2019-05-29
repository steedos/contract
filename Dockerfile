FROM node:8.16.0

ADD . /steedos-contracts-app

WORKDIR /steedos-contracts-app

RUN npm config set registry http://registry.npm.taobao.org/

RUN apt-get install git

RUN yarn --force

CMD ["yarn", "start"]
