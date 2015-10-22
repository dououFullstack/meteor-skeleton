Template.header.helpers({
  navHas: function(item) {
    var navItems = [];
    navItems = Meteor.settings.public.navItems;
    console.log(navItems, item);
    if (navItems)
      return false;
      // return navItems.some(i => i == item);
    else
      return false;
  }
});
