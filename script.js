let scores, currentScore, activePlayer, playing;

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.getElementById('dice');
const btnRoll = document.getElementById('roll');
const btnHold = document.getElementById('hold');
const btnNewGame = document.getElementById('newGame');

const init = () => {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = '0';
    score1El.textContent = '0';
    current0El.textContent = '0';
    current1El.textContent = '0';
    diceEl.style.display = 'none';

    document.querySelector(`.player--0`).classList.remove('winner');
    document.querySelector(`.player--1`).classList.remove('winner');
    document.querySelector(`.player--0`).classList.add('active');
    document.querySelector(`.player--1`).classList.remove('active');
};

const switchPlayer = () => {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector(`.player--0`).classList.toggle('active');
    document.querySelector(`.player--1`).classList.toggle('active');
};

btnRoll.addEventListener('click', () => {
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;

        diceEl.style.display = 'block';
        diceEl.src = `dice-${dice}.png`;

        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', () => {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 100) {
            playing = false;
            diceEl.style.display = 'none';
            document.querySelector(`.player--${activePlayer}`).classList.add('winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('active');
        } else {
            switchPlayer();
        }
    }
});

btnNewGame.addEventListener('click', init);

init();
