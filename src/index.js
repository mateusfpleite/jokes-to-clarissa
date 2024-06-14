import jokeList from './jokeList.js';

const jokeEl = document.getElementById('joke');
const buttonEl = document.querySelector('button');
const alreadyToldJokes = localStorage.getItem('alreadyToldJokes')
    ? new Set(JSON.parse(localStorage.getItem('alreadyToldJokes')))
    : new Set();

/**
 * Define the text of the joke element with a new joke or a message when all jokes are told.
 */
function setJokeText() {
    if (hasToldAllJokes()) {
        jokeEl.innerHTML = '<p>Acabaram as piadas. :(</p> <p>Peça ao Mateus para adicionar mais piadas!!</p>';
        updateButtonForWhatsApp();
        return;
    }
    const joke = getJoke();
    jokeEl.innerHTML = joke;
    alreadyToldJokes.add(joke);
    saveJokesToLocalStorage();
}

/**
 * Gets a random joke that has not been told yet.
 * @returns {string} A new joke.
 */
function getJoke() {
    const joke = jokeList[Math.floor(Math.random() * jokeList.length)];
    return isJokeAlreadyTold(joke) ? getJoke() : joke;
}

/**
 * Updates the button text and event to call Mateus on WhatsApp.
 */
function updateButtonForWhatsApp() {
    buttonEl.innerText = 'Chamar o Mateus no whatsapp';
    buttonEl.classList.add('whatsapp-button');
    buttonEl.removeEventListener('click', setJokeText);
    buttonEl.addEventListener('click', callMateusOnWhatsapp);
}

/**
 * Checks if the joke has already been told.
 * @param {string} joke - The joke to check.
 * @returns {boolean} True if the joke has been told, false otherwise.
 */
function isJokeAlreadyTold(joke) {
    return alreadyToldJokes.has(joke);
}

/**
 * Checks if all jokes have been told.
 * @returns {boolean} True if all jokes have been told, false otherwise.
 */
function hasToldAllJokes() {
    return alreadyToldJokes.size === jokeList.length;
}

/**
 * Opens WhatsApp to send a message to Mateus.
 */
function callMateusOnWhatsapp() {
    window.open('https://api.whatsapp.com/send?phone=5531993382163&text=Oi%20Mateus,%20quero%20mais%20piadas%20por%20aqui!', '_blank');
}

/**
 * Saves the set of already told jokes to localStorage.
 */
function saveJokesToLocalStorage() {
    localStorage.setItem('alreadyToldJokes', JSON.stringify(Array.from(alreadyToldJokes)));
}

// Initialize the first joke
setJokeText();
buttonEl.addEventListener('click', setJokeText);

// Save already told jokes to localStorage before unloading the page
window.addEventListener('beforeunload', saveJokesToLocalStorage);
