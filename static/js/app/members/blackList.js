$(function() {

    var columns = [{
            field: '',
            title: '',
            checkbox: true
        }, {
            title: '手机号',
            field: 'mobile'
        },{
            title: '姓名',
            field: 'realName'
        }
    ];
    buildList({
        columns: columns,
        pageCode: '805120',
        searchParams: {
            kind: 'C',
            isBlackList: '1'
        }
    });

    $('#removeBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info('请选择记录');
            return;
        }


        confirm('确定将该用户移出黑名单？').then(function() {
            reqApi({
                code: '805150',
                json: {
                    userId: selRecords[0].userId,
                    updater: getUserName()
                }
            }).then(function() {
                sucList();
            });

        },function(){});

    });




});