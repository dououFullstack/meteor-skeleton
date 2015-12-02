Accounts.onCreateUser(function(options, user) {

  // Ensure that option or user exists
  if (!options || !user) {
    console.log('error createing user');
    return;
  } else {
    // If option has a profile, then pass it to user.profile
    if (options.profile) {
      user.profile = options.profile;
    }
  }

  console.log('onCreateUser: user is ');
  console.log(user);
  user.profile = {};
  user.profile.nickname = user.username;
  user.profile.country = '中国';
  user.profile.headimgurl = 'http://7xojrr.com1.z0.glb.clouddn.com/genericUser.png';
  return user;
});

Accounts.onLogin(function(user){

  // Add maodou and amdin to role admin
  if (user.user.username == "李明")
  {
    Roles.addUsersToRoles(user.user._id, ['admin']);
  }

  if (user.user.username == "oG4r8wx2fMADUP3Xbmj4nf69HAjQ")
  {
    Roles.addUsersToRoles(user.user._id, ['admin']);
  }

  if (user.user.username == "obBdRwn4i7jgkvlkfak_x8tjpBBc")
  {
    Roles.addUsersToRoles(user.user._id, ['admin']);
  }

  if (user.user.username == "admin")
  {
    Roles.addUsersToRoles(user.user._id, ['admin']);
  }

  // Add all users that are not admin to unassigned
  if (!Roles.userIsInRole(user.user._id, ['admin'])) {
    Roles.addUsersToRoles(user.user._id, ['user']);
  }

});

Accounts.registerLoginHandler(function(loginRequest) {
  //there are multiple login handlers in meteor.
  //a login request go through all these handlers to find it's login hander
  //so in our login handler, we only consider login requests which has admin field
  console.log('registerLoginHandler loginRequest is ');
  console.log(loginRequest);

  var unionid = loginRequest.username;
  console.log('registerLoginHandler unionid is ', unionid);

  if(!unionid) {
    return undefined;
  }

  console.log('return undefined already');

  //we create a admin user if not exists, and get the userId
  var userId = null;
  var user = Meteor.users.findOne({username: unionid});

  console.log('user is ', user);
  if(!user) {
    console.log('loginRequest is ', loginRequest);
    userId = Meteor.users.insert(loginRequest);
    console.log('userId is ', userId);
  } else {
    userId = user._id;
  }

  //send loggedin user's user id
  return {
    userId: userId
  };
});

Meteor.methods({
  delUser: function(userId) {
    console.log('delUser on server side, user id is ', userId);
    Meteor.users.remove(userId);
    console.log("Deleted!");
  },
  setAsAdmin: function(userId) {
    console.log('setAsAdmin on server side, user id is ', userId);
    Roles.addUsersToRoles(userId, ['admin']);
  }
});
