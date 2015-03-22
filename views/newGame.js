if (Meteor.isClient) {
  Template.newGame.helpers({
    user: function () {
      return Meteor.user();
    },
    users: function(){
      return Meteor.users.find().fetch();
    },
    opponent : function(){
      return Meteor.users.find(Session.get('opponentUser')).fetch();
    }
  });

  Template.newGame.events({
    'submit form#new_game': function () {

      var opponent = Meteor.users.find(Session.get('opponentUser')).fetch();
      var data = {};

      data.p1_id = Meteor.user()._id;
      data.p1_name = Meteor.user().profile.name;
      data.p1_score = $('#p1_score').val();

      data.p2_id = Session.get('opponentUser');
      data.p2_name = opponent[0].profile.name;
      data.p2_score = $('#p2_score').val();


      if(data.p1_score > data.p2_score){
        data.winner_id = data.p1_id;
        data.winner_name = data.p2_name;
        data.loser_id = data.p2_id;
        data.loser_name = data.p2_name;
      } else {
        data.winner_id = data.p2_id;
        data.winner_name = data.p2_name;
        data.loser_id = data.p1_id;
        data.loser_name = data.p1_name;
      }

      data.game_num = Games.find().fetch().length + 1;

      Meteor.call('addGame', data, function(error, affectedDocs) {
        if (error) {
          console.log(error.message);
        } else {
          console.log('opp stats added');
        }
      });
    },

    'click #opponentSelectTrigger' : function() {
      $("#opponentSelector").toggleClass("active");
    },

    'click .opponentUser' : function() {
      console.log($(this)[0]._id);
      $("#opponentSelector").toggleClass("active");
      Session.set('opponentUser', $(this)[0]._id);
    }
  });
}
