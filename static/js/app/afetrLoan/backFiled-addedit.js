$(function() {

    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [ {
        field: 'code1',
        title: '借款编号',
        formatter:function(v,data){
            return data.code
        }
    }, {
        field: 'mobile',
        title: '申请人',
        formatter:function(v,data){
            return data.user.mobile
        }
    }, {
        field: 'realGetAmount',
        title: '借款金额',
        amount: true,
    }, {
        field: 'lxAmount',
        title: '正常利息',
        amount: true,
    }, {
        field: 'fwAmount',
        title: '服务费',
        amount: true,
    }, {
        field: 'glAmount',
        title: '账户管理费',
        amount: true,
    }, {
        field: 'xsAmount',
        title: '快速信审费',
        amount: true,
    }, {
        field: 'yhAmount',
        title: '优惠金额',
        // amount: true,
        formatter:moneyFormat
    }, {
        field: 'realGetAmount',
        title: '已打款金额',
        amount: true,
        // formatter:function(v,data){
        //   return  moneyFormat(data.amount-(data.lxAmount+data.fwAmount+data.glAmount+data.xsAmount)+data.yhAmount)
        //
        // },
        readonly:view,
    }, {
        field: 'yqlxAmount',
        title: '逾期金额',
        formatter: moneyFormat
    }, {
        field: 'realHkAmount',
        title: '已还款金额',
        formatter:moneyFormat
    }, {
        field: 'totalAmount',
        title: '剩余还款金额',
        amount: true
    }, {
        field: 'duration',
        title: '借款时长(天)',
    }, {
        field: 'yqDays',
        title: '逾期天数'
    }, {
        field: 'yqlxAmount',
        title: '逾期利息',
        // amount: true,
        formatter:moneyFormat
    }, {
        field: 'payType',
        title: '支付类型'
    }, {
        field: 'signDatetime',
        title: '签约时间',
        formatter: dateTimeFormat
    }, {
        field: 'fkDatetime',
        title: '放款时间',
        formatter: dateTimeFormat
    }, {
        field: 'hkDatetime',
        title: '约定还款时间',
        formatter: dateTimeFormat
    }, {
        field: 'jxDatetime',
        title: '计息时间',
        formatter: dateTimeFormat
    }, {
        field: 'realHkDatetime',
        title: '实际还款时间',
        formatter: dateTimeFormat
    }, {
        field: 'updateDatetime',
        title: '最后更新时间',
        formatter: dateTimeFormat
    }, {
        field: 'status',
        title: '状态',
        type: "select",
        key: "borrow_status",
        keyCode:"623907",
        formatter: Dict.getNameForList("borrow_status","623907")
    }, {
        field: 'remark',
        title: '备注',
    }];

    buildDetail({
        fields: fields,
        code: code,
        view:view,
        detailCode: '623086',
        addCode: '623000',
        editCode: '623001',
        beforeSubmit:function(data){
            data.updater = getUserName();
            return data;
        }
    });

});