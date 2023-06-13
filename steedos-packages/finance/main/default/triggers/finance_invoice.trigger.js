 const objectql = require('@steedos/objectql');
const { default: BigNumber } = require('bignumber.js');
// 开票
module.exports = {
    listenTo: 'finance_invoice',

    beforeInsert: async function () {
        let doc = this.doc;
        if (doc.contract) {
            await checkAmount(this.id, doc.money, doc.contract);
        }
    },

    beforeUpdate: async function () {
        let doc = this.doc;
        if (doc.contract) {
            let financeInvoice = await this.getObject('finance_invoice').findOne(this.id, { fields: ['contract'] });
            await checkAmount(this.id, doc.money, financeInvoice.contract);
        }
    }
};

// 开票记录的累计金额应不大于所属的合同总金额（已开票的总金额加当前记录的发票金额，不大于合同金额，保存时校验）
async function checkAmount(invoiceId, amount, contractId) {
    let steedosSchema = objectql.getSteedosSchema();
    let financeInvoices = await steedosSchema.getObject('finance_invoice').find({ filters: [['contract', '=', contractId], ['_id', '!=', invoiceId]] });
    let contract = await steedosSchema.getObject('contracts').findOne(contractId);
    let totalAmount = new BigNumber(amount || 0);
    for (const rInvoice of financeInvoices) {
        totalAmount = totalAmount.plus(new BigNumber(rInvoice.money || 0));
    }
    let applyAmount = new BigNumber(contract.amount || 0);
    if (totalAmount.isGreaterThan(applyAmount)) {
        throw new Error('开票记录的累计金额应不大于所属的合同总金额。');
    }
}