'use strict'

let db = require("../db");


// 判断 organizations.parent=“”或不存在，更新为null
module.exports.up = async function (next) {
    let organizations = await db.find("organizations", {
        filters: [["parent", "=", ""]],
        fields: ["_id", "parent"]
    }).catch((ex) => {
        console.error(ex);
        return [];
    });
    for (let org of organizations) {
        let updatedDoc = await db.updateOne("organizations", org._id, {parent: null}).catch((ex) => {
            console.error(ex);
            return null;
        });
        console.log("UPDATE organization.parent: " + updatedDoc.name)
    }
}

module.exports.down = async function (next) {
    let updatedDoc = await db.updateOne("organizations", "51ae9b1a8e296a29c9000002", {parent: ""}).catch((ex) => {
        console.error(ex);
        return null;
    });
}
