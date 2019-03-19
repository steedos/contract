var server = require('@steedos/meteor-bundle-runner');

server.Fiber(function () {
    server.Profile.run("Server startup", function () {
        server.loadServerBundles();
        server.callStartupHooks();
        require("@steedos/steedos-crm-app");
        require("./index");
        server.runMain();
    });
}).run();