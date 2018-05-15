function app () {
let i = 0;
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
  let tempAnswer;
  console.log(responseAgain);
  data = responseAgain;
  console.log(data)
  let deck = `<div></div>`
  deck += `
  <div class="sg-card sg-card--padding-large">
        <svg class="sg-sticker">
              <use class="sg-sticker__back" xlink:href="#icon-question"></use>
              <use class="sg-sticker__front" xlink:href="#icon-question"></use>
    </svg>
    <div class="sg-card__hole">${responseAgain[i].question}</div>
    <div class="sg-card__hole sg-card__hole--gray-secondary-lightest">${responseAgain[i].answers[0].answer}</div>
    <div class="sg-card__hole sg-card__hole--gray-secondary-lightest">${responseAgain[i].answers[1].answer}</div>
  </div>
  `;
  cardDeck.innerHTML = deck;
  const answer = document.querySelectorAll('.sg-card__hole--gray-secondary-lightest');
  const ass = document.querySelector('.sg-card');
  console.log(responseAgain[i].answers[0].correct, answer[0])
  answer[0].addEventListener("click", function dupsko() {
    if(responseAgain[i].answers[0].correct === true) {
      ass.classList.add(".mystyle");
      alert("yes!")
      i++;
      getSepecific(responseAgain);
    } else {
      alert("dupa")
    }
  });
  answer[1].addEventListener("click", function dupsko() {
  if(responseAgain[i].answers[1].correct === true) {
    alert("yes!")
    i++;
    getSepecific(responseAgain);
  } else {
    alert("dupa")
  }
});
}

console.log(data)
apirequest(cardApiAddress);

}

app();