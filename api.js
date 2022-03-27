

function test (){
    console.log(document.getElementById("your-exercises"))

}


export {test}


let searchResults;
const form = document.getElementById('search-form')

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
// maybe add link

function renderSearchResults () {
    let html = ""
    let filteredWithImage = searchResults.filter(exercise =>{
        return exercise.data.image
    })
    filteredWithImage.forEach((exercise, i) =>{
        html += `


        `

    })
}
