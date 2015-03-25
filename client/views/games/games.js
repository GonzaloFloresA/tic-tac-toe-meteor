Template.GamesList.events({
  'click #enterGame': function(event, template) {
    var userId = Meteor.userId();
    if (userId) {
      if(userId === this.player01) {
        //TODO: Change for bootstrap message component.
        alert('Oops! You should not join your own game.');  
      } else {
        Games.update({_id: this._id}, {$set: {status: 'STARTED', player02: userId}});
        Router.go('Board', {id: this._id});
      }
    } else {
      alert('Login to access the game');
    }
  }
});