let timer; // To store the interval of the stopwatch
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapCounter = 0;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startPauseButton = document.getElementById('startPause');
const lapResetButton = document.getElementById('lapReset');
const lapTimesList = document.getElementById('lapTimes');

function formatTime(ms) {
    let minutes = Math.floor(ms / 60000);
    let seconds = Math.floor((ms % 60000) / 1000);
    let milliseconds = ms % 1000;
    
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    millisecondsDisplay.textContent = milliseconds.toString().padStart(3, '0');
}

function startPause() {
    if (isRunning) {
        clearInterval(timer);
        startPauseButton.textContent = 'Resume';
        lapResetButton.textContent = 'Reset';
        isRunning = false;
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(function() {
            elapsedTime = Date.now() - startTime;
            formatTime(elapsedTime);
        }, 10);
        startPauseButton.textContent = 'Pause';
        lapResetButton.textContent = 'Lap';
        isRunning = true;
    }
}

function lapReset() {
    if (isRunning) {
        lapCounter++;
        const lapTime = document.createElement('li');
        lapTime.textContent = `Lap ${lapCounter}: ${minutesDisplay.textContent}:${secondsDisplay.textContent}.${millisecondsDisplay.textContent}`;
        lapTimesList.appendChild(lapTime);
    } else {
        clearInterval(timer);
        startPauseButton.textContent = 'Start';
        lapResetButton.textContent = 'Lap';
        isRunning = false;
        elapsedTime = 0;
        formatTime(elapsedTime);
        lapCounter = 0;
        lapTimesList.innerHTML = '';
    }
}

startPauseButton.addEventListener('click', startPause);
lapResetButton.addEventListener('click', lapReset);
