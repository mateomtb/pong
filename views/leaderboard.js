if (Meteor.isClient) {
  Template.leaderboard.helpers({
    leaders: function() {
      $('body').attr('class', 'leaderboard');
      return Meteor.users.find({}, {sort: {'profile.wins': -1}}).fetch();
    }
  });
}
