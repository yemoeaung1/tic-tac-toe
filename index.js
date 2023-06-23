let circleTurn;
const X_CLASS = 'x';
const O_CLASS = 'o';
const WIN_COMBINATIONS = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7],[2,5,8],
    [0,4,8], [2,4,6]
];

let gameBoard =Array(9).fill(null);
let playWithComputer = false;

const squares = document.getElementsByClassName('square');
const winningMessage = document.querySelector('[data-message]');
const winningMessageElement = document.getElementById('winMessage');
const restartButton = document.getElementById('restart');
const main_container = document.getElementById('main');
const computer = document.getElementById('computer');
const player = document.getElementById('local-player');

player.addEventListener('click', () => {
    playWithComputer = false;
    Game()
    });


computer.addEventListener('click', () => {
    playWithComputer = true;
    Game()
    });
restartButton.addEventListener('click', Game);


function Square() {
    const square = document.createElement('div');
    square.setAttribute('class', 'square');
    return square;
}

function setUpBoard() {
    for(let i = 0; i < 9; i++) {
        const square = Square();
        square.setAttribute('id', i);
        // square.classList.remove(X_CLASS);
        // square.classList.remove(O_CLASS);
        // square.removeEventListener('click', handleCellClick);
        square.addEventListener('click', handleCellClick, {once: true});
        main_container.appendChild(square);
    }
    return main_container;
}

function handleCellClick(e) {
    const selectedSquare = e.target;
    const currentClass = circleTurn ? O_CLASS : X_CLASS;
    gameBoard[selectedSquare.id] = currentClass;
    console.log(gameBoard);
    placeSymbol(selectedSquare, currentClass);
    if(checkforWinner(currentClass)) {
        endGame(false);
    } else if(checkForDraw()) {
        endGame(true);
    }
    changeTurns();
    if(playWithComputer){
        computerMove();
    }
}


function computerMove() {
    let bestScore = -Infinity;
    let i = 0;
    let freeSlots = totalFreeSlots(gameBoard);
    const currentClass = circleTurn ? O_CLASS : X_CLASS;
    console.log(freeSlots);
    while(isSquareTaken(squares[i])) {
        i = freeSlots[Math.floor(Math.random() * (freeSlots.length - 1))];
    }
    console.log(i);
    // console.log(squares[i]);
    gameBoard[i] = currentClass;
    console.log(gameBoard);
    placeSymbol(squares[i], currentClass);

    if(checkforWinner(currentClass)) {
        endGame(false);
    } else if(checkForDraw()) {
        endGame(true);
    }
    changeTurns();
}

function totalFreeSlots(arr) {
    let slots = []
    for (let i = 0; i < arr.length; i++) {
        if (!arr[i]) { 
          slots.push(i);
        }
    } 
    return slots;
}

function isSquareTaken(square) {
    return square.classList.contains(X_CLASS) || square.classList.contains(O_CLASS);
}

function endGame(draw) {
    if(draw) {
        winningMessage.innerText = "It's a tie";
    } else {
        winner = circleTurn ? O_CLASS : X_CLASS;
        winningMessage.innerText = winner + " wins";
    }
    winningMessageElement.classList.add('show');
}

function changeTurns() {
    circleTurn = !circleTurn;
}

function placeSymbol(square, currentClass) {
    square.classList.add(currentClass);
}

function checkforWinner(currentClass) {
    return WIN_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return squares[index].classList.contains(currentClass);
        });
    });
}

function checkForDraw() {
    return [...squares].every(square => {
        return square.classList.contains(X_CLASS) || 
        square.classList.contains(O_CLASS)
    });
    }


function resetBoard(){
    Array.from(squares).forEach(function(square) {
        square.remove();
        }
    );
    }

function Game() {
    gameBoard.fill(null);
    winningMessageElement.classList.remove('show');
    resetBoard();
    circleTurn = false;
    board = setUpBoard();
}

Game();
