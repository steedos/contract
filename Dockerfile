FROM node:8.16.0

ADD . /contracts

WORKDIR /contracts

RUN npm config set registry http://registry.npm.taobao.org/

RUN apt-get install git

RUN yarn --force

VOLUME [ "/contracts/storage" ]

CMD ["yarn", "start"]
