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

//Zabezpiecznie przed wyjeżdżaniem paletki poza canvas - na dole
    if (playerY >= ch - paddelHeight) {
        playerY = ch - paddelHeight
    }
//Zabezpiecznie przed wyjeżdżaniem paletki poza canvas - na górze
    if (playerY <= 0) {
        playerY = 0;
    }
   // aiY = playerY;
}
//Ruch paletką
canvas.addEventListener('mousemove', playerPosition)

//Przyśpieszanie piłki
function speedUp() {
    //po osi X
    if (ballSpeedX > 0 && ballSpeedX < 18) {
        ballSpeedX += 1;
    }
    else if (ballSpeedX < 0 && ballSpeedX > -16){ 
        ballSpeedX -= 1;
    }

    //po osi Y
    if (ballSpeedY > 0 && ballSpeedY < 16) {
        ballSpeedY += 1;
    }
    else if (ballSpeedY < 0 && ballSpeedY > -16){ 
        ballSpeedY -= 1;
    }

}

//AI

//Wariacja,korzystająca z dwóch elementów - pozycji piłki i położenia paletki wzgl.osi Y w canvas.
function aiPosition() {

    //Stała ze współrzędnymi środka rakietki.
    const middlePaddel = aiY + paddelHeight / 2;
    
    //Stała ze współrzędnymi środka piłki
    const middleBall = ballY + ballSize / 2;
    
    //instr.sprawdzająca czy piłka znajduje się po prawej połowie canvasu o wym.0-1000
    if (ballX > 500) {
        //Warunek I - odległość środka piłki od środka paletki
        if (middlePaddel - middleBall > 200) {
            aiY -= 24;//ruch paletki w stronę piłki - wartość prędkości poruszania
        }   
        else if (middlePaddel - middleBall > 50) {aiY -= 10;     }
        //To samo j/w ale w sytuacji gdy piłka jest poniżej paletki
        else if (middlePaddel - middleBall < -200){
            aiY +=24
        }
        else if (middlePaddel - middleBall < -50){
            aiY += 10;
        }
    }
    //Instrukcja gdy piłka jest >100 && >=500 od lewej krawędzi czyli lewej strony boiska
    if (ballX <= 500 && ballX > 100) {
        if (middlePaddel - middleBall >100){
            aiY -= 3;
        }
    if (middlePaddel - middleBall < -100) {
            aiY += 3;
        }    
    }
}


//Funkcja zbiorcza
function game() {

    table()
    ball()
    player()
    ai()
    aiPosition()
}
//Wywołanie funkcji zbiorczej z interwałem
setInterval(game, 1000 / 60)