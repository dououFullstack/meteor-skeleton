Template.profileCard.helpers({
	isMe: function() {
		if (this._id === Meteor.userId()) {
			return true;
		} else {
			return false;
		}
		console.log("this :", this._id, Meteor.userId());
	}
});
