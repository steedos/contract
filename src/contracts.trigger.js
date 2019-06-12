Creator.Objects['contracts'].triggers = {
  "before.insert.calc_stamp_duty": {
    on: 'server',
    when: "before.insert",
    todo: function(userId, doc){
      doc.yinhuashuilv = Creator.getCollection('contract_types').findOne(doc.contract_type).yinhuashuilv;
		  if(doc.pretax_amount){
        doc.stamp_duty = doc.pretax_amount * doc.yinhuashuilv
      }
    }
  },
  "before.update.calc_stamp_duty":{
    on: 'server',
    when: "before.update",
    todo: function(userId, doc, fieldNames, modifier, options){
      var yinhuashuilv = Creator.getCollection('contract_types').findOne(doc.contract_type).yinhuashuilv;
		  if(doc.pretax_amount){
        modifier.$set = modifier.$set || {}
        modifier.$set.stamp_duty = doc.pretax_amount * yinhuashuilv
        modifier.$set.yinhuashuilv = yinhuashuilv
      }
      console.log('before.update', userId, doc, fieldNames, modifier, options);
    }
  }
}