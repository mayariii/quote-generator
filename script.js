const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');

let apiQuotes = [];

// SHOW LOADING
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// HIDE LOADING
function loadingComplete() {
    loader.hidden = true;
    quoteContainer.hidden = false; 
}

// SHOW NEW QUOTE
function newQuote() {
    loading();
    // pick a random quote from API quotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    //  check if author field is null, and replace it with unknown
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }

    // check quote length to determine the styling
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // set quote, hide loader
    quoteText.textContent = quote.text;
    loadingComplete();
}

// GET QUOTES FROM API
// Using an async fetch request
async function getQuotes() {
    loading();
    const apiURL = 'https://type.fit/api/quotes';
    // try catch - try and complete fetch request, if not do something with the error information
    try {
        // set up fetch request
        const response = await fetch(apiURL); // response variable won't be populated until data from API is fetched
        apiQuotes = await response.json(); // get JSON from API and turn into JSON object 
        newQuote();
    } catch (error) {
        // catch error here
    }
}

// TWEET A QUOTE
function tweetQuote() {
    const twitterURL = `https://twitter.com/intent/tweet?text="${quoteText.textContent}" - ${authorText.textContent}`
    window.open(twitterURL, '_blank');
}

// EVENT LISTENERS
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// ON LOAD
getQuotes();