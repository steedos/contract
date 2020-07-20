const contractManager = require('./contracts.manager');
module.exports = {

  listenTo: 'contracts',

  afterInsert: async function () {
    await contractManager.caculateAmount(this.id);
  },

  afterUpdate: async function () {
    await contractManager.caculateAmount(this.id);
  }
};