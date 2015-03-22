Players = new Mongo.Collection('players');
Games = new Mongo.Collection('games');


if (Meteor.isServer) {
//method for adding games and updating users
  Meteor.methods({
    addGame: function(data){
      Games.insert({
        p1_id : data.p1_id,
        p2_id : data.p2_id,
        p1_name : data.p1_name,
        p2_name : data.p2_name,
        p1_score : data.p1_score,
        p2_score : data.p2_score,
        winner_id : data.winner_id,
        winner_name: data.winner_name,
        loser_id: data.loser_id,
        loser_name: data.loser_name,
        game_num: data.game_num
      });

      if(data.p1_score>data.p2_score){
        Meteor.users.update({_id: data.p1_id}, {$inc: { 'profile.wins': 1}});
        Meteor.users.update({_id: data.p2_id}, {$inc: { 'profile.losses': 1}});
      } else if(data.p2_score>data.p1_score){
        Meteor.users.update({_id: data.p2_id}, {$inc: { 'profile.wins': 1}});
        Meteor.users.update({_id: data.p1_id}, {$inc: { 'profile.losses': 1}});
      }
    }
  });
}