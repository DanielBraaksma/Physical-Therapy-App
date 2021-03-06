


import { timer, displayTimeLeft, startTimer, stopTimer, pauseTimer, disableStopwatchBtns, currentExercise } from './stopwatch.js'
import './api.js'

/*********Materialize JS************/

M.AutoInit();


document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
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
let exercises = JSON.parse(localStorage.getItem("myExercises"))


//IF NO EXERCISES FROM LOCAL STORAGE START OFF WITH 2 SAMPLE ONES//

if (exercises === null || !exercises.length) {
    exercises = [
        {
            title: "example : Start off with stretching",
            description: "your choice of calf or hamstring stretch",
            time: 1,
        },
        {
            title: "example : Mild cycling",
            description: "keep speed at 10mph",
            time: 1,
        },
        {
            title: "example : Leg Raises lying",
            description: "/media/exercise-images/125/Leg-raises-2.png",
            time: undefined,
        }
    ]
    /// set exercises to local storage
    localStorage.setItem("myExercises", JSON.stringify(exercises));
}


//*********render exercises to the screen***********//
const render = () => {
    // exercises = JSON.parse(localStorage.getItem("myExercises")) //every time we render pull updated from local storage
    let listHtml = ""
    exercises.forEach((exercise) => {
        listHtml += `
        <li>
        <div class="collapsible-header">
            <p>${exercise.title}</p>

            ${exercise.time ? `<p>Time : <span class='exercise-time-rendered'>${exercise.time}</span> min/mins</p>` : "<span></span>"}


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
    determineComplete()
    addDeleteFunction()
    addStartTimer()
    console.log(exercises)

}


deleteAll.addEventListener("click", () => {
    exercises = []
    localStorage.removeItem('myExercises');
    timer(0)
    render()
    disableStopwatchBtns()
})

resetAll.addEventListener("click", () => {
    let checkboxes = document.querySelectorAll(".complete")
    checkboxes.forEach((box, i) => {
        box.checked = false;
        document.querySelectorAll(".collapsible-header")[i].style.backgroundColor = "white";
        stopTimer()

    })
    disableStopwatchBtns()
})

function determineComplete() {
    document.querySelectorAll(".complete").forEach((box, i) => {
        box.addEventListener("change", () => {
            console.log("box-changed!")
            if (box.checked) {
                document.querySelectorAll(".collapsible-header")[i].style.backgroundColor = "lightgreen"
            } else { document.querySelectorAll(".collapsible-header")[i].style.backgroundColor = "white" }
        })
    })

}

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
    localStorage.setItem("myExercises", JSON.stringify(exercises));
    console.log(exercises)
    title.value = ""
    description.value = ""
    time.value = ""
    checkbox.checked = false
    timeInput.style.display = "none"
    render()
    window.location.href = "#your-exercises"; //uses jS to send to link
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
                    localStorage.setItem("myExercises", JSON.stringify(exercises));
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
    resetBtns.forEach((button, i) => button.addEventListener('click', () => { //Got it working! hadd to retrun function call from anonymous function!
        event.stopPropagation()
        startTimer(i)
    }));
}

document.getElementById("stop-timer").disabled = true;
document.getElementById("stop-timer").addEventListener("click", stopTimer)
document.getElementById("pause-timer").disabled = true;
document.getElementById("pause-timer").addEventListener("click", pauseTimer)


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

let savedDate = JSON.parse(localStorage.getItem("apptDate"))

nextAppt.textContent = `${ savedDate === null ? "04-13 at 7:00pm" : savedDate}`

dateForm.addEventListener("submit", () => {
    event.preventDefault()
    let newApptText = `${apptDate.value.slice(5)} at ${parseInt(apptTime.value) > 12 ? (parseInt(apptTime.value) - 12) + " pm" :
    apptTime.value + "am"}`
    localStorage.setItem("apptDate", JSON.stringify(newApptText));
    nextAppt.textContent = newApptText
    dateForm.style.display = "none"
    editBtn.textContent = "edit"
})


export { exercises }
