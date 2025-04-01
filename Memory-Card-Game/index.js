const gameBoard = document.getElementById('game-board');
const scoreElement = document.getElementById('score');
const movesElement = document.getElementById('moves');
const timerElement = document.getElementById('timer');
const resetButton = document.getElementById('reset-button');

const cards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const deck = [...cards, ...cards];
let flippedCards = [];
let score = 0;
let moves = 0;
let timer;
let seconds = 0;

function shuffleDeck(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCard(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="front-face">${value}</div>
        <div class="back-face"></div>
    `;
    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);
        moves++;
        movesElement.textContent = moves;

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const value1 = card1.querySelector('.front-face').textContent;
    const value2 = card2.querySelector('.front-face').textContent;

    if (value1 === value2) {
        card1.removeEventListener('click', flipCard);
        card2.removeEventListener('click', flipCard);
        score++;
        scoreElement.textContent = score;
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }

    flippedCards = [];
}

function updateTimer() {
    seconds++;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timerElement.textContent = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function initGame() {
    gameBoard.innerHTML = '';
    const shuffledDeck = shuffleDeck(deck);
    shuffledDeck.forEach(card => {
        gameBoard.appendChild(createCard(card));
    });
    score = 0;
    moves = 0;
    seconds = 0;
    scoreElement.textContent = score;
    movesElement.textContent = moves;
    timerElement.textContent = '0:00';
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

function resetGame() {
    initGame();
}

resetButton.addEventListener('click', resetGame);

initGame();
