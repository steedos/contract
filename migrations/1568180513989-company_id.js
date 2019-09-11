'use strict'

let db = require("../db");

// 判断 company 表为空，执行 company_id 升级
module.exports.up = async function (next) {
    let companys = await db.find("company", {
        fields: ["company_id"]
    }).catch((ex) => { 
        console.error(ex); 
        return []; 
    });
    if (companys.length){
        console.log("migrations up '1568180513989-company_id'脚本已跳过：已经有companys记录");
        return
    }

    // ["is_group", "=", undefined]查的是is_group未定义的情况，对应到mongo语法`is_group: { $exists: false }`
    let orgs = await db.find("organizations", {
        filters: [["is_company", "=", true], ["is_group", "=", undefined]],
        fields: ["name", "space", "owner", "created_by", "created", "modified_by", "modified"]
    }).catch((ex) => {
        console.error(ex);
        return [];
    });

    console.log(`migrations up '1568180513989-company_id'将插入${orgs.length}条组织对应的company记录`);
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
        console.log("migrations up '1568180513989-company_id' inserted company:", insertedDoc._id, insertedDoc.name);
    }
}

module.exports.down = async function (next) {
    let companys = await db.find("company", {
        fields: ["_id"]
    }).catch((ex) => {
        console.error(ex);
        return [];
    });
    console.log(`migrations down '1568180513989-company_id'将删除${companys.length}条company记录`);
    for (let item of companys) {
        await db.delete("company", item._id).catch((ex) => {
            console.error(ex);
            return [];
        });
        console.log("migrations down '1568180513989-company_id' deleted company._id:", item._id);
    }
}
