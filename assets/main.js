var timerDisplay = document.querySelector("#timer");
var scoresLink = document.querySelector("#score-link");
var btnStart = document.querySelector("#btn-start");
var btnBack = document.querySelector("#btn-back");
var btnClear = document.querySelector("#btn-clear");
var initials = document.querySelector("#initials-input");
var btnSubmit = document.querySelector("#btn-submit");
var errorMessage = document.querySelector("#error-message");
var finalScore = document.querySelector(".final-score");
var scoresList = document.querySelector("#scores-list");
var sections = document.querySelectorAll("section");
var quizSections = document.querySelector("div.quiz-section");
var questionRightFeedback = document.querySelector("#feedback-correct"); 
var questionWrongFeedback = document.querySelector("#feedback-wrong"); 
var headerMsg = document.querySelector('.quiz-over-header');

var timerCount = 70;
var quizDone = false;
var score = 0;
var userInitials = "";
var currSection = 0;
var scores = [];

function printScores() {
   
}
// Store the scores in local storage

// return error if initials empty, use example from class

// Handle the quiz , showing the response, tallying the score and progressing the section
quizSections.addEventListener("click", function(event){
   var elementClicked = event.target;
   if (elementClicked.matches("button")){
       var allButtons = document.querySelectorAll("button");
        for (var i = 0; i < allButtons.length; i++) {
            if (allButtons[i] != elementClicked){
            allButtons[i].disabled = true;
            }
        }
       
        if (elementClicked.classList.contains("correct")){
            score++;
            questionRightFeedback.setAttribute("style", "display: block;");
        } else {
            questionWrongFeedback.setAttribute("style", "display: block;");
        }
        
        setTimeout(function() {
            for (var i = 0; i < allButtons.length; i++) {
                allButtons[i].disabled = false;
            }
            currSection ++;
            gotoSection(currSection);
            questionRightFeedback.setAttribute("style", "display: none;");
            questionWrongFeedback.setAttribute("style", "display: none;");    
        },900);
        
   }
    

});

function scoreSelection() {
    var pageButtons = document.querySelectorAll("sections[currSection] > buttons");
}

// Jump to a "page"
function gotoSection(sectionNum){
    for (var i = 0; i < sections.length; i++ ){
        sections[i].dataset.visibility = "hide";
        sections[sectionNum].dataset.visibility = "show";
    }  
    currSection = sectionNum;
    if (currSection == ((sections.length)-2)){
        quizDone = true;
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
     init();
});

// When the user clicks the Clear button, clear High Schores
btnClear.addEventListener("click", function(event){
    scoresList.innerHTML = "";
});

// When the user clicks the Submit button, display High Scores
btnSubmit.addEventListener("click", function(event){
    event.preventDefault();
    // Get initials from field
    userInitials = initials.value;
     // Go to the scoreboard
    gotoSection((sections.length)-1);
    // Write initials and score to the scoreboard
    addScore(score);
    //  Reset the form
    var form = document.querySelector(".submit-initials");
    form.reset();
   
});

function addScore(score){
    var newLi = document.createElement("li");
    newLi.innerHTML = `${userInitials} – ${score} / 5`;
    scoresList.appendChild(newLi);
}

// When user hits start button
function startQuiz() {
    init();
    startTimer();
    currSection ++;
    gotoSection(currSection);
    scoreSelection();
}

// When quiz is over, either due to time running out or user completing it
function goToDonePage(msg){
    gotoSection((sections.length)-2);
    headerMsg.textContent = msg;
    finalScore.textContent = score;
}

// User completes quiz
function finishQuiz() {
    quizDone = true;
    goToDonePage("Quiz Complete 🎉");
}

// Time has run out
function failQuiz() {
   quizDone = true;
   goToDonePage("Out of Time ⏰");
   timer = 0;
}

// Timer function
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


function init() {
    timerCount = 70;
    timerDisplay.textContent = timerCount;
}
init();