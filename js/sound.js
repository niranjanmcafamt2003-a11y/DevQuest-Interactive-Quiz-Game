// =======================
// DEVQUEST SOUND SYSTEM
// =======================


// SOUND FILES

const correctSound = new Audio("sounds/correct.mp3");

const wrongSound = new Audio("sounds/wrong.mp3");

const clickSound = new Audio("sounds/click.mp3");

const winSound = new Audio("sounds/win.mp3");



// PLAY CORRECT SOUND

function playCorrect(){

correctSound.currentTime = 0;

correctSound.play();

}



// PLAY WRONG SOUND

function playWrong(){

wrongSound.currentTime = 0;

wrongSound.play();

}



// PLAY BUTTON CLICK SOUND

function playClick(){

clickSound.currentTime = 0;

clickSound.play();

}



// PLAY WIN SOUND

function playWin(){

winSound.currentTime = 0;

winSound.play();

}