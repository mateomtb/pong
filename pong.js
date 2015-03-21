Players = new Mongo.Collection('players');
Games = new Mongo.Collection('games');

Router.configure({
  layoutTemplate: 'layout'
});

//Games Detail
Router.route('/games/:_id', {
  name: 'gameDetail',
  waitOn: function(){
    return Games.find(this.params._id).fetch();
  }
});

//Player Detail
Router.route('/players/:_id', {
  name: 'playerDetail',
  waitOn: function(){
    Session.set('playerSelected', this.params._id);
  }
});

//New game 
Router.route('/new-game/', {
  name: 'newGame'
});

//Players 
Router.route('/players/', {
  name: 'allPlayers',
  waitOn: function(){
    return Players.find().fetch();
  }
});

//Games 
Router.route('/games/', {
  name: 'allGames',
  data: function(){
    return Games.find().fetch();
  }
});

//Root route
Router.route('/', {
  name: 'leaderboard'
});



if (Meteor.isClient) {

  Template.leaderboard.helpers({
    leaders: function() {
      return Meteor.users.find({}, {sort: {'profile.wins': -1}}).fetch();
    }
  });


  Template.allGames.helpers({
    games: function() {
      return Games.find().fetch();
    },
    gameTotal: function(){
      return Games.find().fetch().length;
    }
  });

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


  Template.allPlayers.helpers({
    players: function () {
      return Meteor.users.find().fetch();
    }
  });


  Template.playerDetail.helpers({
    player: function () {
      return Meteor.users.find(Session.get('playerSelected')).fetch();
    }
  });


  Template.header.helpers({
    userIsLoggedIn: function() {
      if(Meteor.user()){
        return true;
      }else {
        return false;
      }
    }
  });
}

if (Meteor.isServer) {

  // Add wins and loss to profile?
  //  Accounts.onCreateUser(function(options, user) {
  //   user.permission = 'default';
  //   if (options.profile)
  //     user.profile = options.profile;
  //   return user;
  // });

  Accounts.onCreateUser(function(options, user) {
    // We still want the default hook's 'profile' behavior.
    options.profile['wins'] = 0;
    options.profile['losses'] = 0;
    if (options.profile)
      user.profile = options.profile;
    return user;
  });

  //method for adding games and updating users
  Meteor.methods({
    addGame: function(data){
      Games.insert({
        p1_id : data.p1_id,
        p2_id : data.p2_id,
        p1_name : data.p1_name,
        p2_name : data.p2_name,
        p1_score : data.p1_score,
        p2_score : data.p2_score
      });

      //this kills the user!?

      if(data.p1_score>data.p2_score){
        Meteor.users.update({_id: data.p1_id}, {$inc: { 'profile.wins': 1}});
        Meteor.users.update({_id: data.p2_id}, {$inc: { 'profile.losses': 1}});
      } else {
        Meteor.users.update({_id: data.p2_id}, {$inc: { 'profile.wins': 1}});
        Meteor.users.update({_id: data.p1_id}, {$inc: { 'profile.losses': 1}});
      }
    }
  });

  Meteor.startup(function () {
    // code to run on server at startup
  });
}
