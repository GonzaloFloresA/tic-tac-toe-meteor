Router.configure({
  layoutTemplate: 'Layout'
});

Router.map(function() {
  this.route('index', {
    path: '/',
    data: function() {
      return {
        openGames: Games.find({status: 'OPEN'}),
        endedGames: Games.find({status: 'FINISHED'})
      };
    }
  });
});

