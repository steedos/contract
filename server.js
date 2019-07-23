var server = require('@steedos/meteor-bundle-runner');
var objectql = require("@steedos/objectql");
var path = require('path');
var express = require('express');
var stimulsoftPlugin = require('@steedos/plugin-stimulsoft-report');
var jsreportPlugin = require('@steedos/plugin-jsreport');
var steedos = require('@steedos/core')
let app = express();

server.Fiber(function () {
    try {
        server.Profile.run("Server startup", function () {
            server.loadServerBundles();
            steedos.init();
            server.callStartupHooks();
            server.runMain();
        })
    } catch (error) {
       console.error(error.stack);
    }
}).run();