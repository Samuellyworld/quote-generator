// grabbing our id(s) from html

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// show loading
function showLoadingSpinner() {
    loader.hidden =false;
    quoteContainer.hidden =true;
}

// hide loading
function removeLoadingSpinner() {
    if(!loader.hidden) {
        quoteContainer.hidden =false;
        loader.hidden = true;
    }
}

// get quote from API
async function getQuote() {
    showLoadingSpinner();
    //  we need to use a proxy URL to make our Api call in order to avoid error
    const proxyUrl = 'https://peaceful-forest-85328.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
     try {
          const response = await fetch(proxyUrl + apiUrl);
          const data = await response.json();
        //   if there is no author in data, add Unknown
          if(data.quoteAuthor === '') {
             authorText.innerText('Unknown');
          } else {
            authorText.innerText = data.quoteAuthor;
          }
        //   if quote text character is > 120 add classlist long-quote from style.css
          if(data.quoteText.length > 120) {
              quoteText.classList.add('long-quote');
          } else {
              quoteText.classList.remove('long-quote');
          }
          quoteText.innerText = data.quoteText;
        //   stop loader, show quote 
          removeLoadingSpinner();
    } catch(error) {
          console.log('whoops, no quote', error);
    }
}

// twitter functionality
function tweetQuote () {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
    window.open(twitterUrl, '_blank');
}
// add EventListener 
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click',tweetQuote);
// On load
getQuote();