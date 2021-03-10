numButons = document.querySelectorAll("button").length;

var instruments = {w:'tom-1',a: 'tom-2',s: 'tom-3',d: 'tom-4',j: 'snare',k: 'crash',l: 'kick-bass'};

document.addEventListener("keydown", function (e){
    var inputKey = e.key
    if (inputKey in instruments){
        var audio = new Audio('sounds/'+instruments[inputKey]+'.mp3');
        audio.play();
    }
})

for(var i=0; i<numButons; i++){
    document.querySelectorAll("button")[i].addEventListener("click", function (){
        var audio = new Audio('sounds/'+instruments[this.innerText]+'.mp3');
        audio.play();
    })}

