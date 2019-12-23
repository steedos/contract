FROM steedos/jsreport-2.5.0-full:oracle-instantclient

ADD . /app

WORKDIR /app

RUN npm config set registry http://registry.npm.taobao.org/

RUN npm i yarn -g

RUN npm install -g typescript

RUN yarn config set registry http://registry.npm.taobao.org/

RUN yarn --force

CMD ["yarn", "start"]