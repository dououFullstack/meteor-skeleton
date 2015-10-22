Meteor.publish("users", function() {
  return Meteor.users.find({});
});
Meteor.publish("user", function(_id) {
  return Meteor.users.find({"_id": _id});
});