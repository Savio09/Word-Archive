    let search = document.querySelector('#search')
    let searchBtn = document.querySelector('#search-btn')
    let font = document.querySelector('select')
    let body = document.querySelector('body')
   
    
    
    


    font.onchange = () => {
    console.log(font.value)
    body.style.fontFamily = font.value;
    }

    searchBtn.addEventListener('click', query)

    function query(e) {
    e.preventDefault();
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${search.value}`)
    .then(res => res.json())
    .then(data => {
    let output = `
    <div class= "result">
        <div>
            <h1 class="title">${search.value}</h1>
            <span class="transcript">${data[0].phonetic}</span>
        </div>
        <button class="play" id="play"><i class="fa-solid fa-play"></i></button>
    </div>
    `
    let play = document.querySelector('.play')
    let audio= new Audio("https:"+ data[0].phonetics[0].audio)
    play.onclick = () => {
    audio.play();
    }
    data.forEach((uniqueRes, index) => {
        let meaning = uniqueRes.meanings;
        meaning.forEach((def, index) => {

            if (def.partOfSpeech === 'noun') {
                const nouns = [...def.definitions]
                if (nouns.length > 1) {
                    output += `<p>${def.partOfSpeech}</p>`
                }
                nouns.forEach(noun => {
                    output += `<li>${noun.definition}</li>`
                })
            }
            if (def.partOfSpeech === 'verb') {
                const verb = [...def.definitions]
                if (verb.length > 1) {
                    output += `<p>${def.partOfSpeech}</p>`
                }
                verb.forEach(verb => {
                    output += `<li>${verb.definition}</li>`
                })
            }
            if (def.partOfSpeech === 'interjection') {
                const interjection = [...def.definitions]
                if (interjection.length > 1) {
                    output += `<p>${def.partOfSpeech}</p>`
                }
                interjection.forEach(interjection => {
                    output += `<li>${interjection.definition}</li>`
                })
            }
            if (def.partOfSpeech === 'preposition') {
                const preposition = [...def.definitions]
                if (preposition.length > 1) {
                    output += `<p>${def.partOfSpeech}</p>`
                }
                preposition.forEach(preposition => {
                    output += `<li>${preposition.definition}</li>`
                })
            }
            if (def.partOfSpeech === 'adjective') {
                const adjective = [...def.definitions]
                if (adjective.length > 1) {
                    output += `<p>${def.partOfSpeech}</p>`
                }
                adjective.forEach(adjective => {
                    output += `<li>${adjective.definition}</li>`
                })
            }
            if (def.partOfSpeech === 'pronoun') {
                const pronouns = [...def.definitions]
                if (pronouns.length >= 1) {
                    output += `<p>${def.partOfSpeech}</p>`
                }
                pronouns.forEach(pronoun => {
                    output += `<li>${noun.definition}</li>`
                })
            }
            if (def.partOfSpeech === 'adverb') {
                const adverb = [...def.definitions]
                if (adverb.length >= 1) {
                    output += `<p>${def.partOfSpeech}</p>`
                }
                pronouns.forEach(adverb => {
                    output += `<li>${adverb.definition}</li>`
                })
            }
            if (def.partOfSpeech === 'conjunction') {
                const conjunction = [...def.definitions]
                if (conjunction.length > 1) {
                    output += `<p>${def.partOfSpeech}</p>`
                }
                conjunction.forEach(conjunction => {
                    output += `<li>${conjunction.definition}</li>`
                })
            }
        })
    });

    document.querySelector('.output').innerHTML = output;
    })
    .catch(err => document.querySelector('.output').innerHTML =
    `<p>This word, ${search.value}, is not found. Please, check the spelling of the word and try again!</p>`
    )
    }
