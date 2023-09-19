'use strict';
let getRadom = () => Math.trunc(Math.random() * 20) + 1;
let secretNumber = getRadom();
let maxScore = -1;
let score = 20;
const elementTextContent = (cls, message) => {
    document.querySelector('.' + cls).textContent = message;
}
const guessInput = document.querySelector('.guess');
const checkButton = document.querySelector('.check');
const message = document.querySelector('.message');
let win = false;
guessInput.addEventListener('input', () => {
    const numGuessed = Number(guessInput.value);
    if (numGuessed < 1 || numGuessed > 20) {
        checkButton.disabled = 'true';
        checkButton.style.backgroundColor = 'grey';
        checkButton.style.cursor = 'no-drop';
    } else {
        checkButton.disabled = '';
        checkButton.style.backgroundColor = '#eee';
        checkButton.style.cursor = 'pointer';
    }
})

checkButton.addEventListener('click', () => {
    const numGuessed = Number(guessInput.value);
    console.log(numGuessed);
    if (!win && score > 0 && numGuessed) {
        if (numGuessed === secretNumber) {
            win = true;
            elementTextContent('message', 'Great ! You Win  🥳');
            elementTextContent('number', secretNumber);
            maxScore = Math.max(score, maxScore);
            elementTextContent('highscore', maxScore);
            document.querySelector('.number').style.width = '30rem';
            document.querySelector('body').style.backgroundColor = '#60b346';
            return;
        } else
            elementTextContent('message', numGuessed > secretNumber ? 'Too High ↗️' : 'Too Low ↘️');

        score--;
        elementTextContent('score', score);
        if (score == 0) {
            message.textContent = 'Oooops ! U Lose  😢';
            document.querySelector('body').style.backgroundColor = '#A30000';
        }
    }
})

document.querySelector('.again').addEventListener('click', () => {
    score = 20;
    win = false;
    secretNumber = getRadom();
    elementTextContent('message', 'Start guessing.. ');
    elementTextContent('score', score);
    elementTextContent('number', '?');
    guessInput.value = '';
    document.querySelector('.number').style.width = '15rem';
    document.querySelector('body').style.backgroundColor = '#222';
})