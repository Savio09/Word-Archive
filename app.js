let search = document.querySelector('#search')
let searchBtn = document.querySelector('#search-btn')
let font = document.querySelector('select')
let body = document.querySelector('body')

font.onchange = function () {
    body.style.fontFamily = font.value;
}
searchBtn.addEventListener('click', query)

function query(e) {
    e.preventDefault();
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${search.value}`)
        .then(res => res.json())
        .then(data => {
            let output = `
            <h1 class="title">${search.value}</h1>
            <button><i class="fa-solid fa-play"></i></button>
            `
            data.forEach((uniqueRes, index) => {
                let meaning = uniqueRes.meanings

                meaning.forEach((def, index) => {
                    def.definitions.forEach(definition => {
                        //console.log(definition.definition)
                        output += `<p>${definition.definition}</p>`
                    })
                })
            });
            document.querySelector('.output').innerHTML = output;
        })
        .catch(err => document.querySelector('.output').innerHTML =
            `This word, ${search.value}, was not found. Please, check the spelling of the word and try again!`
        )
}