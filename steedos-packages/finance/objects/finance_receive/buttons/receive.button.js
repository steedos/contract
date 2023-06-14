module.exports = {

    receive: function() {
        Steedos.FIN.financeReceive(this.record);
    },
    receiveVisible: function(object_name, record_id, record_permissions) {
        // 如果是财务管理员则显示出该按钮
        var record = Creator.getObjectRecord(object_name, record_id);
        var userId = Steedos.userId();
        var roles = Creator.USER_CONTEXT.user.roles;
        if (record && ((roles.includes("finance_manager") || roles.includes("admin")))) {
            //return true;
            return false;
        }
        return false;
    }

}