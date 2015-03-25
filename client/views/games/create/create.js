Template.CreateGame.events({
  'submit': function(event, template) {
    event.preventDefault();
    var newGame = { 
      name: $('#gameName').val(),
      owner: Meteor.userId(),
      player01: Meteor.userId(),
      player02: null,
      status: 'OPEN',
      turn: Meteor.userId(),
      board: generateTiles(3, 3),
    };
    Games.insert(newGame, function(error, id){
      if(error){
        console.log(error);
      }
      Router.go('Board', {id: id});
    });
  }
});


function generateTiles(x, y) {
  var tiles = [];
  var counter = 1;
  for (var xIndex = 0; xIndex < x; xIndex++) {   
    for (var yIndex = 0; yIndex < y; yIndex++) {
      var tile = {
        status: 'EMPTY',
        owner: null,
        x: xIndex,
        y: yIndex,
        index: counter
      };
 
      tiles.push(tile);
      counter++;
    };
  };

  return tiles;
}