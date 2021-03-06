

// function test (){
//     console.log(document.getElementById("your-exercises"))

// }


// export {test}


let searchResults;
const form = document.getElementById('search-form')
const exerciseSearchContainer = document.getElementById("exercise-search-container")

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    let searchTerm = form.elements.query.value;
    try {
        const res = await fetch(`https://wger.de/api/v2/exercise/search/?term=${searchTerm}`);
        const data = await res.json();


        searchResults = data.suggestions;
        console.log(searchResults)
        if (!searchResults.length){
            exerciseSearchContainer.innerHTML = "<h6 id='no-results'>No results found, try searching for a muscle group or body part ex: 'Leg'</h6>"
        } else{renderSearchResults();}

      } catch (e) {
        console.log("ERROR!!!", e);
      }
      form.elements.query.value = ""

    })



//decide here what to do if the exercise !have image
//allow user to click checkbox to search only images
// maybe add link to google search

function renderSearchResults () {
    let html = ""
    let indexArr = []
    // let filteredWithImage = searchResults.filter(exercise =>{
    //     return exercise.data.image
    // })
    // console.log(filteredWithImage)
    searchResults.forEach((exercise, i) =>{

        html += `
            <div class="exercise-search-item">
                <h5>${exercise.value}</h5>
                <p>${exercise.data.image ? `<img src="https://wger.de${exercise.data.image}">` :
                `no image, click <a target='__blank' href='https://www.google.com/search?q=${exercise.value}'>here</a> to search`}</p>
                <a href= "#add-your-exercise" class="waves-effect waves-light btn add-search-exercise">Copy to clipboard</a>
            </div>
        `
        indexArr.push(i)
    })
    exerciseSearchContainer.innerHTML = html;
    addToExercises(indexArr)
}

// const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;

function addToExercises(array) {
    let searchResultBtns = document.querySelectorAll(".add-search-exercise")
    searchResultBtns.forEach((btn, i) =>{
        btn.addEventListener("click", ()=>{
            copyToClipboard(i)
        }) // will call this function from index.js
    })

}

function copyToClipboard (i){
    document.getElementById("title").value = searchResults[i].value
    if(searchResults[i].data.image){
    document.getElementById("exercise-description").value = searchResults[i].data.image
    }
    console.log("copied")
}
