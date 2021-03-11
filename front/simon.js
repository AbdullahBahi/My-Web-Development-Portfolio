buttonColours = ["red", "blue", "green", "yellow"]
gamePattern = []
userClickedPattern = []
level = 0
function playSound(sound){
    var audio = new Audio('sounds/'+sound+'.mp3');
    audio.play();
}
function handleWrong(){
    userClickedPattern = []
    $('h1').text("Game Over, Press Any Key to Restart")
    setTimeout(function() { 
        $('body').css('background-color', '#011F3F')
    }, 100);
    $('body').css('background-color', 'red')
    playSound('wrong')
}
function nextSequence(){
    var randomNumber  = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    // apply animation to the next sequence
    $('.'+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    $('h1').text("Level "+(level+1))
    level++
}
$(document).keypress(function(){
    if (level==0){
        nextSequence()
    }  
})
$('.btn').click(function(){
    userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    // apply animation and sound  to the clicked button
    $('.'+userChosenColour).fadeOut(100).fadeIn(100);
    playSound(userChosenColour)
    if(gamePattern.length==0){
        level = 0;
        handleWrong();
    }else{
        for(i=0; i<level; i++){
            if(userClickedPattern[i] != gamePattern[i] && userClickedPattern[i]!=undefined){
                level = 0;
                gamePattern = [];
                handleWrong();
            }
        }
        if (userClickedPattern.length==gamePattern.length){
            if(level!=0){
                setTimeout(nextSequence, 1000);
                userClickedPattern = [];
            }
        }  
    }  
})

