var startButton = document.getElementById("startButton");
var questionArea = document.getElementById("questions");
var questionText = document.getElementById("question-text");
var optionList = document.getElementById("choices");
var optionOne = document.getElementById("option-one");
var optionTwo = document.getElementById("option-two");
var optionThree = document.getElementById("option-three");
var rulesEl = document.getElementById("rules");
var rulesContinue = document.getElementById("rules-continue");
var scoreList = document.getElementById("scores");
var scoreBoard = document.getElementById("scoreboard");
var initialsInputSectionEl = document.getElementById("initials-input-section")
var initialsInput = document.getElementById("initials-input")
var initialsButton = document.getElementById("initials-submit")
var timer = document.getElementById("timer");
var timeLeft = 50;
var timerInterval;

//Start Button//
startButton.addEventListener("click", showRules);


function showRules() {
    rulesEl.style.display = "block";
    startButton.style.display = "none";
  
}

//Continue Button After Rules//
rulesContinue.addEventListener("click", startQuiz )

function startQuiz() {
    rulesEl.style.display = "none"
    countdown()
    runQuiz()
}




function countdown() {
    timer.style.display = "block";
    timerInterval = setInterval(function () {
      timeLeft--;
      timer.textContent = timeLeft + " seconds left";
      if (timeLeft <= 0) {
        timeLeft = 0;
        endGame();
      }
    }, 1000);
  }

function endGame() {
    clearInterval(timerInterval)

    questionArea.style.display = "none"
    initialsInputSectionEl.style.display = "block"
    timer.style.display = "none"
    initialsButton.addEventListener("click", function (){
      console.log(initialsInput.value)
      localStorage.setItem(initialsInput.value, timeLeft)

      var scores = {
        ...localStorage
      }

      var array = Object.entries(scores)

      array.sort(function(a,b){
        return b[1] - a[1]
      })
      for (let i = 0; i < array.length; i++) {
        var score = array[i];
        var listItem = document.createElement('li');
        var content = `${score[0]} - ${score[1]}`;
        listItem.textContent = content;
        scoreList.appendChild(listItem);
      }
      initialsInputSectionEl.style.display = "none";
      scoreBoard.style.display = "block"
      
    })
    
    


}

  function runQuiz(){
    questionArea.style.display = "block";
    var questionIndex = 0;
    function populateQuestion(){
        questionText.textContent = questions[questionIndex].text
        optionOne.textContent = questions[questionIndex].choices[0]
        optionTwo.textContent = questions[questionIndex].choices[1]
        optionThree.textContent = questions[questionIndex].choices[2]
    }
    function evaluateAnswer(answer){
        if(answer !== questions[questionIndex].correctAnswer){
          if( timeLeft < 10 ) {
            timeLeft = 0
          } else {
            timeLeft -= 10
          }
        }
        if(questionIndex === questions.length - 1){
            endGame();
        } else{
            questionIndex++;
            populateQuestion();
        }
    }
    
    optionOne.addEventListener("click",function(){
        evaluateAnswer(optionOne.textContent)
    })
    optionTwo.addEventListener("click", function(){
        evaluateAnswer(optionTwo.textContent)
    })
    optionThree.addEventListener("click", function(){
        evaluateAnswer(optionThree.textContent)
    })
    populateQuestion()
  }

  //Questions//
  var questions = [
    {
      text: "What year was the internet invented?",
      choices: ["1983", "2003", "1776"],
      correctAnswer: "1983",
    },
  
    {
      text: "When was Javascript created?",
      choices: ["1995", "2005", "2015"],
      correctAnswer: "1995",
    },

    {
      text: "Which one of these is NOT a Javascript interaction?",
      choices: ["guess", "prompt", "confirm"],
      correctAnswer: "guess",
    },
  ];
