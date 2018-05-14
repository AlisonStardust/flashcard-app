const cardApiAddress = "https://gist.githubusercontent.com/vergilius/6d869a7448e405cb52d782120b77b82c/raw/e75dc7c19b918a9f0f5684595899dba2e5ad4f43/history-flashcards.json"
let data;
const cardDeck = document.querySelector('.cardDeck');

function apirequest(apiAddress) {
  fetch(apiAddress)
    .then(resp => resp.json())
    .then(getSepecific)
    .catch(error => console.log('Error: ', error));
}

function getSepecific(responseAgain) {
  console.log(responseAgain);
  data = responseAgain;
  console.log(data)
  let deck = `<div></div>`
  for (var i in data) {
    deck += `
    <div class="sg-card sg-card--padding-large">
          <svg class="sg-sticker">
                <use class="sg-sticker__back" xlink:href="#icon-question"></use>
                <use class="sg-sticker__front" xlink:href="#icon-question"></use>
      </svg>
      <div class="sg-card__hole">${data[i].question}</div>
      <div class="sg-card__hole sg-card__hole--gray-secondary-lightest">${data[i].answers[0].answer}</div>
      <div class="sg-card__hole sg-card__hole--gray-secondary-lightest">${data[i].answers[1].answer}</div>
    </div>
    `;
  }
cardDeck.innerHTML = deck;
}

console.log(data)
apirequest(cardApiAddress);