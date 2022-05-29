const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];

function showLoadingAnimation() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoadingAnimation() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show new quote
function newQuote() {
    showLoadingAnimation();

    // Pick a random quote from apiQoutes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // Check if author is blank and replace with unknown
    if(!quote.author) {
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }

    // Check quote length to determine styling
    if(quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    
    // Set quote, hide loader
    quoteText.textContent = quote.text;
    hideLoadingAnimation();

}

// Get Quotes From API
async function getQuotes() {
    showLoadingAnimation();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch Error Here
        alert('Something went wrong. ' + error);
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

// Event listeners
newQuoteButton.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote);

// On load 
getQuotes();