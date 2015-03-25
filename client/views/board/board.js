

Template.Board.helpers({
  'arePlayerDefined': function(){
    /*console.log(thisplayer01);
    console.log(player02);
    console.log(player01 && player02);*/
    return this.player01 && this.player02;
  },
  'isNewRow': function() {
    return (this.index%3 === 0);
  },
  'isMyTurn': function() {
    return (this.turn === Meteor.userId());
  },
  'getWinner': function() {
    if(this.winner === 'DRAW') {
      return 'No one won, It is a draw!';
    }
    if(this.winner === Meteor.userId()) {
      return 'You won ';
    }

    return  'You lost';
  },
  'getDraw': function() {
    if(this.status === 'EMPTY') {
      return '-';
    }

    if(this.owner === Template.parentData().player01) {
      return 'O';
    }
    if(this.owner === Template.parentData().player02) {
      return 'X';
    }
  }
});

Template.Board.events({
  'click .tile': function(event) {
    var parentData = Template.parentData();
    var board = parentData.board;

    Meteor.call('updateMove', parentData._id, event.target.id, function(error) {
      if(error) {
        console.log(error);
      }
    });
  }
});

