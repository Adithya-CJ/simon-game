var buttoncolors = ["red", "blue", "green", "yellow"];

var gamepattern = [];

userClickedPattern = [];

var started = false;

var level = 0;

$(".btn").on("click", function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
   
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

$(document).on("keydown", function(){
    if(!started){
        $("#level-title").text("Level "+level);
        return nextsequence();
        started = true ;
    }

});

function checkAnswer(currentLevel){
    if(gamepattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamepattern.length){
            setTimeout(function(){
                nextsequence();
            },1000);
        }
    }
    else{
        $("body").addClass("game-over");
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("h1").text("Game Over, Press Any Key to Restart");
        startover();
        setTimeout(function(){
            $("body").removeClass("game-over");
        },250);
    }
}

function nextsequence() {
    
    userClickedPattern=[];

    level++;

    $("#level-title").text("Level "+level);
    
    var randomnum = Math.floor(Math.random() * 4);
    var randomChosenColour = buttoncolors[randomnum];
    gamepattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();

    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");
    setTimeout(function () { 
    $("#" + currentColour).removeClass("pressed"); 
    }, 100);
}

function startover(){
    level=0;
    gamepattern=[];
    started=false;
}