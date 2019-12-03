class AudioController {
    constructor() {
        this.backgroundMusic = new Audio('Assets/Audio/technological.mp3');
        this.flipSound = new Audio('Assets/Audio/flip.wav');
        this.matchSound = new Audio('Assets/Audio/score.wav');
        this.victorySound = new Audio('Assets/Audio/score.wav');
        this.backgroundMusic.volume = 0.3;
        this.flipSound.volume = 0.5;
        this.backgroundMusic.loop = true;
    }
    startMusic() {
        this.backgroundMusic.play();
    }
    stopMusic() {
        this.backgroundMusic.pause();
        this.backgroundMusic.currentTime = 0;
    }
    flip() {
        this.flipSound.play();
    }
    match() {
        this.match.play();
    }
    victory() {
        this.stopMusic();
        this.victorySound.play();
    }
}

class mixOrMatch {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.ticker = document.getElementById('flips');
        this.audioController = new AudioController();
    }
    startGame() {
        this.cardToCheck = null;
        this.totalClicks = 0;
        this.matchedCards = [];
        this.busy = true;
    }
    flipCard(card) {
            if (this.canFlipCard(card)) {
                this.audioController.flip();
                this.totalClicks++;
                this.ticker.innerText = this.totalClicks;
                card.classList.add('visible');
            }
        }
        /*if the card is already flipped (matched)
        an animation is happening
        if the card that's flipped is already card to chech it shouldn't be clicked*/
    canFlipCard(card) {
        return true;
        // return (!this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck);
    }

}

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new mixOrMatch(100, cards);
    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        });
    });
    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard();
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}