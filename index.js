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
