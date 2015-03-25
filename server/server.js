Meteor.methods({
  updateMove: function(gameId, index) {
    var game = Games.findOne({
      _id: gameId
    });
    var userId = this.userId;

    if (game.turn !== userId) {
      return;
    }
    game.turn = userId === game.player01? game.player02 : game.player01;

    if (game.board[index - 1].status === 'CHANGED') {
      return;
    }

    game.board[index - 1].status = 'CHANGED';
    game.board[index - 1].owner = userId;
    

    var board = game.board;
    var isPlayerWon = false;
    if ((board[0].owner === userId && board[1].owner === userId && board[2].owner === userId) ||
      (board[3].owner === userId && board[4].owner === userId && board[5].owner === userId) ||
      (board[6].owner === userId && board[7].owner === userId && board[8].owner === userId) ||
      (board[0].owner === userId && board[3].owner === userId && board[6].owner === userId) ||
      (board[1].owner === userId && board[4].owner === userId && board[7].owner === userId) ||
      (board[2].owner === userId && board[5].owner === userId && board[8].owner === userId) ||
      (board[0].owner === userId && board[4].owner === userId && board[8].owner === userId) ||
      (board[2].owner === userId && board[4].owner === userId && board[6].owner === userId)) {
      game.status = "FINISHED";
      game.winner = userId;
      updateScores(game);
    } else {
      var ownedTiles = 0;
      for (var i = 0; i < board.length; i++) {
        if(board[i].owner) {
          ownedTiles++;
        }
      };
      if(ownedTiles === board.length){
        game.status = "FINISHED";
        game.winner = "DRAW";
        updateScores(game);
      }
    }

    Games.update({
      _id: gameId
    }, game);
  }
});

function updateScores(game) {
  var player01 = Meteor.users.findOne({_id: game.player01});
  var player02 = Meteor.users.findOne({_id: game.player02});
  var score01 = Scores.findOne({email: player01.emails[0].address});
  var score02 = Scores.findOne({email: player02.emails[0].address});

  if(game.winner === 'DRAW') {
    Scores.update({_id: score01._id}, {$inc:{draws: 1}});
    Scores.update({_id: score02._id}, {$inc:{draws: 1}});
  }
  if(game.winner === player01._id) {
    Scores.update({_id: score01._id}, {$inc:{wins: 1}});
    Scores.update({_id: score02._id}, {$inc:{lost: 1}});
  }
  if(game.winner === player02._id) {
    Scores.update({_id: score01._id}, {$inc:{lost: 1}});
    Scores.update({_id: score02._id}, {$inc:{wins: 1}});
  }
}

Accounts.onCreateUser(function (options, user) {
  Scores.insert({
    email: user.emails[0].address,
    draws: 0,
    wins: 0,
    lost: 0
  });
  
  return user;  
});