$(function() {
	$("#code").val('QDS201700000000000000');
	$("#name").val(decodeURI(getQueryString("name")));

	//下拉菜单
	$.when(reqApi({ // 所有菜单
		code: '805001',
		json: {
			kind: '1',
			companyCode: OSS.system
		}
	}), reqApi({ // 获得菜单
		code: '805026',
		json: {
			roleCode: $("#code").val()
		}
	},false,true)).then(function(d1, d2) {
		var checkedCodes = [];
		d2.forEach(function(item) {
			checkedCodes.push(item.code);
		});
		d1.forEach(function(item) {
			item.ischecked = checkedCodes.indexOf(item.code) > -1;
		});
		$("#treeMenu").ligerTree({
			nodeWidth:300,
			data:d1,
			checkbox: true,
			isExpand: true,
			idFieldName: 'code',
	        parentIDFieldName: 'parentCode',
	        textFieldName: 'name'
		});

	});




	$("#subBtn").click(function() {
		var menuList = new Array();
	    var menuData = $("#treeMenu").ligerGetTreeManager().getChecked();
		for (var i = 0; i < menuData.length; i++){
			menuList[i] = menuData[i]['data']['code'];
		}
    	var data = {roleCode:$("#code").val(),menuCodeList:menuList, updater: getUserName()};
		//doPostAjax(url, data, doSuccessBack);
		reqApi({
			code: '805027',
			json: data
		},false,true).done(function(data) {
			sucDetail();
		});
	});

	//返回
	$('#backBtn').click(function() {
		goBack();
	});
});

