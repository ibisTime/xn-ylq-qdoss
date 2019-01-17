$(function () {
    var userId=window.sessionStorage.getItem("userId");
    console.log(userId);
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: "name",
        title: "链接名称",
      search: true
    },
    {
        field: "userCount",
        title: "注册总数",
    },{
        field: 'productUrl',
        title: '产品链接'
    },{
        field: "productPointCount",
        title: "链接点击数"
    }, {
            field: 'regUrl',
            title: '注册链接'
        },
        {
        field: "regPointCount",
        title: "链接点击数"
    },{
          title: "注册时间",
          field: "createDatetime",
          formatter: dateTimeFormat
        },
        {
        field: "remark",
        title: "备注",
            formatter:function(v,data){
                return data.wayer.remark ? data.wayer.remark : ''

            }
    }];
    buildList({
        columns: columns,
        searchParams :{
            userId:getUserId(),
        },
        pageCode: '623155'
    });
    // // 详情
    // $('#detail').off("click").click(function() {
    //     var selRecords = $('#tableList').bootstrapTable('getSelections');
    //     if (selRecords.length <= 0) {
    //         toastr.info("请选择记录");
    //         return;
    //     }
    //
    //     window.location.href = "./myurl_addedit.html?userId=" + selRecords[0].data.userId+"&code="+selRecords[0].code+"&v=1"+'&isStage='+selRecords[0].isStage;
    // });
    // $('#delete').off("click").click(function () {
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


});
