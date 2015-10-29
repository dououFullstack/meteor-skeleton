Template.camera.helpers({

});

Template.camera.events({
  'click #camera': function() {
    wx.config({
			debug: true,
			appId: 'wx35fc3ff5c073eb9b',
			timestamp: 7200,
			nonceStr: 'nmgwddj',
			signature: '74d88b4ddaacbe22a4c143c2c4aa279e832674fd',
			jsApiList: ['chooseImage','getLocation','getNetworkType','scanQRCode','hideOptionMenu']
		});
    wx.ready(function() {
			wx.checkJsApi({
				jsApiList: ['getNetworkType','chooseImage','getLocation','scanQRCode','hideOptionMenu'],
				success: function(res) {
					alert('checkJSAPI');
					wx.hideOptionMenu();

					// wx.getNetworkType({
					// 	success: function (res) {
					// 		//alert(res);
					// 		var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
					// 		alert("getNetworkType: " + networkType);
					// 	}
					// });
          //
					// wx.scanQRCode({
					// 	needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
					// 	scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
					// 	success: function (res) {
					// 		alert(res);
					// 		var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
					// 	}
					// });
          //
					// wx.chooseImage({
					// 	success: function (res) {
					// 		alert(res);
					// 		var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
					// 	}
					// });
				}
			});
		});
  }
});
