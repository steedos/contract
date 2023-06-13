Steedos.FIN = {};

Steedos.FIN.showFinancereceiveForm = function (fields, formId, doc, onConfirm, title) {
    var schema = Creator.getObjectSchema({ fields: fields });
    Modal.show("quickFormModal", { formId: formId, title: title || "编辑收款信息", confirmBtnText: `保存`, schema: schema, autoExpandGroup: true, doc: doc, onConfirm: onConfirm }, {
        backdrop: 'static',
        keyboard: true
    });
}

Steedos.FIN.financeReceive = function (record) {
    
    const record_id = record._id;
    const object_name = "finance_receive";
    let doc = {};
    doc.new_receipts_state = record.contract_receipts_state;
    doc.new_receipt_date = record.receipt_date;
    doc.new_billno = record.billno;
    var formId = 'financereceiveForm';
    Steedos.FIN.showFinancereceiveForm({
        contract_receipts_state: {
            label: "收款状态",
            type: 'select',
            options:[
                {label: "已收款", value: "received"},
                {label: "未收款", value: "unreceived"}
            ],
            group: "收款信息"
        },
        receipt_date: {
            label: "收款日期",
            type: 'date',
            group: "收款信息"
        },
        billno: {
            label: "财务单据号",
            type: 'text',
            group: "收款信息"
        }
    }, formId, record, function (formValues, e, t) {
        let insertDoc = {$set: formValues.insertDoc}
        var result = Steedos.authRequest(`/api/v4/${object_name}/${record_id}`, { type: 'put', async: false, data: JSON.stringify(insertDoc) });
        if (result) {
            SteedosUI.reloadRecord(Session.get("object_name"), Session.get("record_id"));
            Modal.hide(t);
        }
    })
}
