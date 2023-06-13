const objectql = require('@steedos/objectql');

module.exports = {
    listenTo: 'contracts',

    beforeInsert: async function(){
        let doc = this.doc;
        if (doc.cash_flow_type){
            let steedosSchema = objectql.getSteedosSchema();
            let this_contract_type = await steedosSchema.getObject('contract_types').find({ filters: [['_id', '=', doc.contract_type]] });
            if (doc.cash_flow_type == 'receive'){
                doc.collection = true;
                doc.payment = false; 
            } else if (doc.cash_flow_type == 'pay'){
                doc.collection = false;
                doc.payment = true; 
            } else if (doc.cash_flow_type == 'receive_and_pay'){
                doc.collection = true;
                doc.payment = true; 
            } 
        }  
    },

    afterInsert: async function () {
        const { doc } = this;
        const now = new Date();
        if (doc.othercompany){
            doc.othercompany.forEach(function (item) {
                // console.log("item:",item);
                let this_account_bank_id = '';
                /* let this_account_bank = objectql.getObject('account_banks').find({ filters: [['account', '=', item]] });
                console.log("this_account_bank:",this_account_bank);
                if (this_account_bank[0]){
                    this_account_bank_id = this_account_bank[0]._id;
                    console.log("find : this_account_bank_id:");
                }
                for (const this_account_bank_item of this_account_bank) {
                    this_account_bank_id = this_account_bank_item._id;
                    console.log("find : this_account_bank_id:");
                }
                console.log("this_account_bank_id:",this_account_bank_id); */
                const othercompanyDoc = {
                    contracts: doc._id,
                    othercompany_name: item,
                    pk_bankdoc: this_account_bank_id,
                    owner: doc.owner,
                    space: doc.space,
                    created: now,
                    modified: now,
                    created_by: doc.owner,
                    modified_by: doc.owner,
                    company_id: doc.company_id,
                    company_ids: doc.company_ids
                };
                objectql.getObject('contract_othercompany').insert(othercompanyDoc)
            })
        }
    },

    beforeUpdate: async function(){
        let doc = this.doc;
        if (doc.cash_flow_type){
            let steedosSchema = objectql.getSteedosSchema();
            let this_contract_type = await steedosSchema.getObject('contract_types').find({ filters: [['_id', '=', doc.contract_type]] });
            if (doc.cash_flow_type == 'receive'){
                doc.collection = true;
                doc.payment = false; 
            } else if (doc.cash_flow_type == 'pay'){
                doc.collection = false;
                doc.payment = true; 
            } else if (doc.cash_flow_type == 'receive_and_pay'){
                doc.collection = true;
                doc.payment = true; 
            } 
        }      
    },

}