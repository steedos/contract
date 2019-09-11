'use strict'

let db = require("../db");

module.exports.up = async function (next) {
  let users = await db.findOne("users");
}

module.exports.down = async function (next) {
}
