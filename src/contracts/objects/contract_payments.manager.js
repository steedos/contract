const objectql = require('@steedos/objectql');
const contractManager = require('./contracts.manager');
/**
 * 
 * @param {string} paymentId 
 */
async function caculatePaidAmount (paymentId) {
  if (!paymentId) {
    return;
  }
  const steedosSchema = objectql.getSteedosSchema();
  let doc = await steedosSchema.getObject('contract_payments').findOne(paymentId, { fields: ['contract'] });
  if (!doc) {
    console.error(`未找到付款：${paymentId}`);
    return;
  }
  await contractManager.caculateAmount(doc.contract);
}

module.exports = {
  caculatePaidAmount
};