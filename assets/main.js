var timerDisplay = document.querySelector("#timer");
var scoresLink = document.querySelector("#score-link");
var btnStart = document.querySelector("#btn-start");
var btnBack = document.querySelector("#btn-back");
var btnClear = document.querySelector("#btn-clear");
var initials = document.querySelector("#initials-input");
var btnSubmit = document.querySelector("#btn-submit");
var errorMessage = document.querySelector("#error-message");
var finalScore = document.querySelector(".final-score");
var scores = document.querySelector("#scores-list");
var sections = document.querySelectorAll("section");

var timerCount = 70;
var quizDone = false;
var score = 0;
var userInitials = "";
var currSection = 0;

function gotoSection(sectionNum){
    for (var i = 0; i < sections.length; i++ ){
        sections[i].dataset.visibility = "hide";
        sections[sectionNum].dataset.visibility = "show";
    }  
}

// When the user clicks the View High Scores link, navigate to that page
scoresLink.addEventListener("click", function(event){
     // Go to the scoreboard
    gotoSection((sections.length)-1);
});

// When the user clicks the Start button, begin the quiz
btnStart.addEventListener("click", function(event){
   startQuiz();
});

// When the user clicks the Go Back button, return to the initial view
btnBack.addEventListener("click", function(event){
     // Go to the start page
     gotoSection(0);
});

// When the user clicks the Clear button, clear High Schores
btnClear.addEventListener("click", function(event){
    scores.innerHTML = "";
});

// When the user clicks the Submit button, display High Scores
btnSubmit.addEventListener("click", function(event){
    event.preventDefault();
    // Get initials from field
    userInitials = initials.value;
     // Go to the scoreboard
    gotoSection((sections.length)-1);
    // Write initials and score to the scoreboard
    var newLi = document.createElement("li");
    newLi.innerHTML = `${userInitials} – ${score} / 5`;
    scores.appendChild(newLi);
    //  Reset the form
    var form = document.querySelector(".submit-initials");
    form.reset();
   
});

function startQuiz() {
    timerCount = 70;
    timerDisplay.textContent = timerCount;
    startTimer();
}

function goToDonePage(msg){
     for (var i = 0; i < sections.length; i++ ){
        sections[i].dataset.visibility = "hide";
        sections[(sections.length)-1].dataset.visibility = "show";
    } 
    var headerMsg = document.querySelector('h1');
    headerMsg.innerText = msg;
    finalScore.innerText = score;
}

function finishQuiz() {
    quizDone = true;
    goToDonePage("Quiz Complete 🎉");
}

function failQuiz() {
   quizDone = true;
   goToDonePage("Out of Time ⏰");
}

function startTimer() {
  timer = setInterval(function() {
    timerCount--;
    timerDisplay.textContent = timerCount;
    if (timerCount >= 0) {
      if (quizDone && timerCount > 0) {
        clearInterval(timer);
        finishQuiz();
      }
    }
    if (timerCount === 0) {
      clearInterval(timer);
      failQuiz();
    }
  }, 1000);
}