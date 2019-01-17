$(function() {

    var code = getQueryString('code');
    var userId = getQueryString('userId');
    var view = getQueryString('v');
    var isStage = getQueryString('isStage');
    var borrowCount,overdueCode,renewalCount;

    var columns =  [{
      field: 'approveDatetime',
      title: '还款时间',
      formatter: dateTimeFormat
    }, {
      field: 'amount',
      title: '还款金额',
      formatter: moneyFormat
    }, {
      field: 'type',
      title: '还款方式',
      type: "select",
      key: "repay_apply_type",
      keyCode:"623907",
      formatter: Dict.getNameForList("repay_apply_type","623907")
    }, {
      field: 'remark',
      title: '备注'
    }];

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
            borrowCount = data.borrowCount;
            overdueCode = data.user.overdueCode;
            renewalCount = data.user.renewalCount;
            return data.user.mobile
        },
        afterSet:function(data){
            var html='<div class="tools" style="float: right;margin-left: 20px;">'+
                '<div>'+
                '<span style="float: left;margin-left: 20px;">借款次数:'+ borrowCount+' </span>'+
                // '<span style="float: left;margin-left: 20px;">逾期代码: '+ overdueCode +' </span>'+
                // '<span style="float: left;margin-left: 20px;">续期次数: '+  renewalCount +' </span>'+
                '</div>'+
                '<ul class="toolbar"  style="float: left;">'+
                '<li style="display:block;" id="reportBtn"><span><img src="/static/images/t01.png"></span>查看资信报告</li>'+
                '</ul>'+
                '</div>';
            $('#mobile').append(html);
            $('#reportBtn').click(function() {

                window.open("../report.html?userId=" + userId);
                // window.location.href = "../oansBefore/audit_report.html?userId=" + userId;
            });
        }
    }, {
        field: 'loanType',
        title: '放款方式',
        formatter:Dict.getNameForList('loan_type','623907')
    }, {
        field: 'duration',
        title: '借款时长(天)',
    }, {
        field: 'borrowAmount',
        title: '借款金额',
        amount: true,
    }, {
        field: 'lxAmount',
        title: '正常利息',
        amount: true,
    },
    //   {
    //     field: 'yqlxAmount',
    //     title: '逾期利息',
    //     amount: true,
    // },
      {
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
    // }, {
    //     field: 'renewalCount',
    //     title: '订单续期(次)'
    }, {
        field: 'yqlxAmount',
        title: '逾期金额',
        formatter: moneyFormat
    }, {
        field: 'realHkAmount',
        title: '已还款金额',
        amount: true
      }, {
        field: 'totalAmount',
        title: '剩余还款金额',
        amount: true
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
        field: 'yqDays',
        title: '逾期天数',
    }, {
        field: 'jxDatetime',
        title: '计息时间',
        formatter: dateTimeFormat
    }
    // , {
    //     field: 'realHkDatetime',
    //     title: '实际还款时间',
    //     formatter: dateTimeFormat
    // }
    , {
        field: 'stageBatch',
        title: '分期次数'
      }, {
        field: 'stageCount',
        title: '分期期数',
        hidden: isStage === '0'
    }, {
        field: 'stageCycle',
        title: '分期天数',
        hidden: isStage === '0'
    }, {
        field: 'repayList',
        title: '还款明细记录列表',
        type: 'o2m',
        columns: columns,
        useData: function(v,d) {
          if(!v) {
            return [];
          }
          return v.filter((x) => x.status);
        },
        readonly: true
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