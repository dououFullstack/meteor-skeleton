
Router.route('/profile', {
  // onBeforeAction: function() {
  //   if (!Meteor.userId()) {
  //     Router.go('signIn');
  //   } else {
  //    this.next();
  //   }
  // },
  action: function() {
    //this.render('homePage');
    this.render('profile');
    // /users
  },

  waitOn: function() {
    return Meteor.subscribe('user', Meteor.userId());
  },
  data: function() {
      return {
        user: Meteor.user(),
      };
  },
  name: 'profile'
});
