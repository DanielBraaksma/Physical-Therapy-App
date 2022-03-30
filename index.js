


import { timer, displayTimeLeft, startTimer, stopTimer, pauseTimer, disableStopwatchBtns, currentExercise } from './stopwatch.js'
import './api.js'

/*********Materialize JS************/

M.AutoInit();


document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
    console.log("loading modal")
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
    instances[0].open()
});



/***********display time input funciton***********/

const checkbox = document.getElementById('is-timed-checkbox');
const timeInput = document.getElementById("time-input")

checkbox.addEventListener('change', () => {
    if (checkbox.checked === false) {
        timeInput.style.display = "none";
    } else {
        timeInput.style.display = "block";
    }
});

/*************PAGE JS *******/

const exerciseList = document.getElementById("exercise-list")
const deleteAll = document.getElementById("delete-btn")
const resetAll = document.getElementById("reset-btn")

//IF NO EXERCISES FROM LOCAL STORAGE START OFF WITH 2 SAMPLE ONES//
let exercises = [
    {
        title: "Always start with stretching!",
        description: "your choice of",
        time: 10
    }
]


//*********render exercises to the screen***********//
const render = () => {
    let listHtml = ""
    exercises.forEach((exercise) => {
        listHtml += `
        <li>
        <div class="collapsible-header">
            <p>${exercise.title}</p>

            ${exercise.time ? `<p>Time : <span class='exercise-time-rendered'>${exercise.time}</span> min/mins</p>` : ""}


            <div>
                <a href="#timer-container" class="waves-effect waves-light btn start-timer" ${exercise.time ? 'style="display:inline-block"'
                : 'style="display:none"'} >Start Timer</a>
                <a class="waves-effect waves-light btn delete-item">Delete</a>
            </div>
            <label>
                <input type="checkbox" class="complete" />
                <span>Done</span>
            </label>

        </div>
        <div class="collapsible-body"><span>${exercise.description.startsWith('/media') ?
                `<img src="https://wger.de${exercise.description}">` : `${exercise.description}`}</span>
        </div>
    </li>
        `

    })
    exerciseList.innerHTML = listHtml;

    addDeleteFunction()
    addStartTimer()
    console.log(exercises)

}


deleteAll.addEventListener("click", () => {
    exercises = []
    timer(0)
    render()
    disableStopwatchBtns()
})

resetAll.addEventListener("click", () => {
    let checkboxes = document.querySelectorAll(".complete")
    checkboxes.forEach(box => {
        box.checked = false;
        stopTimer()

    })
    disableStopwatchBtns()
})
//******** Add a new Exercise *********/
/* instantiate a new obj of exerecise class
push it to exercises array, and then re-render*/

let title = document.getElementById("title")
let description = document.getElementById("exercise-description")
let time = document.getElementById("time-input")
let form = document.getElementById("exercise-form")

class Exercise {
    constructor(title, description, time) {
        this.title = title;
        this.description = description;
        this.time = time;
    }
}

// listen for the form submit

form.addEventListener("submit", (e) => {
    e.preventDefault()
    let newObj = new Exercise(title.value, description.value, time.value)
    exercises.push(newObj)
    console.log(exercises)
    title.value = ""
    description.value = ""
    time.value = ""
    checkbox.checked = false
    timeInput.style.display = "none"
    render()
    window.location.href = "#your-exercises";
})

/***********Delete an exercise  ************/
// get all the delete btns
// add an event listener
// find the btn clicked, use the parentconainer stuff and find the title value,
//pass to the remove function
// iterate through exercises array and check if === the value
// then spice it from the array and re-render

function addDeleteFunction() {
    let deleteBtns = document.querySelectorAll(".delete-item")

    deleteBtns.forEach((btn, i) => {
        btn.addEventListener("click", (e) => {
            let deleteTitle = e.target.parentElement.parentElement.firstElementChild.textContent
            exercises.forEach((exercise, j) => {
                if (exercise.title === deleteTitle) {
                    exercises.splice(i, 1)
                    // stop the timer only if we have deleted the current exercise running it
                    if (currentExercise === i) stopTimer()
                    render()
                }
            })
        })
    })
}

render()

/*************Calls to the stopwatch**********/

function addStartTimer() {
    const resetBtns = document.querySelectorAll(".start-timer")
    console.log(resetBtns)
    resetBtns.forEach((button, i) => button.addEventListener('click', () => { //Got it working! hadd to retrun function call from anonymous function!
        event.stopPropagation()
        startTimer(i)
    }));
}

document.getElementById("stop-timer").disabled = true;
document.getElementById("stop-timer").addEventListener("click", stopTimer)
document.getElementById("pause-timer").disabled = true;
document.getElementById("pause-timer").addEventListener("click", pauseTimer)

/***********API calls ************/





/***********edit appointment ************/
const editBtn = document.getElementById("edit-appt")
const dateForm = document.getElementById("appt-form")
let isShown = false;
let apptDate = document.getElementById("appt-date-input")
let apptTime = document.getElementById("appt-time-input")
let nextAppt = document.getElementById("pt-date")

editBtn.addEventListener("click", () => {
    if (isShown) {
        dateForm.style.display = "none"
        editBtn.textContent = "edit"
        isShown = false;
    }
    else {
        dateForm.style.display = "block"
        isShown = true
        editBtn.textContent = "cancel"
    }
})

dateForm.addEventListener("submit", () => {
    event.preventDefault()
    nextAppt.textContent = `${apptDate.value.slice(5)} at ${parseInt(apptTime.value) > 12 ? (parseInt(apptTime.value) - 12) + " pm" :
        apptTime.value + "am"}`
    dateForm.style.display = "none"
    editBtn.textContent = "edit"
})



export { exercises }
