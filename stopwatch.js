import {exercises} from "./index.js" //need to import data to handle the startTimer call

let countdown;
let paused = false;
let secondsLeft;
let currentExercise;
const timerDisplay = document.querySelector('.display__time-left');

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
            console.log(this)
            // mark the element checkbox as complete
            document.querySelectorAll(".complete")[currentExercise].checked = true
            //call an alarm function here
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
    timer(seconds)
}


// resetBtns.forEach(button => button.addEventListener('click', startTimer));
// document.customForm.addEventListener('submit', function (e) {
//     e.preventDefault();
//     const mins = this.minutes.value;
//     console.log(mins);
//     timer(mins * 60);
//     this.reset();
// });

function stopTimer (){
    timer(0)
}

// Use the boolean paused to determine whether to clear/reset the interval.
function pauseTimer (currentTime){
    if (!paused){
    clearInterval(countdown)
    console.log("hi!")
    paused = true;
    }

    else {
        timer(secondsLeft)
        paused = false;
    }

}

export {timer, displayTimeLeft, startTimer, stopTimer, pauseTimer}
