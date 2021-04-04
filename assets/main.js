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

// Get the scores from local storage
function printScores() {
   var getScores = JSON.parse(localStorage.getItem("score"));
   if (score !== null){
       addScore(score);
   }
}

// Handle the quiz , showing the response, tallying the score and progressing the section
quizSections.addEventListener("click", function(event){
   var elementClicked = event.target;

   // Disable the non-selected buttons
   if (elementClicked.matches("button")){
       var allButtons = document.querySelectorAll("button");
        for (var i = 0; i < allButtons.length; i++) {
            // Add arrow after to point out correct answer
            if ((allButtons[i]).classList.contains("correct")){
                 allButtons[i].classList.add("correct-display");
            }
            if (allButtons[i] != elementClicked){
                 allButtons[i].disabled = true;
            }
        }
       // show the feedback on the item they choose
        if (elementClicked.classList.contains("correct")){
            score++;
            questionRightFeedback.setAttribute("style", "display: block;");
        } else {
            questionWrongFeedback.setAttribute("style", "display: block;");
        }
        // allow the feedback to show for a bit before hiding the feedback, enabling the buttons, and navigating the screen
        setTimeout(function() {
            for (var i = 0; i < allButtons.length; i++) {
                // hide arrow that points out correct answer
                 if ((allButtons[i]).classList.contains("correct-display")){
                     allButtons[i].classList.remove("correct-display");
                 }
                //  enable buttons again
                allButtons[i].disabled = false;

            }
            currSection ++;
            gotoSection(currSection);
            // hide feedback again
            questionRightFeedback.setAttribute("style", "display: none;");
            questionWrongFeedback.setAttribute("style", "display: none;");    
        },900);
        
   }
    

});

// Retrieves the buttons on the screen for the current quiz question
function scoreSelection() {
    var pageButtons = document.querySelectorAll("sections[currSection] > buttons");
}

// Jump to a "page"
function gotoSection(sectionNum){
    for (var i = 0; i < sections.length; i++ ){
        // hide the questions except the current one
        sections[i].dataset.visibility = "hide";
        sections[sectionNum].dataset.visibility = "show";
    }  
    currSection = sectionNum;
    // mark the end of the quiz
    if (currSection == ((sections.length)-2)){
        quizDone = true;
    }
}

// When the user clicks the View High Scores link, navigate to the scoreboard
scoresLink.addEventListener("click", function(event){
    gotoSection((sections.length)-1);
    printScores();
});

// When the user clicks the Start button, begin the quiz
btnStart.addEventListener("click", function(event){
   startQuiz();
});

// When the user clicks the Go Back button, return to the initial view/start
btnBack.addEventListener("click", function(event){
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
    userInitials = initials.value.trim();

    // return error if initials empty, use example from class
    if (userInitials === "") {
        errorMessage.setAttribute("style", "display: block;");
        return;
    } else {
        // Go to the scoreboard
        gotoSection((sections.length)-1);
        // Write initials and score to the scoreboard
    // addScore(score);
    
        //  Reset the form
        var form = document.querySelector(".submit-initials");
        form.reset();

        // Store the scores in local storage
        localStorage.setItem("score", JSON.stringify(score));
        printScores();   
    }
   
});

// Create a new entry for the High Scores page
function addScore(score){
    var newLi = document.createElement("li");
    newLi.innerHTML = `${userInitials} – ${score} / 5`;
    scoresList.appendChild(newLi);
}

// When user hits start button, start the timer and the quiz
function startQuiz() {
    init();
    startTimer();
    currSection ++;
    gotoSection(currSection);
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

// clear out the quiz and reset the timer
function init() {
    timerCount = 70;
    timerDisplay.textContent = timerCount;
    scoreSelection();
}

init();