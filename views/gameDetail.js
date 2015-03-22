if (Meteor.isClient) {
  Template.playerDetail.helpers({
    game: function () {
      return Meteor.users.find(Session.get('playerSelected')).fetch();
    }
  });
}