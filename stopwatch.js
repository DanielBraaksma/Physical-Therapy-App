import {exercises} from "./index.js" //need to import data to handle the startTimer call

let countdown;
const timerDisplay = document.querySelector('.display__time-left');
// const resetBtns = document.querySelectorAll(".reset-timer")

// function log (){
//     console.log(timerDisplay)
// }

// export {log}


function timer(seconds) {
    // clear the timer if it is running
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;

    displayTimeLeft(seconds);


    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        // check if we should stop it!
        if (secondsLeft < 0) {
            clearInterval(countdown);
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
    const seconds = parseInt(exercises[i].time);

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

export {timer, displayTimeLeft, startTimer}
