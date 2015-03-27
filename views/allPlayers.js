if (Meteor.isClient) {
  Template.allPlayers.helpers({
    players: function () {
      $('body').attr('class', 'players');
      return Meteor.users.find().fetch();
    }
  });
}
