const SteedosService = require("@steedos/service-steedos-server");
const path = require('path');

module.exports = {
    name: "steedos-project-template-steedos-server",
    namespace: "steedos",
    mixins: [SteedosService],
    dependencies: ['metadata-server'],
    settings: {
        // Change port setting
        port: process.env.PORT,
        rootUrl: process.env.ROOT_URL,
        mongoUrl: process.env.MONGO_URL,

        nodeRedServer: {
            enabled: false,
            userDir: path.join(process.cwd(), "node-red-app"),
        },
        apiServer: {
            enabled: true
        }
    }
}