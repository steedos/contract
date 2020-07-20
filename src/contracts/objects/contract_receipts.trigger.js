const contractManager = require('./contracts.manager');
const receiptManager = require('./contract_receipts.manager');
module.exports = {

  listenTo: 'contract_receipts',

  beforeInsert: async function () {
    var doc = this.doc;
    var contract = await this.getObject('contracts').findOne(doc.contract, { fields: { othercompany: 1 } });
    doc.account = contract.othercompany || "";
  },


  beforeUpdate: async function () {
    var doc = this.doc;
    if (_.has(doc, 'contract')) {
      var contract = await this.getObject('contracts').findOne(doc.contract, { fields: { othercompany: 1 } });
      doc.account = contract.othercompany || "";
    }
  },

  afterInsert: async function () {
    await contractManager.caculateAmount(this.doc.contract);
  },

  afterUpdate: async function () {
    await receiptManager.caculateReceiptAmount(this.id);
  },

  afterDelete: async function () {
    await contractManager.caculateAmount(this.previousDoc.contract);
  },
};