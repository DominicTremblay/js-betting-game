// The player starts off with a bankroll of $100 
// bets money to guess a number randomly chosen by the game
// The game should ask the player to place a bet between $5 and $10, then to guess a number between 1 and 10

$(document).ready(function(){

  var randomNumber;

  player = {
    bankroll: 100,
    bet: 0,
    guessNb: 0
  }
  
  $('#btn_bet').on('click',function(){

    randomNumber = Math.floor((Math.random() * 10) + 1);

    if (getPlayerInput()) {

      if (enoughMoney())
        result();
      else
        endGame();
    }

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

    var bet = validateBet(Number($('#bet').val()));
    var guessNb = validateGuess(Number($('#guessNb').val()));
    
    if (bet !== false && guessNb !== false) {
      player.bet = bet;
      player.guessNb = guessNb;
      return true;
    }
    else 
      return false;
  }

  function validateBet(bet) {
    if (bet >= 5 && bet <=10)
      return bet;
    else {
      alert('Please place a bet between 5 and 10');
      $('#bet').val("");
      $('#bet').focus();
      return false;
    }
  }

  function validateGuess(guess) {
    if (guess >= 1 && guess <= 10)
      return guess;
    else {
      alert('Please enter a number between 1 and 10');
      $('#guessNb').val("");
      $('#guessNb').focus();
      return false;
    }
  }

  function enoughMoney() {
    if (player.bet > player.bankroll) {
      return false;
    }
    return true;
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

  function endGame(){
    alert("You don't have enough money to continue playing");
    $('#btn_reset').css('visibility','visible')
  }

  initialize(); 


});



