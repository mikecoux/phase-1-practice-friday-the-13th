let currentMovie;

document.addEventListener('DOMContentLoaded', fetchData())

function fetchData () {
    fetch ('http://localhost:3000/movies')
        .then (res => res.json())
        .then (data => {
            renderMovies(data)
            displayMovie(data[0])
            handleButton()
            handleForm()
        })
}

function renderMovies (movies) {
    movies.forEach(movie => {
        const nav = document.querySelector('#movie-list')
        const navElement = document.createElement('span')
        const navElementImg = document.createElement('img')

        navElementImg.src = movie.image
        navElement.appendChild(navElementImg)
        nav.appendChild(navElement)
        
        navElementImg.addEventListener('click', () => {
            displayMovie(movie)
        })
    })
}

function displayMovie(movie) {
    currentMovie = movie

    const movieImage = document.querySelector('#detail-image')
    const movieTitle = document.querySelector('#title')
    const movieYear = document.querySelector('#year-released')
    const movieDesc = document.querySelector('#description')
    const movieBlood = document.querySelector('#amount')
    const watchButton = document.querySelector('#watched')
    const {title, release_year, description, image, watched, blood_amount} = movie

    movieImage.src = image
    movieTitle.textContent = title
    movieYear.textContent = release_year
    movieDesc.textContent = description
    movieBlood.textContent = blood_amount
    watched ? watchButton.textContent = 'Watched' : watchButton.textContent = 'Unwatched'
    //wanted to put the watchButton event listener here, but it would record an event for every movie that had been clicked on
}

function handleButton () {
    const watchButton = document.querySelector('#watched')

    watchButton.addEventListener('click', e => {
        let movieObj = {
            id: currentMovie.id,
            title: currentMovie.title,
            release_year: currentMovie.release_year,
            description: currentMovie.description,
            image: currentMovie.image,
            watched: !currentMovie.watched,
            blood_amount: currentMovie.blood_amount
        }
        fetch (`http://localhost:3000/movies/${currentMovie.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(movieObj)
        })
            .then(res => res.json())
            .then(data => displayMovie(data))
    })
}

function handleForm () {
    const bloodForm = document.querySelector('#blood-form')

    bloodForm.addEventListener('submit', (e) => {
        e.preventDefault()
        let numDrops = currentMovie.blood_amount
        numDrops += parseInt(e.target[0].value)
        let movieObj = {
            id: currentMovie.id,
            title: currentMovie.title,
            release_year: currentMovie.release_year,
            description: currentMovie.description,
            image: currentMovie.image,
            watched: currentMovie.watched,
            blood_amount: numDrops
        }
        fetch (`http://localhost:3000/movies/${currentMovie.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(movieObj)
        })
            .then(res => res.json())
            .then(data => displayMovie(data))
    })
}