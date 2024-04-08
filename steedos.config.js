/*
 * @Author: 孙浩林 sunhaolin@steedos.com
 * @Date: 2023-10-27 12:51:52
 * @LastEditors: 孙浩林 sunhaolin@steedos.com
 * @LastEditTime: 2023-10-27 15:13:47
 * @FilePath: /steedos-ee-gitlab/steedos.config.js
 * @Description: 
 */
require('dotenv-flow').config({});

module.exports = {
	// Namespace of nodes to segment your nodes on the same network.
	namespace: "steedos",
	// Default log level for built-in console logger. It can be overwritten in logger options above.
	// Available values: trace, debug, info, warn, error, fatal
	logLevel: "warn",

	// Called after broker started.
	started(broker) {
		
	},
    
    settings: {
        // public: {
		// 	workflow: {
        //     	instance_allow_distribute: true
		// 	}
        // }
    }

};
