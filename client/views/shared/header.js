Template.header.helpers({
  navHas: function(item) {
    var navItems = [];
    navItems = Meteor.settings.public.navItems;
    console.log(navItems, item);
    if (navItems) {
      if (navItems.indexOf(item) >= 0) {
        return true;
      }
      return false;
    } else {
      return false;
    }
  }
});
