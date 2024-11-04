

# 快速向导

## 配置环境变量

创建 .env.local，[配置系统环境变量](https://docs.steedos.cn/zh-CN/deploy/steedos-config/) 。 

```bash
ROOT_URL=
```

## 启动华炎魔方平台

开发软件包之前，先启动华炎魔方服务。

1. 使用 docker 启动华炎魔方平台。

推荐使用 docker 启动华炎魔方平台，会自动启动所有依赖服务。

```bash
docker-compose up
```

2. 使用 nodejs 启动华炎魔方平台。

也可以使用 nodejs 启动华炎魔方，需在本地先安装 mongodb, redis 和 nats，或使用 docker 启动相关依赖服务。

```bash
yarn start:db
yarn start:platform
```

## 访问华炎魔方

打开浏览器，访问 http://127.0.0.1:5000，进入华炎魔方。

进入设置应用，可以：
- 创建自定义对象
- 创建应用
- 创建微页面

## 启动合同管理软件包

可以使用微服务的方式扩展华炎魔方。例如本项目基于华炎魔方开发了合同管理解决方案。

可以参考 steedos-packages 文件夹下的例子。

```bash
yarn
yarn start
```

### 了解更多

[关于 Steedos 低代码开发平台](http://docs.steedos.com/)

### 保持联系

如果您有任何疑问或想与其他华炎魔方用户交谈，请[点击进入讨论](https://github.com/steedos/steedos-app-contract/discussions)或扫码添加以下联系方式与我们联系！

### 开发人员微信群


如果您有任何疑问或想与其他华炎魔方用户交谈，请扫码添加以下联系方式与我们联系。

| ![开发者微信交流群](https://steedos.github.io/assets/github/platform/cn/QR_wechat_developers.jpg) | ![商务咨询](https://steedos.github.io/assets/github/platform/cn/business_consulting.jpg)        | ![微信公众号](https://steedos.github.io/assets/github/platform/cn/public_number.jpg)|
| :-----: | :-----: | :-----: |
| 开发人员微信群  | 商务咨询  | 微信公众号 |
