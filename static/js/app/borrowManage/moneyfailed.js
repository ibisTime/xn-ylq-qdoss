$(function () {
    var data1 = {};

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '借款编号',
        search: true
    }, {
        field: 'applyUser',
        title: '申请人',
        type: getIsFk() ? 'select' : 'hidden',
        search: true,
        pageCode: '805120',
        keyName: 'userId',
        valueName: '{{realName.DATA}}',
        params: {
            updater: '',
            kind: 'C'
        },
        formatter: function(v,data){
            return data.user.realName
        }
    },{
        field: 'mobile',
        title: '手机号',
        type: 'select',
        search: true,
        pageCode: '805120',
        keyName: 'userId',
        valueName: 'mobile',
        params: {
            updater: '',
            kind: 'C'
        },
        formatter: function(v, data){
            return data.user.mobile;
        }
    // },  {
    //     field: 'overdueCode',
    //     title: '代码',
    //     formatter: function (v, data) {
    //         return data.user.overdueCode
    //     }
    },  {
        field: 'borrowAmount',
        title: '借款金额',
        amount: true,
    }, {
        field: 'lxAmount',
        title: '综合费用',
        formatter:function(v,data){
          return  moneyFormat(data.lxAmount+data.fwAmount+data.glAmount+data.xsAmount)

        }
    },{
        field: 'yhAmount',
        title: '优惠金额',
        amount: true,
    }, {
        field: 'Amount',
        title: '实际应打款金额',
        formatter:function(v,data){
          return  moneyFormat(data.amount-(data.lxAmount+data.fwAmount+data.glAmount+data.xsAmount)+data.yhAmount)

        }
    }, {
        field: 'realName',
        title: '户名',
        formatter:function(v,data){
            if(data.bankcard){
              return data.bankcard.realName
            }
        }
    }, {
        field: 'bankName',
        title: '签约银行',
        formatter:function(v,data){
            if(data.bankcard){
              return data.bankcard.bankName
            }
        }
    }, {
        field: 'cardNo',
        title: '签约银行卡号',
        formatter:function(v,data){
            if(data.bankcard){
              return data.bankcard.bankcardNumber
            }
        }
    }, {
        field: 'signDatetime',
        title: '签约时间',
        formatter: dateTimeFormat
    },{
        field: 'updater',
        title: '最后一次更新人'
    },  {
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

    buildList({
        columns: columns,
        searchParams:{
            status: 7,
            isArchive: 0
        },
        pageCode: '623085',
        beforeSearch: function (data) {
            if(data['mobile']) {
                data['applyUser'] = data['mobile'];
                delete data['mobile'];
            }
            return data;
        }
    });

    $('#checkBtn').off('click').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        var data = { code: selRecords[0].code, result: 1, updater: getUserName(),remark:"放款成功" };
        confirm("确认放款？").then(function() {
            reqApi({
                code: '623071',
                json: data
            }).then(function() {
                sucList();
            });
        },function(){});

    });

    $('#failedBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        var dw = dialog({
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">放款失败</li></ul>' +
                '</form>'
        });

        dw.showModal();

        buildDetail({
            fields: [{
                field: 'remark',
                title: '备注',
                required: true,
                maxlength: 250
            }],
            container: $('#formContainer'),
            buttons: [ {
                title: '不通过',
                handler: function() {
                    var data = [];
                    data.code = selRecords[0].code;
                    data.result = "0";
                    data.updater = getUserName();
                    data.remark = $("#remark").val();
                    reqApi({
                        code: '623071',
                        json: data
                    }).done(function(data) {
                        sucList();
                        setTimeout(function() {
                            dw.close().remove();
                        }, 500)
                    });
                }
            }, {
                title: '取消',
                handler: function() {
                    dw.close().remove();
                }
            }]
        });

        dw.__center();

        $('#formContainer').find('li:last-child').css({'text-align':'center','margin-left':'40px;'})

    });

    $('#detailBtn').off("click").click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }



        window.location.href = "./moneyfailed_addedit.html?userId=" + selRecords[0].user.userId+"&code="+selRecords[0].code+"&v=1";
    });

    $('#reportBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        window.open("../report.html?userId=" + selRecords[0].user.userId);
        // window.location.href = "../oansBefore/audit_report.html?userId=" + selRecords[0].user.userId;

    });
});
