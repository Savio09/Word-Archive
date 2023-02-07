
    let search = document.querySelector('#search')
    let searchBtn = document.querySelector('#search-btn')
    let font = document.querySelector('select')
    let body = document.querySelector('body')
    let toggle = document.querySelector('.toggle')

    toggle.addEventListener('click', () => {
        body.classList.toggle("dark-mode")
        body.querySelector('.cover').classList.toggle('dark-mode')
        font.classList.toggle("dark-mode")
    })

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
                let transcription = data[0].phonetic || data[0].phonetics[1].text
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
                    console.log(meaning)

                    meaning.forEach((def, index) => {

                        if (def.partOfSpeech === 'noun') {
                            output += `<h3>${def.partOfSpeech}</h3>`
                            const nouns = [...def.definitions]
                            const nounsList = nouns.map(noun => noun)
                            const nounMeanings = nounsList.map(x => x.definition)
                            nounMeanings.forEach(meaning => output +=
                                `<li class='definition'>${meaning}</li>`)
                        }

                        if (def.partOfSpeech === 'verb') {
                            output += `<h3>${def.partOfSpeech}</h3>`
                            const verbs = [...def.definitions]
                            const verbsList = verbs.map(verb => verb)
                            const verbMeanings = verbsList.map(x => x.definition)
                            verbMeanings.forEach(meaning => output +=
                                `<li class ='definition'>${meaning}</li>`)
                        }
                    })
                });

                document.querySelector('.output').innerHTML = output;
                let audio = new Audio(data[0].phonetics[0].audio || data[0].phonetics[1].audio)
                let sound = document.querySelector('.play');
                sound.onclick = () => {
                    audio.play()
                }
            })
            .catch(err => document.querySelector('.output').innerHTML =
                `<p>This word, ${search.value}, is not found. Please, check the spelling of the word and try again!</p>`
            )
    }