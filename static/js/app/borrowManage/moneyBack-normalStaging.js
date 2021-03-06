$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');
    var repaymentSituationList = [];
    var stageData;

    var columns =  [{
        field: 'date',
        title: '日期'
    }, {
        field: 'amount',
        title: '还款金额',
        formatter: moneyFormat
    }, {
        field: 'remark',
        title: '备注'
    }]

    reqApi({
        code: "623177",
        json: {},
        sync: true
    }).then(function(data) {
        if (data.length >= 1) {
            stageData = data[0]
        }

        var fields = [ {
            field: 'code1',
            title: '借款编号',
            formatter:function(v,data){
                return data.code
            },
            readonly: true
        }, {
            field: 'mobile',
            title: '借款人',
            formatter:function(v,data){
                return data.user.mobile
            },
            readonly: true
        }, {
            field: 'borrowAmount',
            title: '借款金额',
            amount: true,
            readonly: true
        }, {
            field: 'duration',
            title: '借款时长(天)',
            readonly: true
        }, {
            field: 'loanType',
            title: '放款方式',
            formatter:Dict.getNameForList('loan_type','623907'),
            readonly: true
        }, {
            field: 'stageRuleCode',
            title: '分期期数',
            type: 'select',
            listCode: '623177',
            keyName: 'code',
            valueName: '{{count.DATA}}',
            // value: stageData ? stageData.code : '',
            required: true,
            onChange: (v, data) => {
                if (v) {
                    $("#rate").text(data.rate);
                    $("#cycle").text(data.cycle);

                    reqApi({
                        code: "623077",
                        json: {
                            stageRuleCode: v,
                            orderCode: code
                        },
                        sync: true
                    }).then(function(data) {
                        $('#repaymentSituationList').bootstrapTable('load', data);
                    });
                }
            }
        }, {
            field: 'rate',
            title: '分期日利率',
            value: stageData ? stageData.rate : '',
            readonly: true
        }, {
            field: 'cycle',
            title: '分期天数',
            value: stageData ? stageData.cycle : '',
            readonly: true
        }, {
            field: 'repaymentSituation',
            title: '分期计划',
            type: 'o2m',
            readonly: true,
            useData: repaymentSituationList,
            columns: columns
        }];

        buildDetail({
            fields: fields,
            code: code,
            view:view,
            detailCode: '623086',
            addCode: '623075',
            editCode: '623075',
            beforeSubmit:function(data){
                data.updater = getUserName();
                return data;
            }
        });
    });


});