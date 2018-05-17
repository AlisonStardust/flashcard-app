function app () {
  //all the DOM elements
  const cardDeck = document.querySelector('.cardDeck');
  const counter = document.querySelector('.counter-wrapper');
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
    counter.innerText = `Cards left: ${data.length}`;
    //I know that innerHTML is bad, however right now this is the only way I am able to to this task
    //let deckScript = `<div></div>`
    let deckScript = `<div class="sg-card sg-card--padding-large">
                    <div class="sg-card__hole">${data[i].question}
                    </div>
                    <div class="sg-card__hole sg-card__hole--gray-secondary-lightest">${data[i].answers[0].answer}
                    </div>
                    <div class="sg-card__hole sg-card__hole--gray-secondary-lightest">${data[i].answers[1].answer}
                    </div>
                  </div>
                `;
    cardDeck.innerHTML = deckScript;

    let answers = document.querySelectorAll('.sg-card__hole--gray-secondary-lightest');

    // function clickOnCardListeners() {
    //   answers.forEach((answer) => {
    //     answer.addEventListener("click", function(x) {
          // if (data[i].answers[0].correct === true) {
          //   counter.style.backgroundColor = "#53cf92";
          //   data.shift(data[i]);
          //   attempts++;
          //   checkDataLength();
          //   setTimeout(() => getSepecificData(data), 1000);
          // } else {
          //   counter.style.backgroundColor = "#ff796b";
          //   data.push(data[i]);
          //   data.shift(data[i]);
          //   attempts++;
          //   checkDataLength();
          //   setTimeout(() => getSepecificData(data), 1000);
          // }
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
      printResults();
      cardDeck.style.display = "none";
      counter.style.display = "none";
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

  apirequest(cardApiAddress);
}

app();