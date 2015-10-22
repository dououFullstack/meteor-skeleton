Template.profile.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('user', Meteor.userId());
  }.bind(this));
};

Template.profile.rendered = function () {

}