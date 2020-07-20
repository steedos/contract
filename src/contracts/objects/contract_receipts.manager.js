const objectql = require('@steedos/objectql');
const contractManager = require('./contracts.manager');
/**
 * 
 * @param {string} receiptId 
 */
async function caculateReceiptAmount(receiptId) {
  if (!receiptId) {
    return;
  }
  const steedosSchema = objectql.getSteedosSchema();
  let doc = await steedosSchema.getObject('contract_receipts').findOne(receiptId, { fields: ['contract'] });
  if (!doc) {
    console.error(`未找到收款：${receiptId}`);
    return;
  }
  await contractManager.caculateAmount(doc.contract);
}

module.exports = {
  caculateReceiptAmount
};