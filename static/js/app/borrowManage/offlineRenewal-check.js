$(function() {

    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [ {
        field: 'code1',
        title: '还款编号',
        readonly: view,
        formatter:function(v,data){
            return data.code;
        }
    }, {
        field: 'borrowCode',
        title: '借款编号',
        readonly: view,
        formatter:function(v,data){
             return data.renewal.borrowCode
        }
    }, {
        field: 'loanType',
        title: '放款方式',
        formatter: function(v,data){
            return data.borrow ? Dict.getNameForList1('loan_type', '', data.borrow.loanType) : '';
        },
        readonly: view
    }, {
        field: 'type',
        title: '还款类型',
        key: "repay_apply_type",
        keyCode:"623907",
        formatter: Dict.getNameForList("repay_apply_type","623907"),
        readonly: view
    }, {
        field: 'amount',
        title: '还款金额',
        amount: true,
        readonly: view
    }, {
        field: 'applyUser',
        title: '还款人',
        readonly: view,
        formatter:function(v,data){
            return data.user.mobile;
        }
    },{
        field: 'applyDatetime',
        title: '还款时间',
        formatter: dateTimeFormat,
        readonly: view
    },{
    //     field: 'startDate',
    //     title: '续期开始时间',
    //     readonly: view,
    //     formatter:function(v,data){
    //         if(data.renewal){
    //             return dateTimeFormat(data.renewal.startDate);
    //         }
    //     }
    // },{
    //     field: 'endDate',
    //     title: '续期结束时间',
    //     formatter: dateTimeFormat,
    //     readonly: view,
    //     formatter:function(v,data){
    //         if(data.renewal){
    //             return dateTimeFormat(data.renewal.endDate);
    //         }
    //     }
    }, {
        field: 'applyNote',
        title: '还款说明',
        readonly: view
    }, {
        field: 'status',
        title: '状态',
        type: "select",
        key: "repay_apply_status",
        keyCode:"623907",
        formatter: Dict.getNameForList("repay_apply_status","623907"),
        readonly: view
    }, {
        field: 'approveNote',
        title: '审核说明',
        required: true
    }];


    var options = {
        fields: fields,
        code:code,
        detailCode: '623089',
    };

    options.buttons = [{
        title: '通过',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = {};
                data['code'] = code;
                data['approver'] = getUserName();
                data["approveResult"] = "1";
                data["approveNote"] = $("#approveNote").val();
                reqApi({
                    code: "623076",
                    json: data
                }).done(function() {
                    sucDetail();
                });
            }
        }
    }, {
        title: '不通过',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = {};
                data['code'] = code;
                data['approver'] = getUserName();
                data["approveResult"] = "0";
                data["approveNote"] = $("#approveNote").val();
                reqApi({
                    code: "623076",
                    json: data
                }).done(function() {
                    sucDetail();
                });
            }
        }
    }, {
        title: '返回',
        handler: function() {
            goBack();
        }
    }];

    buildDetail(options);

});