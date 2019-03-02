var server = require('@steedos/meteor-bundle-runner');
var Fiber = require("fibers");

Fiber(function () {
    server.loadServerBundles();
    //require("@steedos/steedos-crm-app");
    require("./steedos-app");
    server.callStartupHooks();
    server.runMain();
}).run();