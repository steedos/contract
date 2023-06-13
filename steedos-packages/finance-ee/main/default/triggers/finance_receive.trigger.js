const objectql = require('@steedos/objectql');

module.exports = {
    listenTo: 'finance_receive',

    beforeInsert: async function(){
        let doc = this.doc;
        if (doc.contract){           
            let steedosSchema = objectql.getSteedosSchema();
            let this_contract = await steedosSchema.getObject('contracts').find({ filters: [['_id', '=', doc.contract]] });
            if (this_contract[0].project){
                doc.project = this_contract[0].project;
            }
        }   
    },

    beforeUpdate: async function(){
        let doc = this.doc;
        if (doc.contract){           
            let steedosSchema = objectql.getSteedosSchema();
            let this_contract = await steedosSchema.getObject('contracts').find({ filters: [['_id', '=', doc.contract]] });
            if (this_contract[0].project){
                doc.project = this_contract[0].project;
            }
        }   
    
    },

}