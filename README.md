# 合同管理系统

合同管理是落实企业风险管理和内部控制的一项核心的管理业务，合同是企业对外交易的门户，合同管理的好坏直接影响企业的经营绩效。华炎合同管理系统以合同为中心，通过合同订立、执行、监督、统计及维护跟踪，在规避法律风险的同时实现合同价值最大化。

- 管客户/供应商：客户、供应商基础信息维护管理、供应商绩效管理、审批、数据统计；
- 管项目：项目预算、项目费用、执行过程控制、数据统计；
- 管合同：管理合同的基本信息，以及客户/供应商、项目、资金、进度等相关信息；
- 管审批：需设置各种复杂合同审批流程，如按合同类型、合同金额等，支持审批记录留痕；
- 管资金：合同应收、应付，实收、开、收发票，数据统计；
- 管进度：对合同进度进行预警提醒，合同执行过程监控；
- 统计分析：多维护的统计报表，如按部门统计、按合同类型、按客户类型等。

华炎合同管理系统基于Creator“低代码”平台开发，只需要针对合同管理相关的业务对象编写配置文件，例如合同、项目、收款、付款、单位、联系人、任务等，并设定合同审批流程，绘制统计报表，即可实现全流程的合同管理功能。将传统开发模式数十个人月的开发工作量压缩到只需要几周。

华炎合同管理系统的个性化定制也非常方便，开发人员无需编写代码，只需配置调整配置文件，即可快速满足业务部门的常见需求。例如调整业务字段、修改审批流程、增加统计报表，通常几个小时就能解决。
- [配置业务对象](src/)，设定对象、关系、字段、视图、触发器、报表。

![界面效果图](https://steedos.github.com/docs/assets/mac_ipad_iphone_home.png)

### 安装前准备
- [Install NodeJS, v8.0.0 or later.](https://nodejs.org/en/)
- [Install MongoDB Community Server v3.4 or later](https://www.mongodb.com/download-center/community)
- [Install Visual Studio Code](https://code.visualstudio.com/)

### 安装 yarn
```
npm i yarn -g
```

### 国内建议使用npm淘宝镜像
```
npm config set registry http://registry.npm.taobao.org/
```

### 使用yarn安装依赖包
```
yarn
```

### 启动服务器
```
yarn start
```

### 了解更多
- [开发文档](https://steedos.github.io)

### docker-compose方式启动服务
```
docker-compose up -d
```
如果修改了代码或者配置，执行`docker-compose build --no-cache`后，`docker-compose up -d`
