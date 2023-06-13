 const objectql = require('@steedos/objectql');
const { default: BigNumber } = require('bignumber.js');
// 开票明细
module.exports = {
    listenTo: 'finance_invoice_detail',

    beforeInsert: async function () {
        let doc = this.doc;
        if (doc.invoiceapply) {
            let finance_invoice = await this.getObject('finance_invoice').findOne(doc.invoiceapply, { fields: ['contract'] });
            doc.contract = finance_invoice.contract;
        }
        await checkAmount(this.id, doc.amount, doc.invoiceapply);
    },

    beforeUpdate: async function () {
        let doc = this.doc;
        let id = this.id
        let receiptInvoice = await this.getObject('finance_invoice_detail').findOne(id, { fields: ['invoiceapply'] });
        await checkAmount(id, doc.amount, receiptInvoice.invoiceapply);
    }

};

// 开票明细的累计金额应不大于所属的开票记录的申请开票金额（已开票信息中的发票总金额加当前记录的发票金额，不大于申请开票金额，保存时校验）
async function checkAmount(receiptInvoiceId, amount, invoiceApplyId) {
    let steedosSchema = objectql.getSteedosSchema();
    let receiptInvoices = await steedosSchema.getObject('finance_invoice_detail').find({ filters: [['invoiceapply', '=', invoiceApplyId], ['_id', '!=', receiptInvoiceId]] });
    let receiptInvoiceApply = await steedosSchema.getObject('finance_invoice').findOne(invoiceApplyId);
    let totalAmount = new BigNumber(amount || 0);
    for (const rInvoice of receiptInvoices) {
        totalAmount = totalAmount.plus(new BigNumber(rInvoice.amount || 0));
    }
    let applyAmount = new BigNumber(receiptInvoiceApply.money || 0);
    if (totalAmount.isGreaterThan(applyAmount)) {
        throw new Error('开票明细的累计金额应不大于所属的开票记录的申请开票金额。');
    }
}