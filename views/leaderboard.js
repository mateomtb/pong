if (Meteor.isClient) {
  Template.leaderboard.helpers({
    leaders: function() {
      return Meteor.users.find({}, {sort: {'profile.wins': -1}}).fetch();
    }
  });
}