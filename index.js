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
//Classes//

class Exercise {
    constructor (title, description, time) {
        this.title = title;
        this.description = description;
        this.time = time;
    }
}

class UI {
    static displayExercises (){
        let storedExercises = [
            {title: "calf-stretch",
            description: "stretch each calf",
            time: 10,
            }
        ];

        const exercises = storedExercises;
    }
}
