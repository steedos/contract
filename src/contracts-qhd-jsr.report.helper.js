function rowIndex(i) {
    return i + 1;
}

function computeContractTypeTagCount(contractTypeId, tag, result) {
    return result.contractTypes[contractTypeId].tags[tag].count;
}

function computeContractTypeTagSum(contractTypeId, tag, result) {
    return deci(result.contractTypes[contractTypeId].tags[tag].sum / 10000, 2);
}

function computeContractTypesTagTotalCount(contractTypes, tag, result) {
    var count = 0;
    contractTypes.forEach(function (item) {
        count += computeContractTypeTagCount(item._id, tag, result);
    });
    return count;
}

function computeContractTypesTagTotalSum(contractTypes, tag, result) {
    var sum = 0;
    contractTypes.forEach(function (item) {
        sum = add(sum, computeContractTypeTagSum(item._id, tag, result));
    });
    return sum;
}

function computeTotalTagCount(tag, result) {
    return result.tags[tag].count;
}

function computeTotalTagSum(tag, result) {
    return deci(result.tags[tag].sum / 10000, 2);
}

function computeTotalCount(tag, result) {
    return result.total.count;
}

function computeTotalSum(tag, result) {
    return deci(result.total.sum / 10000, 2);
}

//定义一个加法函数，以解决金额相加精度问题
function add() {
    var args = arguments,//获取所有的参数
        lens = args.length,//获取参数的长度
        d = 0,//定义小数位的初始长度，默认为整数，即小数位为0
        sum = 0;//定义sum来接收所有数据的和
    //循环所有的参数
    for (var key in args) {//遍历所有的参数
        //把数字转为字符串
        var str = "" + args[key];
        if (str.indexOf(".") != -1) {//判断数字是否为小数
            //获取小数位的长度
            var temp = str.split(".")[1].length;
            //比较此数的小数位与原小数位的长度，取小数位较长的存储到d中
            d = d < temp ? temp : d;
        }
    }
    //计算需要乘的数值
    var m = Math.pow(10, d);
    //遍历所有参数并相加
    for (var key1 in args) {
        sum += args[key1] * m;
    }
    //返回结果
    return sum / m;
}

function deci(num, v) {
    /*
        十进制浮点数转换，
        num表示要四舍五入的数，
        v表示要保留的小数位数。
    */
    var vv = Math.pow(10, v);
    return Math.round(num * vv) / vv;
}

function filteredReportName(userFilters) {
    var reName = "QHD";
    var signedDateName = "";
    if (userFilters) {
        userFilters.forEach(function (item) {
            if (item.field === "signed_date") {
                signedDateName = new Date(item.value[0]).toLocaleDateString() + "至" + new Date(item.value[1]).toLocaleDateString();
            }
        });
        if (signedDateName) {
            reName += signedDateName;
        }
    }
    reName += "合同统计报表";
    return reName;
}

function filteredCompanyName(userFilterCompany) {
    return userFilterCompany;
}