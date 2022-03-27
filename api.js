

function test (){
    console.log(document.getElementById("your-exercises"))

}


export {test}


let searchResults;
const form = document.getElementById('search-form')
const exerciseSearchContainer = document.getElementById("exercise-search-container")

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    try {
        const res = await fetch(`https://wger.de/api/v2/exercise/search/?term=${searchTerm}`);
        const data = await res.json();

        searchResults = data.suggestions;
        console.log(searchResults)
        renderSearchResults();

      } catch (e) {
        console.log("ERROR!!!", e);
      }
    })


//decide here what to do if the exercise !have image
//allow user to click checkbox to search only images
// maybe add link to google search

function renderSearchResults () {
    let html = ""
    // let filteredWithImage = searchResults.filter(exercise =>{
    //     return exercise.data.image
    // })
    // console.log(filteredWithImage)
    searchResults.forEach((exercise, i) =>{

        html += `
            <div class="exercise-search-item">
                <h5>${exercise.value}</h5>
                <p>${exercise.data.image ? `<img src="https://wger.de${exercise.data.image}">` :
                `no image, click <a href='https://www.google.com/search?q=${exercise.value}'>here</a> to search`}</p>
            </div>
        `
    })
    exerciseSearchContainer.innerHTML = html;
}

// const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
