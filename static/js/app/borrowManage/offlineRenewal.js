$(function () {
    var data1 = {};

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '还款编号',
    }, {
        field: 'borrowCode',
        title: '借款编号',
        formatter:function(v,data){
             return data.renewal.borrowCode
        }
    }, {
        field: 'loanType',
        title: '放款方式',
        formatter: function(v,data){
            return data.borrow ? Dict.getNameForList1('loan_type', '', data.borrow.loanType) : '';
        }
    }, {
        field: 'type',
        title: '还款类型',
        key: "repay_apply_type",
        keyCode:"623907",
        formatter: Dict.getNameForList("repay_apply_type","623907"),
    }, {
        field: 'amount',
        title: '还款金额',
        amount: true,
    }, {
        field: 'applyUser',
        title: '还款人',
        type: "select",
        formatter:function(v,data){
            data1[v] = data.user.mobile;
            $('#applyUser').renderDropdown2(data1);
             return data.user.mobile
        } ,
        search: true
    },{
        field: 'applyDatetime',
        title: '还款时间',
        formatter: dateTimeFormat,
    }, {
        field: 'applyNote',
        title: '还款说明',
    }, {
        field: 'status',
        title: '状态',
        type: "select",
        key: "repay_apply_status",
        keyCode:"623907",
        formatter: Dict.getNameForList("repay_apply_status","623907"),
        search: true
    }];

    buildList({
        columns: columns,
        searchParams:{
            type: 1
        },
        pageCode: '623088'
    });

    $('#checkBtn').off('click').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        if (selRecords[0].status !== "0") {
            toastr.info("该记录不是待审核状态");
            return;
        }

        window.location.href = "./offlineRenewal_check.html?Code=" + selRecords[0].code+"&v=1";
    });




});