
let search = document.querySelector('#search'),
    searchBtn = document.querySelector('#search-btn'),
    font = document.querySelector('select'),
    body = document.querySelector('body'),
    toggle = document.querySelector('.toggle');

toggle.addEventListener('click', () => {
    body.classList.toggle("dark-mode");
    body.querySelector('.cover').classList.toggle('dark-mode');
    body.querySelector('a').classList.toggle('dark-mode');
    font.classList.toggle("dark-mode");
})

// Select font styles
font.onchange = () => {
    body.style.fontFamily = font.value;
}

// Search Item function
searchBtn.addEventListener('click', query);

function query(e) {
    e.preventDefault();
    // Fetch API Request
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${search.value}`)
        .then(res => res.json())
        .then(data => {
            // Fetch transcription
            let transcription = data[0].phonetic || data[0].phonetics[1].text

            //Modify Output content
            let output = `
            <div class= "result">
                <div>
                    <h1 class="title">${search.value}</h1>
                    <span class="transcript">${transcription}</span>
                </div>
                <button class="play" id="play"><i class="fa-solid fa-play"></i></button>
            </div>
            `
            data.forEach((uniqueRes, index) => {
                let meaning = uniqueRes.meanings;
                meaning.forEach((def, index) => {

                    //Pull nouns
                    if (def.partOfSpeech === 'noun') {
                        output += `<h3>${def.partOfSpeech}</h3>`
                        const nouns = [...def.definitions]
                        const nounsList = nouns.map(noun => noun)
                        const nounMeanings = nounsList.map(x => x.definition)
                        nounMeanings.forEach(meaning => output +=
                            `<li class='definition'>${meaning}</li>`)
                    }

                    // Pull Verbs
                    if (def.partOfSpeech === 'verb') {
                        output += `<h3>${def.partOfSpeech}</h3>`
                        const verbs = [...def.definitions]
                        const verbsList = verbs.map(verb => verb)
                        const verbMeanings = verbsList.map(x => x.definition)
                        verbMeanings.forEach(meaning => output +=
                            `<li class ='definition'>${meaning}</li>`)
                    }

                    //Pull pronouns
                    if (def.partOfSpeech === 'pronoun') {
                        output += `<h3>${def.partOfSpeech}</h3>`
                        const pronouns = [...def.definitions]
                        const pronounsList = pronouns.map(pronoun => pronoun)
                        const pronounMeanings = pronounsList.map(x => x.definition)
                        pronounMeanings.forEach(meaning => output +=
                            `<li class='definition'>${meaning}</li>`)
                    }

                    //Pull interjections
                    if (def.partOfSpeech === 'exclamation') {
                        output += `<h3>${def.partOfSpeech}</h3>`
                        const exclamations = [...def.definitions]
                        const exclamationsList = exclamations.map(exclamation => exclamation)
                        const exclamationMeanings = exclamationsList.map(x => x.definition)
                        exclamationMeanings.forEach(meaning => output +=
                            `<li class='definition'>${meaning}</li>`)
                    }

                    //Pull adjectives
                    if (def.partOfSpeech === 'adjective') {
                        output += `<h3>${def.partOfSpeech}</h3>`
                        const adjectives = [...def.definitions]
                        const adjectivesList = adjectives.map(adjective => adjective)
                        const adjectiveMeanings = adjectivesList.map(x => x.definition)
                        adjectiveMeanings.forEach(meaning => output +=
                            `<li class='definition'>${meaning}</li>`)
                    }

                    //Pull adverbs
                    if (def.partOfSpeech === 'adverb') {
                        output += `<h3>${def.partOfSpeech}</h3>`
                        const adverbs = [...def.definitions]
                        const adverbsList = adverbs.map(adverb => adverb)
                        const adverbMeanings = adverbsList.map(x => x.definition)
                        adverbMeanings.forEach(meaning => output +=
                            `<li class='definition'>${meaning}</li>`)
                    }

                    //Pull conjuctions
                    if (def.partOfSpeech === 'conjunction') {
                        output += `<h3>${def.partOfSpeech}</h3>`
                        const conjunctions = [...def.definitions]
                        const conjunctionsList = conjunctions.map(conjunction => conjunction)
                        const conjunctionMeanings = conjunctionsList.map(x => x.definition)
                        verbMeanings.forEach(meaning => output +=
                            `<li class='definition'>${meaning}</li>`)
                    }
                })
            });

            //Display information to DOM
            document.querySelector('.output').innerHTML = output;

            //Fetch sounds and play if available
            let audio = new Audio(data[0].phonetics[0].audio || data[0].phonetics[1].audio);
            let sound = document.querySelector('.play');
            sound.onclick = () => {
                audio.play();
            }
        })
        //Error if no result is found
        .catch(err => document.querySelector('.output').innerHTML =
            `<p>This word, ${search.value}, is not found. Please, check the spelling of the word and try again!</p>`
        )
}