Template.wechatLogin.helpers({
	getAppId: function() {
		return Meteor.settings.public.AppId;
	},
	getCallBackUrl: function() {
		return window.location.hostname;
	}
});