$(function () {

    var userId = getQueryString('userId') || '';
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: "mobile",
        title: "手机号"
    }, {
        field: "wayName",
        title: "推荐链接名"
    }, {
        field: 'regDatetime',
        title: '创建时间',
        formatter: dateTimeFormat
    }, {
        field1: 'dateStart',
        title1: '创建时间',
        type: 'date',
        field2: 'dateEnd',
        twoDate: true,
        search: true,
        visible: false
    }];
    buildList({
        columns: columns,
        searchParams :{
            userId: getUserId(),
        },
        pageCode: '623208'
    });
    // // 详情
    // $('#detail').off("click").click(function() {
    //     var selRecords = $('#tableList').bootstrapTable('getSelections');
    //     if (selRecords.length <= 0) {
    //         toastr.info("请选择记录");
    //         return;
    //     }
    //
    //     window.location.href = "./myuser_addedit.html?userId=" + selRecords[0].data.userId+"&code="+selRecords[0].code+"&v=1";
    // });1
    // $('#deleteBtn').off("click").click(function () {
    //     var selRecords = $('#tableList').bootstrapTable('getSelections');
    //     if (selRecords.length <= 0) {
    //         toastr.info("请选择记录");
    //         return;
    //     }
    //
    //     var msg = selRecords[0].status === '0' ? '确定注销该渠道？' : '确定激活该渠道？';
    //     confirm(msg).then(function () {
    //         reqApi({
    //             code: '623253',
    //             json: {
    //                 code: selRecords[0].code
    //             }
    //         }).then(function () {
    //             sucList();
    //         });
    //
    //     }, function () {
    //     });
    //
    // });
    //

});
