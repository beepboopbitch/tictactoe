function GameManager() {
  this.player1Active  = true;
  this.spaces = [];
  this.players = [];
}

function Player(name) {
  this.name = name;
  this.spaces = [];
  this.victories = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]]
}

GameManager.prototype.addPlayer = function(player) {
  console.log(player)
  this.players.push(player)
}

GameManager.prototype.createSpaces = function() {
  for(var i = 1; i <= 9; i++) {
    var space = new Space(i)
    this.spaces.push(space);
  }
}

GameManager.prototype.markSpace = function(id) {
  var currentSpace = this.findSpace(id);
  if(currentSpace.isMarked === false) {
    if (this.player1Active === true) {
      currentSpace.markX();
      $("#" + id + " .mark").text("X");
      this.players[0].spaces.push(id);
      this.players[0].checkVictory();
    } else {
      currentSpace.markO();
      $("#" + id + " .mark").text("O");
      this.players[1].spaces.push(id);
      this.players[1].checkVictory();
    }
    this.player1Active = !this.player1Active;
    currentSpace.isMarked = true;
  }
}

Player.prototype.checkVictory = function() {
  for(var i = 0; i < this.victories.length; i++) {
    var victory = 0;
    var vLength = this.victories[i].length

    for(var y = 0; y < 3; y++) {
      if (this.spaces.includes(this.victories[i][y])){
        victory++;
      }
    }
    if(victory === 3) {
      console.log("victory");
      $(".game-container").hide();
      $("h1").show();
      $("h1").text("Congrats!!! " + this.name + " You win!");
    }
  }
}

GameManager.prototype.findSpace = function(id) {
  for (var i = 0; i < this.spaces.length; i++) {
    console.log(this.spaces[i].id)
    if(id === this.spaces[i].id) {
      return this.spaces[i];
    }
  }
}


function Space(id) {
  this.id = id;
  this.mark = "";
  this.isMarked = false;
}

Space.prototype.markO = function() {
  this.mark = "O"
}

Space.prototype.markX = function() {
  this.mark = "X"
}

function startGame(){
  var newGame = new GameManager();
  var newPlayer1 = new Player("Player1");
  var newPlayer2 = new Player("Player2");
  newGame.addPlayer(newPlayer1);
  newGame.addPlayer(newPlayer2);
  newGame.createSpaces();
  var gameBoard = "";
  newGame.spaces.forEach(function(space) {
    gameBoard += " <div class='outer col-md-4'><div class='space' id='" + space.id + "'><span class ='mark'></span></div></div>";
  });
  $(".game-container").html(gameBoard);
  return newGame
};



$(function(){
  var newGame = startGame();
  $(".game-container").on("click", ".space", function(){
    newGame.markSpace(parseInt($(this).attr("id")));
  });
  $(".btn").click(function(){
    $("h1").hide();
    newGame = startGame();
    $(".game-container").show();
  });

});
