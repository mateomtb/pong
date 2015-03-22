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