var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = -1;

function nextSequence() {

    $("#level-title").text("Level-" + (++level));
    var min = 1;
    var max = 3;
    var ran = Math.floor(Math.random() * (max - min + 1) + min);


    var randomColor = buttonColors[ran];
    gamePattern.push(randomColor);

    $("#" + randomColor).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}


$(".btn").click(function () {
    var btnName = $(this).attr("id");

    userClickedPattern.push(btnName);
    playSound(btnName);
    if(userClickedPattern.length===gamePattern.length)
    {
    if(arrayEquals(userClickedPattern,gamePattern))
    {
        userClickedPattern=[];
        nextSequence();
    }
    else
    {
        playSound("wrong");
        $(document.body).addClass("game-over");
        setTimeout(function () {
            $(document.body).removeClass("game-over");
          }, 200);
          level=-1;
          gamePattern=[];
          userClickedPattern=[];
          $("#level-title").text("press any key to restart the game");

    }
  }
    
})

const playSound = (name) => {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

$(document).keypress(function () {
    if (level == -1)
        nextSequence();

})

function arrayEquals(a, b) {
    return  a.every((val, index) => val === b[index]);
}

