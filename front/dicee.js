
// get random image source using a generated random number
function getRandomImg(){
    // generate random number
    var randomNumber  = Math.floor(Math.random() * 6)+1;
    imgSrc = "images/dice"+randomNumber+".png"
    return imgSrc
}

function updateImgs(){
img1 = document.querySelector(".img1")
rand1 = getRandomImg()
img1.src = rand1
img2 = document.querySelector(".img2")
rand2 = getRandomImg()
img2.src = rand2
return [rand1, rand2]
}

function updateTitle(rand1, rand2){
    title = document.querySelector("h1")
    if (rand1 > rand2){
        title.innerText = "player 1 wins!"}
    else if (rand2 > rand1){
        title.innerText = "player 2 wins!"
    }
    else{
        title.innerText = "draw"
    }
    
}


rands = updateImgs()
updateTitle(rands[0], rands[1])