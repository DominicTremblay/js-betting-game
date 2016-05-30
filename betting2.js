// The player starts off with a bankroll of $100 
// bets money to guess a number randomly chosen by the game
// The game should ask the player to place a bet between $5 and $10, then to guess a number between 1 and 10

$(document).ready(function(){

  var randomNumber;

  game = {
    bankroll: 100,
    bet: 0,
    guessNb: 0
    enoughMoney: function() {
      if (player.bet > player.bankroll) {
        alert("You don't have enough money to continue playing");
        $('#btn_reset').css('visibility','visible')
        return false;
      }
      return true;
    }
  }
  
  $('#btn_bet').on('click',function(){

    randomNumber = Math.floor((Math.random() * 10) + 1);

    getPlayerInput();

    if (enoughMoney())
      result();

    $('#bankroll').text("Bankroll: " + player.bankroll + "\$"); 

  });

  $('#btn_reset').on('click', initialize);

  function initialize(){

    player.bankroll = 100;
    player.bet = 0;
    player.guessNb = 0;
    $('#info').text("Game on!")
    $('#bnkSlider').val(player.bankroll);
    $('#bet').val("");
    $('#guessNb').val("");
    $('#bankroll').text("Bankroll: " + player.bankroll + "\$");
  }

  function getPlayerInput(){

    player.bet = Number($('#bet').val());
    player.guessNb = Number($('#guessNb').val());

  }



  function result(){

    if (player.guessNb === randomNumber) {
      $('#info').text("You're on!");
      player.bankroll += player.bet;
      $('#bnkSlider').val(player.bankroll);
    }
    else if (player.guessNb >= randomNumber - 1 && player.guessNb <= randomNumber + 1 ) {
      $('#info').text("You are off by 1");
    }
    else {
      $('#info').text("You're out of luck!")
      player.bankroll -= player.bet;
      $('#bnkSlider').val(player.bankroll); 
    }

  }

  initialize(); 


});


