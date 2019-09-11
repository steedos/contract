'use strict'

let db = require("../db");

// 空值表示以下脚本应用到所有工作区
let limited_space_ids = [];

let upBySpace = async function (spaceId) {
    console.log(`SPACEID: ${spaceId}`);
    let companys = await db.find("company", {
        filters: [["space", "=", spaceId]],
        fields: ["_id"]
    }).catch((ex) => {
        console.error(ex);
        return [];
    });
    if (companys.length) {
        console.log("脚本已跳过：已经有companys记录");
        return
    }

    // ["is_group", "=", undefined]查的是is_group未定义的情况，对应到mongo语法`is_group: { $exists: false }`
    let orgs = await db.find("organizations", {
        filters: [["space", "=", spaceId], [[["is_company", "=", true], ["is_group", "=", undefined]], "or", ["parent", "=", ""]]],
        fields: ["name", "space", "owner", "created_by", "created", "modified_by", "modified"]
    }).catch((ex) => {
        console.error(ex);
        return [];
    });

    for (let org of orgs) {
        let companyDoc = {
            _id: org._id,
            name: org.name,
            organization: org._id,
            space: org.space,
            company_id: org._id,
            created_by: org.created_by,
            created: org.created,
            modified_by: org.modified_by,
            modified: org.modified
        };
        if (org.owner) {
            companyDoc.owner = org.owner;
        }
        let insertedDoc = await db.insert("company", companyDoc).catch((ex) => {
            console.error(ex);
            return null;
        });
        console.log("INSERTED company:", insertedDoc.name);
    }
}

let downBySpace = async function (spaceId) {
    console.log(`SPACEID: ${spaceId}`);
    let companys = await db.find("company", {
        filters: [["space", "=", spaceId]],
        fields: ["_id"]
    }).catch((ex) => {
        console.error(ex);
        return [];
    });
    for (let item of companys) {
        await db.delete("company", item._id).catch((ex) => {
            console.error(ex);
            return [];
        });
        console.log("DELETED company:", item.name);
    }
}

// 判断 company 表为空，执行 company_id 升级
module.exports.up = async function (next) {
    if (limited_space_ids.length){
    }
    else {
        // limited_space_ids为空，则不限制工作区，查出所有工作区ID值循环
        let spaces = await db.find("spaces", {
            fields: ["_id"]
        }).catch((ex) => {
            console.error(ex);
            return [];
        });
        limited_space_ids = spaces.map((n)=>{ return n._id; });
        console.log(`SPACES count: ${limited_space_ids.length}`);
    }
    for (let spaceId of limited_space_ids) {
        await upBySpace(spaceId);
    }
}

module.exports.down = async function (next) {
    if (limited_space_ids.length) {
    }
    else {
        // limited_space_ids为空，则不限制工作区，查出所有工作区ID值循环
        let spaces = await db.find("spaces", {
            fields: ["_id"]
        }).catch((ex) => {
            console.error(ex);
            return [];
        });
        limited_space_ids = spaces.map((n) => { return n._id; });
        console.log(`SPACES count: ${limited_space_ids.length}`);
    }
    for (let spaceId of limited_space_ids) {
        await downBySpace(spaceId);
    }
}
