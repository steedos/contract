var server = require('@steedos/meteor-bundle-runner');
var Fiber = require("fibers");

Fiber(function () {
    server.loadServerBundles();
    server.callStartupHooks();
    require("@steedos/steedos-crm-app");
    require("./steedos-app");
    server.runMain();
}).run();