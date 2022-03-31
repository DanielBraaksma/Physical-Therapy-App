import {exercises} from "./index.js" //need to import data to handle the startTimer call

let countdown;
let paused = false;
let secondsLeft;
let currentExercise;
const pauseBtn = document.getElementById("pause-timer");
const timerDisplay = document.querySelector('.display__time-left');
const alarm = new Audio ('https://www.pacdv.com/sounds/domestic_sound_effects/alarm_clock_2.wav');

console.log(paused)

function timer(seconds) {
    // clear the timer if it is running
    clearInterval(countdown);

    const now = Date.now();
    // if(paused) seconds =
    const then = now + seconds * 1000;

    displayTimeLeft(seconds);


    countdown = setInterval(() => {
        secondsLeft = Math.round((then - Date.now()) / 1000);

        // check if we should stop it!
        if (secondsLeft < 0) {
            clearInterval(countdown);
            pauseBtn.disabled = true;
            // mark the element checkbox as complete
            document.querySelectorAll(".complete")[currentExercise].checked = true
            //call an alarm function here
            alarm.play()
            return;
        }
        // display it
        displayTimeLeft(secondsLeft);
    }, 1000);
}


function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}

//use the index we got from the order of the exercise to grab the time value from exercises array =)//
function startTimer(i) {
    const seconds = parseInt((exercises[i].time) * 60);
    currentExercise = i;
    // pauseBtn.style.display = "block"
    pauseBtn.disabled = false;
    document.getElementById("stop-timer").disabled = false;
    timer(seconds)
}

function stopTimer (){
    clearInterval(countdown)
    alarm.pause()
    timerDisplay.textContent = "00:00"
    disableStopwatchBtns()
    window.location.href = "#your-exercises"
}

// Use the boolean paused to determine whether to clear/reset the interval.
function pauseTimer (currentTime){
    if (!paused){
    clearInterval(countdown)
    pauseBtn.style.backgroundColor = "green";
    pauseBtn.textContent = "Resume"
    console.log("hi!")
    paused = true;
    }

    else {
        timer(secondsLeft)
        pauseBtn.style.backgroundColor = "yellow";
        pauseBtn.textContent = "Pause"
        paused = false;
    }
}

function disableStopwatchBtns (){
    pauseBtn.disabled = true;
    document.getElementById("stop-timer").disabled = true;
}

export {timer, displayTimeLeft, startTimer, stopTimer, pauseTimer, disableStopwatchBtns, currentExercise}
