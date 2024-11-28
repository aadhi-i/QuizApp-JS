const questions = [
    {
        question: "What is Git?",
        answers:[
            {text: "A web-based hosting service for version control using Git",correct: false},
            {text: "A distributed version control system for tracking changes in source code",correct: true},
            {text: "A type of operating system",correct: false},
            {text: "A web development framework",correct: false}
        ]
    },
    {
        question: "Which command is used to initialize a new Git repository?",
        answers:[
            {text: "git start",correct: false},
            {text: "git init",correct: true},
            {text: "git new",correct: false},
            {text: "git create",correct: false}
        ]
    },
    {
        question: "What is a commit in Git?",
        answers:[
            {text: "A place to store backup files",correct: false},
            {text: "A way to share files between users",correct: false},
            {text: "A snapshot of changes in the repository",correct: true},
            {text: "A method to delete files permanently",correct: false},
        ]
    },
    {
        question: "What is GitHub?",
        answers:[
            {text: "A web-based platform for version control and collaboration using Git",correct: true},
            {text: "A text editor for coding",correct: false},
            {text: "A cloud storage service for documents",correct: false},
            {text: "A programming language",correct: false}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let  score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion(){
    resetSate();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo =currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". "+ currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetSate(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }button.disabled = "true";
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetSate();
    questionElement.innerHTML = `You got ${score} out of ${questions.length} correctly!`;
    nextButton.innerHTML = "Start Again";
    nextButton.style.display = "block"
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();