AutoForm.addHooks(['userForm'], {
  after: {
    insert: function(error, result) {
      if (error) {
        console.log("Insert Error:", error);
      } else {
        console.log("Document inserted:", result);
        console.log(this);
        Router.go('userInfoShow');
      }
    },
    update: function(error) {
      if (error) {
        console.log("Update Error:", error);
      } else {
        console.log("Document updated");
        console.log(this);
        var info = UserProfiles.findOne(this.docId);
        console.log('info ', info);
        Router.go('/users/' + info.userId + '/show');
      }
    }
  }
});