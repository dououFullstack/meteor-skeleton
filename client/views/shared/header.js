Template.header.helpers({
  navHas: function(item) {
    var navItems = [];
    navItems = Meteor.settings.public.navItems;
    console.log(navItems, item);
    return navItems.some(i => i == item);
  }
});
