$(function () {
    var code = getQueryString('code');
    var userId = getQueryString('userId');

    var fields = [{
        title: "登录名",
        field: "loginName",
        readonly: true,
    }, {
        title: '手机号',
        field: 'mobile',
        readonly: true,
        // }, {
        //     field: 'userReferee',
        //     title: '推荐人',
        //     readonly: true,
        //     formatter: function(v, data) {
        //         if(data.referrer){
        //             userReferee = data.referrer.userId;
        //             var res1 = data.referrer.kind ;
        //             var res2 = data.referrer.mobile;
        //             var level = data.referrer.level ;
        //             if(res1 && res2){
        //                 if (res1 == 'f1') {
        //                     return Dict.getNameForList1("user_level","807706",level)+ '/' +res2
        //                 }else{
        //                     return userRefereeType[res1]+ '/' +res2
        //                 }
        //             }else{
        //                return "-"
        //             }
        //         }
        //     }
        // }
        }, {
            field: 'creditScore',
            title: '信用分',
            formatter: (v, data) => {
                return moneyFormat(v, '0');
            },
            readonly: true
        }, {
            title: "状态",
            field: "status",
            type: "select",
            key: "user_status",
            formatter: Dict.getNameForList("user_status"),
            readonly: true,
        }, {
            title: "注册时间",
            field: "createDatetime",
            formatter: dateTimeFormat,
            readonly: true,
        }];

    buildDetail({
        fields: fields,
        code: {
            userId: userId
        },
        detailCode: "805121",
      buttons: [{
        title: '返回',
        handler: function() {
          window.location.href = "./channelUser.html"
        }}],
        beforeSubmit: function (data) {
            data.userId = userId;

            return data;
        }
    });
});