Creator.Objects['contracts'].triggers = {
  "before.insert.calc_stamp_duty": {
    on: 'server',
    when: "before.insert",
    todo: function(userId, doc){
      doc.yinhuashuilv = Creator.getCollection('contract_types').findOne(doc.contract_type).yinhuashuilv;
      var pretax_amount = doc.pretax_amount || 0
		  doc.stamp_duty = pretax_amount * doc.yinhuashuilv
    }
  },
  "before.update.calc_stamp_duty":{
    on: 'server',
    when: "before.update",
    todo: function(userId, doc, fieldNames, modifier, options){
      var yinhuashuilv = Creator.getCollection('contract_types').findOne(doc.contract_type).yinhuashuilv;
      var pretax_amount = 0
      if(_.keys(modifier.$set).indexOf('pretax_amount') > -1){
        pretax_amount = modifier.$set.pretax_amount
      }else{
        pretax_amount = doc.pretax_amount || 0
      }
      modifier.$set = modifier.$set || {}
      modifier.$set.stamp_duty = pretax_amount * yinhuashuilv
      modifier.$set.yinhuashuilv = yinhuashuilv
    }
  }
}