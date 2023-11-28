var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

// You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

// Created a new variable called level and start at level 0.
var level = 0;


// Used jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function(){
    if (!started){
        //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
})


// Used jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function(){
    // Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
    playSound(userChosenColour);
    animatePress(userChosenColour)
    // Called checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);
})


// Created a function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel){
    // Created an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        // If the user got the most recent answer, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){
            // Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function(){
                nextSequence()
            }, 1000);
        }
    } else {
        // In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200);
        // Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
};


function nextSequence(){
    userClickedPattern = [];
    // Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
    level++
    // Inside nextSequence(), update the h1 with this change in the value of level.
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()* 4);
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)

    // Use jQuery to select the button with the same id as the randomChosenColour.
    $("#" + randomChosenColour).fadeIn(100).fadeOut(200).fadeIn(100);
    playSound(randomChosenColour)    
};


//2. Created a function called playSound() that takes a single input parameter called name.
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play()
}


// Created a function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColour){
    // Used jQuery to add this pressed class to the button that gets clicked inside animatePress().
    $("#" + currentColour).addClass("pressed");

    // Used Javascript to remove the pressed class after a 100 milliseconds.
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed")
    }, 100);
}


// Inside this function, you'll need to reset the values of level, gamePattern and started variables.
function startOver(){
    level=0
    gamePattern=[];
    started=false;
}