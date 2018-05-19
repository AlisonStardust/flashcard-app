function app () {

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
      .then(getSpecificData)
      .catch(error =>  {
        error.style.display = "block";
        console.log('Error: ', error)});
  }

  apiRequest(cardApiAddress);

  function getSpecificData(responseAgain) {

    data = responseAgain;
    counter.innerText = `Cards left: ${data.length}`;

    //I wanted to change the background color of counter by adding and removing classes to nodelist of element.
    //However I am using elementes provided by Brainly Style Guide and I don't know the exact features of those classes so I could replicate them.
    counter.style.backgroundColor = "#3a548d";

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

    // I am not proud of the code below.
    //I wanted to use forEach to add event listener to each answer, but I was unable to do this correctly.
    answers[0].addEventListener("click", function checkUserAnswer() {
      if (data[i].answers[0].correct === true) {
        correct();
        changeData();
      } else if (data[i].answers[0].correct === false) {
        incorrect();
        changeData();
      } else {
        console.log("Unexpected set of answers");
      }
    });

    answers[1].addEventListener("click", function checkUserAnswer() {
      if (data[i].answers[1].correct === true) {
        correct();
        changeData();
      } else if (data[i].answers[1].correct === false) {
        incorrect();
        changeData();
      } else {
        console.log("Unexpected set of answers");
      }
    });

    function correct() {
      counter.style.backgroundColor = "#53cf92";
    }
    
    function incorrect() {
      counter.style.backgroundColor = "#ff796b";
      data.push(data[i]);
    }

    function changeData() {
      answers.forEach((answer) => {
        answer.classList.add("cardDeck_answer--unclickable");
      });
      data.shift(data[i]);
      attempts++;
      checkDataLength();
      setTimeout(() => getSpecificData(data), 1000);
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
        result.innerText = `Game finished! Remarkable! You did very well! Your attempts: ${attempts}`;
      } else if (attempts > 12 && attempts <= 16) {
        result.innerText = `Game finished! You did well! Your attempts: ${attempts}`;
      } else if (attempts > 16 && attempts <= 20) {
        result.innerText = `Game finished! You did fine. Your attempts: ${attempts}`;
      } else if (attempts > 20) {
        result.innerText = `Game finished! You did poorly... Your attempts: ${attempts}`;
      }
    result.style.display = "block";
  }
}

app();