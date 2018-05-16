function app () {
  //all the DOM elements
  const cardDeck = document.querySelector('.cardDeck');
  const counter = document.querySelector('.counter-wrapper');
  const endGame = document.querySelector('.heading');
  const result = document.querySelector('.result');

  let i = 0;
  let attempts = 0;
  const cardApiAddress = "https://gist.githubusercontent.com/vergilius/6d869a7448e405cb52d782120b77b82c/raw/e75dc7c19b918a9f0f5684595899dba2e5ad4f43/history-flashcards.json"
  let data;

  function apirequest(apiAddress) {
    fetch(apiAddress)
      .then(resp => resp.json())
      .then(getSepecificData)
      .catch(error => console.log('Error: ', error));
  }

  function getSepecificData(responseAgain) {

    data = responseAgain;
    counter.style.backgroundColor = "#3a548d";

    //print cards and counter in HTML
    let counterScript = `<div></div>`
    counterScript += `<svg class="sg-icon sg-icon--x24">
                      <use xlink:href="#icon-student"></use>
                    </svg> Cards left: ${data.length}`;
    counter.innerHTML = counterScript;
    
    let deckScript = `<div></div>`
    deckScript += `<div class="sg-card sg-card--padding-large">
                    <svg class="sg-sticker">
                      <use class="sg-sticker__back" xlink:href="#icon-question"></use>
                      <use class="sg-sticker__front" xlink:href="#icon-question"></use>
                    </svg>
                    <div class="sg-card__hole">${data[i].question}
                    </div>
                    <div class="sg-card__hole sg-card__hole--gray-secondary-lightest">${data[i].answers[0].answer}
                    </div>
                    <div class="sg-card__hole sg-card__hole--gray-secondary-lightest">${data[i].answers[1].answer}
                    </div>
                  </div>
                `;
    cardDeck.innerHTML = deckScript;

    const answers = document.querySelectorAll('.sg-card__hole--gray-secondary-lightest');

    // function clickOnCardListeners() {
    //   answers.forEach((answer) => {
    //     answer.addEventListener("click", function(x) {

    //     })
    //   });
    // }

    answers[0].addEventListener("click", function checkUserAnswer() {
        if (data[i].answers[0].correct === true) {
          counter.style.backgroundColor = "#53cf92";
          data.shift(data[i]);
          attempts++;
          checkDataLength();
          setTimeout(() => getSepecificData(data), 1000);
        } else {
          counter.style.backgroundColor = "#ff796b";
          data.push(data[i]);
          data.shift(data[i]);
          attempts++;
          checkDataLength();
          setTimeout(() => getSepecificData(data), 1000);
        }
    });
    answers[1].addEventListener("click", function checkUserAnswer() {
        if (data[i].answers[1].correct === true) {
          counter.style.backgroundColor = "#53cf92";
          data.shift(data[i]);
          attempts++;
          checkDataLength();
          setTimeout(() => getSepecificData(data), 1000);
        } else {
          counter.style.backgroundColor = "#ff796b";
          data.push(data[i]);
          data.shift(data[i]);
          attempts++;
          checkDataLength();
          setTimeout(() => getSepecificData(data), 1000);
        }
    });
  }

  function checkDataLength() {
    if (data.length === 0) {
      endGame.style.display = "block";
      printResults();
      cardDeck.style.display = "none";
      counter.style.display = "none";
    }
  }

  function printResults() {
    let resultHTML = `<div></div>`
      if (attempts <= 12) {
        resultHTML += `<h1 class="sg-text-bit sg-text-bit--small sg-text-bit--not-responsive">
                      You did very well! Your attempts: ${attempts}
                      </h1>`;
        result.innerHTML = resultHTML;
      } else if (attempts > 12 && attempts <= 16) {
        resultHTML += `<h1 class="sg-text-bit sg-text-bit--small sg-text-bit--not-responsive">
                      You did well! Your attempts: ${attempts}
                      </h1>`;
        result.innerHTML = resultHTML;
      } else if (attempts > 16 && attempts <= 20) {
        resultHTML += `<h1 class="sg-text-bit sg-text-bit--small sg-text-bit--not-responsive">
                      You did fine! Your attempts: ${attempts}
                      </h1>`;
        result.innerHTML = resultHTML;
      } else if (attempts > 20) {
        resultHTML += `<h1 class="sg-text-bit sg-text-bit--small sg-text-bit--not-responsive">
                      You did poor! Your attempts: ${attempts}
                      </h1>`;
        result.innerHTML = resultHTML;
      }
    result.style.display = "block";
  }

  apirequest(cardApiAddress);
}

app();