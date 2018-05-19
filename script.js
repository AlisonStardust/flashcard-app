function app () {
  //DOM elements
  const cardDeck = document.querySelector('.cardDeck-wrapper');
  const counter = document.querySelector('.counter-wrapper');
  const result = document.querySelector('.results-wrapper');
  const logo = document.querySelector('.logo-wrapper');
  const error = document.querySelector('.error');
  const cardApiAddress = `https://gist.githubusercontent.com/vergilius/6d869a7448e405cb52d782120b77b82c \
  /raw/e75dc7c19b918a9f0f5684595899dba2e5ad4f43/history-flashcards.json`

  let i = 0;
  let attempts = 0;
  let data;
  

  function apiRequest(apiAddress) {
    fetch(apiAddress)
      .then(resp => resp.json())
      .then(getSepecificData)
      .catch(error =>  {
        error.style.display = "block";
        console.log('Error: ', error)});
  }

  function getSepecificData(responseAgain) {

    data = responseAgain;

    counter.style.backgroundColor = "#3a548d";
    counter.innerText = `Cards left: ${data.length}`;

    //I know that innerHTML is bad, however right now this is the only way I am able to to this task
    let deckScript =
      `<div class="cardDeck sg-card sg-card--padding-large">
        <div class="cardDeck_question sg-card__hole">${data[i].question}
        </div>
        <div class="cardDeck_answer sg-card__hole sg-card__hole--gray-secondary-lightest">${data[i].answers[0].answer}
        </div>
        <div class="cardDeck_answer sg-card__hole sg-card__hole--gray-secondary-lightest">${data[i].answers[1].answer}
        </div>
      </div>
      `;
    cardDeck.innerHTML = deckScript;

    let answers = document.querySelectorAll('.cardDeck_answer');

    answers[0].addEventListener("click", function checkUserAnswer() {
      if (data[i].answers[0].correct === true) {
        correct();
      } else {
        incorrect();
      }
    });

    answers[1].addEventListener("click", function checkUserAnswer() {
      if (data[i].answers[1].correct === true) {
        correct();
      } else {
        incorrect();
      }
    });

    function correct() {
      counter.style.backgroundColor = "#53cf92";
      changeData();
    }
    
    function incorrect() {
      counter.style.backgroundColor = "#ff796b";
      data.push(data[i]);
      changeData();
    }

    function changeData() {
      data.shift(data[i]);
      attempts++;
      checkDataLength();
      setTimeout(() => getSepecificData(data), 1000);
    }
  }

  function checkDataLength() {
    if (data.length === 0) {
      cardDeck.style.display = "none";
      counter.style.display = "none";
      printResults();
    }
  }

  function printResults() {
      if (attempts <= 12) {
        result.innerText = `Game finished! You did very well! Your attempts: ${attempts}`;
      } else if (attempts > 12 && attempts <= 16) {
        result.innerText = `Game finished! You did well! Your attempts: ${attempts}`;
      } else if (attempts > 16 && attempts <= 20) {
        result.innerText = `Game finished! You did fine. Your attempts: ${attempts}`;
      } else if (attempts > 20) {
        result.innerText = `Game finished! You did poor... Your attempts: ${attempts}`;
      }
    result.style.display = "block";
  }

  apiRequest(cardApiAddress);
}

app();