Template.header.helpers({
  navHas: function(item) {
    var navItems = [];
    navItems = Meteor.settings.public.navItems;
    console.log(navItems, item);
    if (navItems) {
      var idx;
      for (idx = 0; idx < navItems.length; idx++) {
        if (navItems[idx] == item) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  }
});
