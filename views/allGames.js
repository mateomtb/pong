if (Meteor.isClient) {
  Template.allGames.helpers({
    games: function() {
      return Games.find({}, {sort: {game_num : -1}}).fetch();
    },
    gameTotal: function(){
      return Games.find().fetch().length;
    }
  });
}