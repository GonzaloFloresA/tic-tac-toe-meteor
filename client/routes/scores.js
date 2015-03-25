Router.map(function() {
  this.route('Scores', {
    path: '/scores',
    data: function() {
      return {
        scores: Scores.find()
      };
    }
  });
});