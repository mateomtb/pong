if (Meteor.isClient) {
  Template.header.helpers({
    userIsLoggedIn: function() {
      if(Meteor.user()){
        return true;
      }else {
        return false;
      }
    }
  });
}