if (Meteor.isClient) {
  Template.playerDetail.helpers({
    player: function () {
      return Meteor.users.find(Session.get('playerSelected')).fetch();
    }
  });
}