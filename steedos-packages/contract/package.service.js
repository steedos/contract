/*
 * @Author: sunhaolin@hotoa.com
 * @Date: 2022-03-04 17:02:52
 * @LastEditors: sunhaolin@hotoa.com
 * @LastEditTime: 2022-12-02 16:18:28
 * @Description: 
 */
"use strict";
const packageJSON = require('./package.json');

/**
 * Steedos Package Service
 * https://docs.steedos.com/developer/development/package
 */
module.exports = {
	name: packageJSON.name,
	namespace: "steedos",
	mixins: [require('@steedos/service-package-loader')],
	/**
	 * Settings
	 */
	settings: {
	},
    metadata: {
        $package: {
            name: packageJSON.name,
            version: packageJSON.version,
            path: __dirname,
            isPackage: true
        }
    },

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {

	},

	/**
	 * Events
	 */
	events: {

    },
	/**
	 * Methods
	 */
	methods: {

	},

	/**
	 * Service created lifecycle event handler
	 */
	async created() {

	},

	/**
     * Service started lifecycle event handler
     */
	 async started() {

    },

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
};
