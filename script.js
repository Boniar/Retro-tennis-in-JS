//Pobranie obiektu Canvas z dokumentu i przypisanie go do zmiennej canvas
const canvas =document.querySelector('canvas');
//Wykonanie metody na canvas,pozwalającej na min.rysowanie,zmianę właściwości i  przypisanie do nowej zmiennej "ctx"
const ctx = canvas.getContext('2d')
//Zmiana parametrów canvas i przypisanie do zmiennnych,skracanie kodu.
canvas.width = 1000;
canvas.height = 500;

const cw = canvas.width;
const ch = canvas.height;

const ballSize = 20;//Piłka - wielkość
let ballX = cw/2 - ballSize/2;//wartość początkowa piłki na osi X
let ballY = ch/2 - ballSize/2;//wartość początkowa piłki na osi Y

//Wartości dla paletek
const paddelHeight = 100;
const paddelWidth = 20;
const playerX = 70;//gracza na osi X
const aiX = 910;//AI na osi X
let playerY = 200;//gracza na osi Y
let aiY = 200;//AI na osi Y

//Wartości dla linii na środku stołu
const lineWidth = 6;
const lineHeight = 16;

//Piłka - prędkość początkowa
let ballSpeedX = 3;
let ballSpeedY = 3;

function player() {
    ctx.fillStyle = 'green'; ctx.fillRect(playerX,playerY,paddelWidth,paddelHeight);
}

function ai() {
    ctx.fillStyle = 'yellow'; ctx.fillRect(aiX,aiY,paddelWidth,paddelHeight);
}

function ball() {
    ctx.fillStyle = '#ffffff'; ctx.fillRect(ballX,ballY,ballSize,ballSize);

    ballX += ballSpeedX;
    ballY += ballSpeedY;
    //odbicie piłki po dotarciu do końca osi przy ujęciu wielkości piłki
    if (ballY <= 0 || ballY + ballSize >= ch) {
        ballSpeedY = -ballSpeedY;
        speedUp();
    }
    
    if (ballX <= 0 || ballX + ballSize >= cw) {
        ballSpeedX = -ballSpeedX;
        speedUp();
    }
}

function table() {
    //Stół - ogólne
    ctx.fillStyle = '#000000'; //kolor rysowania
    ctx.fillRect(0, 0, cw, ch); //metoda rysowania w Canvas (x start,y start,długość x(zmienna),wys y(zmienna))

    //Linia na środku stołu - rysowanie w pętli for
    for (let linePosition = 20; linePosition < ch;linePosition +=30) {
        ctx.fillStyle = 'gray'
        ctx.fillRect(cw/2 -lineWidth/2, linePosition,lineWidth,lineHeight)
    }
}
//Przypisanie położenia paletki do położenia myszki 
topCanvas = canvas.offsetTop;
console.log(topCanvas)

function playerPosition(event){
    playerY = event.clientY - topCanvas - paddelHeight / 2;

//Zabezpiecznie przed wyjeżdżaniem paletki poza canvas
    if (playerY >= ch - paddelHeight) {
        playerY = ch - paddelHeight
    }

    if (playerY <= 0) {
        playerY = 0;
    }
    aiY = playerY;
}
//Ruch paletką
canvas.addEventListener('mousemove', playerPosition)

//Przyśpieszanie piłki
function speedUp() {
    //po osi X
    if (ballSpeedX > 0 && ballSpeedX < 155) {
        ballSpeedX += 1;
    }
    else if (ballSpeedX < 0 && ballSpeedX > -16){ 
        ballSpeedX -= 1;
    }

    //po osi Y
    if (ballSpeedY > 0 && ballSpeedY < 155) {
        ballSpeedY += 1;
    }
    else if (ballSpeedY < 0 && ballSpeedY > -16){ 
        ballSpeedY -= 1;
    }

}


//Funkcja zbiorcza
function game() {

    table()
    ball()
    player()
    ai()
}
//Wywołanie funkcji zbiorczej z interwałem
setInterval(game, 25)