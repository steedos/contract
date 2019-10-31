var server = require('@steedos/meteor-bundle-runner');
var steedos = require('@steedos/core')
server.Fiber(function () {
    try {
        server.Profile.run("Server startup", function () {
            server.loadServerBundles();
            steedos.init();
            WebAppInternals.setInlineScriptsAllowed(false);
            server.callStartupHooks();
            server.runMain();
        })
    } catch (error) {
       console.error(error.stack)
    }
}).run()
