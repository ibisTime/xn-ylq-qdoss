$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: "name",
        title: "名称"
    }, {
        field: "name",
        title: "所属渠道商",
        search: true
    },{
        field: "url",
        title: "链接",
        search: true
    }, {
        field: "userCount",
        title: "注册总数"
    }, {
        field: "pointCount",
        title: "链接点击数"
    }, {
        title: "注册时间",
        field: "createDatetime",
        type: "select",
        formatter: dateTimeFormat
    },{
        field: "remark",
        title: "备注"
    }];

    buildDetail({
        fields: fields,
        code: code,
        view: view,
        detailCode: "623206"
    });
    options.buttons = [
       {
        title: '返回',
        handler: function() {
            goBack();
        }
    }];
});
