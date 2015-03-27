Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound'
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
  name: 'newGame',
  onBeforeAction: function (pause) {
    if (!Meteor.user()) {
      // render the login template but keep the url in the browser the same
      this.render('notFound'); //switch this to 404 or Not logged in screen
    } else {
      this.render('newGame');
    }
  }
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

//Leaderbard
Router.route('/leaderboard/', {
  name: 'leaderboard'
});

//Root route
Router.route('/', {
  name: 'home'
});
