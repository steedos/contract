const objectql = require('@steedos/objectql');
/**
 * 
 * @param {string} contractId 
 */
async function caculateAmount(contractId) {
  if (!contractId) {
    return;
  }
  const steedosSchema = objectql.getSteedosSchema();
  let contractObj = steedosSchema.getObject('contracts');
  let contract = await contractObj.findOne(contractId);
  if (!contract) {
    console.error(`未找到合同：${contractId}`);
    return;
  }
  let bop = contract.bop;
  let cAmount = contract.amount;
  if ('付款合同' == bop) {
    let paidAmount = 0;
    (await steedosSchema.getObject('contract_payments').find({ filters: `(contract eq '${contractId}') and (finished eq true)` })).forEach(function (payment) {
      paidAmount += (payment.amount || 0);
    });
    let unPaidAmount = cAmount - paidAmount;
    await contractObj.directUpdate(contractId, { paid_amount: paidAmount, unpaid_amount: unPaidAmount });
  } else if ('收款合同' == bop) {
    let receivedAmount = 0;
    (await steedosSchema.getObject('contract_receipts').find({ filters: `(contract eq '${contractId}') and (finished eq true)` })).forEach(function (receipt) {
      receivedAmount += (receipt.amount || 0);
    });
    let unReceivedAmount = cAmount - receivedAmount;
    await contractObj.directUpdate(contractId, { received_amount: receivedAmount, unreceived_amount: unReceivedAmount });
  }
}

module.exports = {
  caculateAmount
};