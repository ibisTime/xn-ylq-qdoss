$(function() {
    var code;
    reqApi({
        code: "623917",
        json: {
            ckey: "aboutUs",
            type:"1"
        },
        sync: true
    }).then(function(data) {
        code = data.id;
    });

    var fields = [{
        title: '关于我们',
        field: 'note',
        type: "textarea",
    }, {
        field: 'cvalue',
        value: "关于我们",
        type: 'hidden'
    }, {
        field: "id",
        value: code,
        hidden: true
    }];

    var options = {
        fields: fields,
        code: code,
        detailCode: '623916',
        buttons: [{
            title: "确定",
            handler: function() {
                if ($('#jsForm').valid()) {
                    var data = {};
                    data["cvalue"] = $("#cvalue").val();
                    data["note"] = $("#note").val();
                    data["id"] = $("#id").val();
                    reqApi({
                        code: "623911",
                        json: data
                    }).done(function() {
                        toastr.info("操作成功");
                    });
                }
            }
        }]
    };
    buildDetail(options);
});