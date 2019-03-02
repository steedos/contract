var meteor = require('@steedos/meteor-bundle-runner');
var Fiber = require("fibers");

Fiber(function () {
    meteor.loadServerBundles();
    meteor.callStartupHooks();
    meteor.runMain();
}).run();