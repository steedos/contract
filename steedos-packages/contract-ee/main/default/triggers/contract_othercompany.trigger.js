const objectql = require('@steedos/objectql');

module.exports = {
    listenTo: 'contract_othercompany',

    afterInsert: async function(){
        const id = this.doc._id;
        const doc = await this.getObject('contract_othercompany').findOne(id);

        //同步修改，合同主表中的相关方字段值
        checkOthers(doc.contracts);
    },

    afterUpdate: async function(){
        const id = this.doc._id;
        const doc = await this.getObject('contract_othercompany').findOne(id);

        //同步修改，合同主表中的相关方字段值
        checkOthers(doc.contracts);
    },

    afterDelete: async function(){        
        const previousDoc = this.previousDoc;
        const id = this.previousDoc._id;

        //同步修改，合同主表中的相关方字段值
        checkOthers(previousDoc.contracts);
    },

}

//同步修改，合同主表中的相关方字段值
async function checkOthers(ContractId) {
    let otherCompanies = await objectql.getObject('contract_othercompany').find({ filters: [['contracts', '=', ContractId]] });
    
    let othercompanyIds = [];
    for (const oCompany of otherCompanies) {
        othercompanyIds.push(oCompany.othercompany_name);
    } 

    let objectObj = objectql.getObject("contracts");
    await objectObj.directUpdate(ContractId, { othercompany: othercompanyIds });

}