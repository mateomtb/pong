if (Meteor.isClient) {
  Template.allPlayers.helpers({
    players: function () {
      return Meteor.users.find().fetch();
    }
  });
}