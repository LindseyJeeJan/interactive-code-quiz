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
function renderScores() {
    // Clear score list
    scoresList.innerHTML = "";
   
      // Create a new list item for each score
    for (var i = 0; i < scores.length; i++) {
        var score = scores[i];
        var newLi = document.createElement("li");
        newLi.textContent = score;
        scoresList.appendChild(newLi);
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
    renderScores();
});

// When the user clicks the Start button, begin the quiz
btnStart.addEventListener("click", function(event){
   startQuiz();
});

// When the user clicks the Go Back button, return to the initial view/start
btnBack.addEventListener("click", function(event){
     gotoSection(0);
     currSection = 0;
});

// When the user clicks the Clear button, clear High Scores
btnClear.addEventListener("click", function(event){
    //empty the DOM ul list
    scoresList.innerHTML = "";
    // empty the array
    scores = [];
    // push empty array to storage
    localStorage.setItem("scores", JSON.stringify(scores));
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
    }
    var userRecord = (`${userInitials} – ${score}`); 
    scores.push(userRecord);

    // Store the scores in local storage
    localStorage.setItem("scores", JSON.stringify(scores));

    // print the scores to the screen
    renderScores();   
    
    // Go to the scoreboard
    gotoSection((sections.length)-1);
    
    //  Reset the form
    var form = document.querySelector(".submit-initials");

   
});

// When user hits start button, start the timer and the quiz
function startQuiz() {
    timerCount = 70;
    timerDisplay.textContent = timerCount;
    startTimer();
    gotoSection(1);
}

// When quiz is over, either due to time running out or user completing it
function goToDonePage(msg){
    headerMsg.textContent = msg;
    finalScore.textContent = score;
    resetTimer();
}

// User completes quiz
function finishQuiz() {
    quizDone = true;
    goToDonePage("Quiz Complete 🎉");
}

// Time has run out
function failQuiz() {
   quizDone = true;
   gotoSection((sections.length)-2);
   goToDonePage("Out of Time ⏰");
}

function resetTimer(){
    timerCount = 0;
    timerDisplay.textContent = timerCount;
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

// Reset the timer
function init() {
    resetTimer();

    // get scores from local storage
   var storedScores = JSON.parse(localStorage.getItem("scores"));

   // add scores from storage to the array
    if (storedScores !== null){
        scores = storedScores;
    }
    // write the scores to the list on the high scores page
    renderScores();
}

init();