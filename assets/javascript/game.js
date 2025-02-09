/*
========================================
Crystal Game - INSTRUCTIONS
========================================
*/

/*
========================================
GLOBAL VARIABLES 
========================================
*/

var magicNumber = 0;        // Target number
var wins = 0;               // Number of wins
var losses = 0;             // Number of losses
var gameOver = false;       // Toggles visibility of elements
var counter = 0;            // Adds each crystal's value 

/*
========================================
MEDIA
========================================
*/
const soundClick = new Audio("./assets/sound_effects/crystal_click.mp3");
const buttonClick = new Audio("./assets/sound_effects/button_click.mp3");
const soundLost = new Audio("./assets/sound_effects/lost_game.mp3");
const soundWon = new Audio("./assets/sound_effects/won_game.mp3");

$(document).ready(function(){
/*
========================================
START GAME - FROM INTRO PAGE 
========================================
*/
  $("#activeGame").hide();                  // Hides active game while instructions are shown
  
  $("#playButton").on('click', function() { 
    buttonClick.play();  
    $("#instructions").hide();          // Hides instructions section when the play button is clicked 
    $('#restart').hide();               // Hides the restart button 
    $("#activeGame").show();            // Shows the active game elements 
    generateRandom();                          // Calls the generateRandom function to begin the game 
    $('#wins').text('WINS: ' + wins);          // Adds 'Wins: ' to HTML Doc 
    $('#losses').text('LOSSES: ' + losses);    // Adds 'losses: ' to HTML Doc 
    $('#myModal').modal('hide');               // Toggles modal 
  });

  /*
  ========================================
  RESET GAME
  ========================================
  */
  $("#restart").on('click', function() { 
    buttonClick.play();   
    $('#restart').hide();                     // Hides instructions section when the play button is clicked 
    counter = 0;                              // Sets the counter back to '0'
    $('#userTotal').text(counter);            // Updates HTML doc with the reset counter value
    magicNumber = 0;                          // Sets the magicNumber back to '0'
    $('#number-to-guess').text(magicNumber);  // Updates the HTML doc with the reset magicNumber value
    generateRandom();                         // Calls the generateRandom function to begin the game 
    $('#wins').text('WINS: ' + wins);         // Adds 'Wins: ' to HTML Doc 
    $('#losses').text('LOSSES: ' + losses);   // Adds 'losses: ' to HTML Doc 
    $('#myModal').modal('hide');             // Toggles modal 
    $('.container2').show();
  });

  /*
  ========================================
  Generates Random Number
  ========================================
  */
 function getMagicNumber(min, max) {
   
    magicNumber = Math.floor(Math.random() * (120 - 19 + 1) ) + 19;   // Calculates random magicMumber
    console.log(magicNumber);
}                          
function generateRandom(){
     
  getMagicNumber();
  $('#number-to-guess').text(magicNumber);           // Enters random magicMumber into HTML Doc
  $('#userTotal').html('<p>' + counter + '</p>');
  gameOver = false;     
  var randCrystalNumber = [];                         // Declares randomCrystalNumber Array 
  var totalCrystals = 4;                              // Sets the total array length to 4

    for (var i = 0; i < totalCrystals; i++) {           // For loop - 4 iterations 
      do {                                              
        var numberOptions = Math.floor(Math.random() * 12) + 1;           // Create random numbers ranging from 1 - 12 until there are 4 unique values 
      } while (existingNumber());
      $('#userTotal').attr("data-crystalvalue", randCrystalNumber[i]);   
        randCrystalNumber.push(numberOptions);                           // Pushes the random number to the array 
        console.log(randCrystalNumber)
    }

  function existingNumber() {                              // If the current random number already exists in the tracker, return true
    for (var i = 0; i < randCrystalNumber.length; i++) {
      if (randCrystalNumber[i] === numberOptions) {
        return true;
      }
    }
        return false;
  }
  console.log(randCrystalNumber.length);

  for (var i = 0; i < randCrystalNumber.length; i++) {                 // Each iteration will have its own unique value
    $("#crystal_1").attr("data-crystalvalue", randCrystalNumber[0]);  
    $("#crystal_2").attr("data-crystalvalue", randCrystalNumber[1]);
    $("#crystal_3").attr("data-crystalvalue", randCrystalNumber[2]);
    $("#crystal_4").attr("data-crystalvalue", randCrystalNumber[3]);
  }
    
  $(".crystal").on("click", function() {
  soundClick.play();

  var crystalValue = ($(this).attr("data-crystalvalue"));           // Adds the crystalValue to the user's "counter"
  crystalValue = parseInt(crystalValue);
  counter += crystalValue;                                          // Every click, from every crystal adds to the global counter.
  $('#userTotal').html('<p>' + counter + '</p>');
  $('#instructions2').hide();
  
  /*
  ========================================
  CHECK SCORES 
  ========================================
  */  

  // records losses
  if (counter === magicNumber) {           
    wins++;                               // Increments wins 
    soundWon.play();                          
    $('#wins').text('WINS: ' + wins);
    $('#restart').show();                 // Shows the restart button 
    $('.crystal').off('click');           // Disables click function of crystals until New game is run 
    gameOver = true;
    $('#myModal').modal('show');          // Toggles modal 
    $('.wonGame').show();
    $('.lostGame').hide();
    $('.container2').hide();
  }

  // records wins
    else if (counter >= magicNumber) {
      losses++;                                // Increments losses
      soundLost.play();  
      $('#losses').text('LOSSES: ' + losses);
      $('#restart').show();                   // Shows the restart button 
      $('.crystal').off('click');            // Disables click function of crystals until New game is run 
      gameOver = true;
      $('#myModal').modal('show');          // Toggles modal 
      $('.lostGame').show();
      $('.wonGame').hide();
      $('.container2').hide();
    }
  });
  }
}); 
