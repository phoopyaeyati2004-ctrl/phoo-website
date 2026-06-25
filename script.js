const welcomeScreen = document.getElementById('welcome-screen');
const gameScreen = document.getElementById('game-screen');
const letterScreen = document.getElementById('letter-screen');

const startBtn = document.getElementById('start-btn');
const continueBtn = document.getElementById('continue-btn');
const openLetterBtn = document.getElementById('open-letter-btn');

const letterModal = document.getElementById('letter-modal');
const closeModal = document.getElementById('close-modal');
startBtn.addEventListener('click', () => {
    welcomeScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    setupGame();
});

const emojis = ['💖', '💖', '⭐', '⭐', '🎈', '🎈', '🎁', '🎁', '🧸', '🧸', '🍰', '🍰'];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;

function setupGame() {
    const cardGrid = document.getElementById('card-grid');
    const shuffledEmojis = emojis.sort(() => 0.5 - Math.random());
    
    cardGrid.innerHTML = '';
    shuffledEmojis.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.emoji = emoji;
        card.innerText = '❓'; 
        card.addEventListener('click', flipCard);
        cardGrid.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length === 2 || this.classList.contains('flipped')) return;

    this.classList.add('flipped');
    this.innerText = this.dataset.emoji;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        moves++;
        document.getElementById('moves-count').innerText = moves;
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.emoji === card2.dataset.emoji) {
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === emojis.length / 2) {
            document.getElementById('game-success').classList.remove('hidden');
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card1.innerText = '❓';
            card2.classList.remove('flipped');
            card2.innerText = '❓';
            flippedCards = [];
        }, 800);
    }
}
continueBtn.addEventListener('click', () => {
    gameScreen.classList.add('hidden');
    letterScreen.classList.remove('hidden');
});
let revealedCount = 0;
const totalReasons = 6;

function revealReason(element) {
    const reasonText = element.querySelector('.reason-text');
    if (reasonText.classList.contains('hidden')) {
        reasonText.classList.remove('hidden');
        revealedCount++;
        if (revealedCount === totalReasons) {
            openLetterBtn.classList.remove('hidden');
        }
    }
}
openLetterBtn.addEventListener('click', () => {
    letterModal.classList.remove('hidden');
});

closeModal.addEventListener('click', () => {
    letterModal.classList.add('hidden');
});