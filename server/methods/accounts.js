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

  console.log('onCreateUser: user is ')
  console.log(user);
  user.profile = {};
  user.profile.nickname = user.username;
  user.profile.country = '中国';
  user.profile.headimgurl = 'http://imgs.flymaster.net/pngs/genericUser.png';
  return user;
});

Accounts.onLogin(function(user){

  // Add maodou and amdin to role admin
  if (user.user.username == "maodou")
  {
    Roles.addUsersToRoles(user.user._id, ['admin']);
  };

  if (user.user.username == "admin")
  {
    Roles.addUsersToRoles(user.user._id, ['admin']);
  };

  // Add all users that are not admin to unassigned
  if (!Roles.userIsInRole(user.user._id, ['admin'])) {
    Roles.addUsersToRoles(user.user._id, ['unassigned']);
  }

});

Accounts.registerLoginHandler(function(loginRequest) {
  //there are multiple login handlers in meteor.
  //a login request go through all these handlers to find it's login hander
  //so in our login handler, we only consider login requests which has admin field
  console.log('registerLoginHandler loginRequest is ');
  console.log(loginRequest);

  var openid = loginRequest.openid;
  console.log('registerLoginHandler openid is ', openid);

  if(!openid) {
    return undefined;
  }

  console.log('return undefined already');

  //we create a admin user if not exists, and get the userId
  var userId = null;
  var user = Meteor.users.findOne({openid: openid});

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