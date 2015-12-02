Router.map(function() {
  // USERS SHOW
  // -------------------------------------------------------
  this.route('userShow', {
    template: 'userShow',
    path: '/users/:_id',
    waitOn: function () {
      return Meteor.subscribe('user', this.params._id, function() {
        console.log("subscribe over...");
      });
    },
    data: function () {
      return Meteor.users.findOne(this.params._id);
    }
  });
  // USERS INDEX
  // -------------------------------------------------------
  this.route('userIndex', {
    template: 'userIndex',
    path: '/users',
    waitOn: function () {
      return Meteor.subscribe('users');
    },
    data: {
      users: function(){
        return  Meteor.users.find({}, {sort: {createdAt: -1}});
      }
    }
  });

  // USERS EDIT
  // -------------------------------------------------------
  this.route('userProfileEdit', {
    template: 'userProfileEdit',
    path: '/users/:_id/edit',
    waitOn: function () {
      Meteor.subscribe('userprofile', this.params._id);
      return Meteor.subscribe('user', this.params._id);
    },
    data: function () {
      // return Documents.findOne(this.params._id);
      return UserProfiles.findOne();
    }
  });

  // USERS Info SHOW
  // -------------------------------------------------------
  this.route('userProfileShow', {
    template: 'userProfileShow',
    path: '/users/:_id/show',
    waitOn: function () {
      Meteor.subscribe('userprofile', this.params._id);
      return Meteor.subscribe('user', this.params._id);
    },
    data: function () {
      // return Documents.findOne(this.params._id);
      return UserProfiles.findOne();
    }
  });
});
