var server = require('@steedos/meteor-bundle-runner');
var objectql = require("@steedos/objectql")
var path = require('path');
server.Fiber(function () {
    server.Profile.run("Server startup", function () {
        server.loadServerBundles();
        try {
            let schema = objectql.getSteedosSchema()
            schema.addDataSource('contracts', {
                driver: "mongo",
                url: "mongodb://127.0.0.1/steedos",
                objectFiles: [path.resolve(__dirname, "./src")]
            })

            schema.useAppFile(path.resolve(__dirname, "./src"))

            schema.getDataSource('contracts').createTables()

        } catch (error) {
            console.log(error)
        }
        server.callStartupHooks();
        server.runMain();
    });
}).run();