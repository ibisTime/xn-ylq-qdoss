$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: "mobile",
        title: "手机号"
    }, {
        field: "userid",
        title: "所属渠道商",
        search: true
    },{
        field: "url",
        title: "链接",
        search: true
    },{
        title: "注册时间",
        field: "createDatetime",
        type: "select",
        formatter: dateTimeFormat
    }];

    buildDetail({
        fields: fields,
        code: code,
        view: view,
        detailCode: "623156"
    });
    options.buttons = [
        {
            title: '返回',
            handler: function() {
                goBack();
            }
        }];
});
