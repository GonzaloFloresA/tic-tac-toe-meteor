Router.map(function() {
  this.route('CreateGame', {
    path: '/games/create'
  });
  this.route('Board', {
    path: '/games/board/:id',
    data: function() {
      return Games.findOne({_id: this.params.id});
    }
  });
});