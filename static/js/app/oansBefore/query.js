$(function() {
    var userKind = {
        'C': 'C端用户',
        // 'P': '平台用户'
    };
    var data1 = {},data2 = {};


    var columns = [{
        field: '',
        title: '',
        checkbox: true
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
    // }, {
    //     field: 'overdueCode',
    //     title: '代码',
    //     formatter: function (v, data) {
    //         return data.user.overdueCode
    //     }
    }, {
      field: 'applyDatetime',
      title: '申请时间',
      formatter:dateTimeFormat
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        formatter: function(v,data){
          return '待批复';
        }
    },{
        field: 'remark',
        title: '备注'
    }];
    buildList({
        router: 'members',
        columns: columns,
        pageCode: '623030',
        searchParams: {
            statusList: [2]
        },
        beforeSearch: function (data) {
          if(data['mobile']) {
            data['applyUser'] = data['mobile'];
            delete data['mobile'];
          }
            return data;
        }
    });

    $('#reportBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info('请选择记录');
            return;
        }

        window.open("../report.html?userId=" + selRecords[0].user.userId);
        // window.location.href = 'audit_report.html?userId=' + selRecords[0].user.userId;

    });

    $('#checkBtn').off('click').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info('请选择记录');
            return;
        }

        window.location.href = './query_check.html?userId=' + selRecords[0].user.userId+'&code='+selRecords[0].code+'&v=1';
    });

    $('#detailBtn').off('click').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info('请选择记录');
            return;
        }

        window.location.href = './query_addedit.html?userId=' + selRecords[0].user.userId+'&code='+selRecords[0].code+'&v=1';
    });

});