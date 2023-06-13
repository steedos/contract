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

    afterUpdate: async function(){
        const id = this.doc._id;
        const previousDoc = this.previousDoc;
        const doc = await this.getObject('contracts').findOne(id);
        const objectObj = objectql.getObject("contracts");

        //发起流程后，合同状态变更为审批中
        if (doc.instance_state == 'pending' && doc.instance_state != previousDoc.instance_state) {
            await objectObj.directUpdate(id, { contract_fulfillment_state: 'approving' });
        }
        //审批通过后，状态变更为执行中
        if (doc.instance_state == 'approved' && doc.instance_state != previousDoc.instance_state) {
            await objectObj.directUpdate(id, { contract_fulfillment_state: 'toperformthe' });
        }
        //审批不通过/取消申请，状态变更为已取消
        if ((doc.instance_state == 'rejected'||doc.instance_state == 'terminated') && doc.instance_state != previousDoc.instance_state) {
            await objectObj.directUpdate(id, { contract_fulfillment_state: 'cancel' });
        }
    },

}