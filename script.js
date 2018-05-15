function app () {
  //all the DOM elements
  const cardDeck = document.querySelector('.cardDeck');
  const counter = document.querySelector('.sg-box');
  const logo = document.querySelector('.sg-logo');
  const won = document.querySelector('.sg-text-bit');
  const result = document.querySelector('.result');

  let i = 0;
  let attempts = 0;
  const cardApiAddress = "https://gist.githubusercontent.com/vergilius/6d869a7448e405cb52d782120b77b82c/raw/e75dc7c19b918a9f0f5684595899dba2e5ad4f43/history-flashcards.json"
  let data;

  function apirequest(apiAddress) {
    fetch(apiAddress)
      .then(resp => resp.json())
      .then(getSepecific)
      .catch(error => console.log('Error: ', error));
  }

  function getSepecific(responseAgain) {
    data = responseAgain;
    counter.style.backgroundColor = "#7a8adb";
    //print cards and counter in HTML
    let counterHTML = `<div></div>`
    counterHTML += `<svg class="sg-icon sg-icon--x24">
                      <use xlink:href="#icon-student"></use>
                    </svg> Cards left: ${data.length}`;
    counter.innerHTML = counterHTML;
    console.log(data);
    let deckHTML = `<div></div>`
    deckHTML += `
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
    cardDeck.innerHTML = deckHTML;
    const answer = document.querySelectorAll('.sg-card__hole--gray-secondary-lightest');
    const ass = document.querySelector('.sg-card');
    console.log(attempts)
    answer[0].addEventListener("click", function dupsko() {
      if (data[i].answers[0].correct === true) {
        counter.style.backgroundColor = "#53cf92";
        console.log("yes!")
        data.shift(data[i]);
        attempts++;
        checknumber();
        setTimeout(() => getSepecific(data), 1000);
      } else {
        counter.style.backgroundColor = "#ff796b";
        data.push(data[i]);
        data.shift(data[i]);
        attempts++;
        checknumber();
        console.log("dupa", data)
        setTimeout(() => getSepecific(data), 1000);
      }
    });
    answer[1].addEventListener("click", function dupsko() {
      if (data[i].answers[1].correct === true) {
        counter.style.backgroundColor = "#53cf92";
        console.log("yes!")
        data.shift(data[i]);
        attempts++;
        checknumber();
        setTimeout(() => getSepecific(data), 1000);
      } else {
        counter.style.backgroundColor = "#ff796b";
        data.push(data[i]);
        data.shift(data[i]);
        attempts++;
        checknumber();
        console.log("dupa", data)
        setTimeout(() => getSepecific(data), 1000);
      }
    });
  }

  function checknumber() {
    if (data.length === 0) {
      won.style.display = "block";
      checkResults();
    }
  }

  function checkResults() {
    result.style.display = "block";
    let resultHTML = `<div></div>`
      if (attempts <= 15) {
        resultHTML += `<h1 class="sg-text-bit sg-text-bit--small sg-text-bit--not-responsive">
                      You did well!
                      </h1>`;
        result.innerHTML = resultHTML;
      } else if (attempts > 15) {
        resultHTML += `<h1 class="sg-text-bit sg-text-bit--small sg-text-bit--not-responsive">
                      You did poor!
                      </h1>`;
        result.innerHTML = resultHTML;
      }
  }

  apirequest(cardApiAddress);
}

app();