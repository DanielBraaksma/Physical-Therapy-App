//Materialize JS//

M.AutoInit();


document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);
  });


//display time input funciton//

const checkbox = document.getElementById('is-timed-checkbox');
const timeInput = document.getElementById("time-input")

checkbox.addEventListener('click', () => {
    if (checkbox.checked === false){
        timeInput.style.display = "none";
      } else {
        timeInput.style.display = "block";
      }
});

/*************PAGE JS *******/


//array that will store our exercises - starts off with default streching//
// remove the delete button on the first instance of exercise w/ css

const exerciseList = document.getElementById("exercise-list")
let exercises = [
    {title: "Always start with stretching!",
    description: "your choice of",
    time: 10
    }
]


//*********render exercises to the screen***********//
const render = () =>{
    let listHtml = ""
    exercises.forEach((exercise)=>{
        listHtml += `
        <li>
        <div class="collapsible-header">
            <p>${exercise.title}</p>
            <p>Time : <span id="exercise-time-rendered">${exercise.time}</span>minutes</p>
            <div>
                <a class="waves-effect waves-light btn" id="reset-timer">Start/Stop timer</a>
                <a class="waves-effect waves-light btn" id="delete-item">Delete</a>
            </div>
            <label>
                <input type="checkbox" id="complete" />
                <span>Done</span>
            </label>

        </div>
        <div class="collapsible-body"><span>${exercise.description}</span></div>
    </li>
        `
    })

    exerciseList.innerHTML = listHtml;
}

render()

// console.log(exercises.findIndex(()=>exercises.time === 10));

//******** Add a new Exercise *********/
/* instantiate a new obj of exerecise class
push it to exercises array, and then re-render*/

let title = document.getElementById("title")
let description = document.getElementById("exercise-description")
let time = document.getElementById("time-input")
let form = document.getElementById("exercise-form")

// listen for the form submit

form.addEventListener("submit", (e)=>{
    e.preventDefault()
    let newObj = new Exercise (title.value, description.value, time.value)
    exercises.push(newObj)
    console.log(exercises)
    title.value = ""
    description.value = ""
    time.value = ""
    render()
})



class Exercise {
    constructor (title, description, time) {
        this.title = title;
        this.description = description;
        this.time = time;
    }

    //add a start/stop timer button here

}

/***********Delete an exercise  ************/
// get all the delete btns
    // add an event listener
    // find the btn clicked, use the parentconainer stuff and find the title value,
    //pass to the remove function
    // iterate through exercises array and check if === the value
        // then spice it from the array and re-render
