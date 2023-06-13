const objectql = require('@steedos/objectql');

module.exports = {
    listenTo: 'contracts',

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