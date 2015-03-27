if (Meteor.isClient) {
  Template.home.helpers({
    game: function() {
      $('body').attr('class', 'home');
      lastGame = Games.find().fetch().length;
      return Games.findOne({'game_num' : lastGame});

    }
  });
}

