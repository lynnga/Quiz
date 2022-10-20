const startBtn = document.querySelector('#start-btn');
const timerDiv = document.querySelector('#timer');
const timeSpan = document.querySelector('#time'); 
const questionsDiv = document.querySelector('#questions');
const highScoresDiv = document.querySelector('#high-scores');


const questions = [
    {
        text: "Inside which HTML element do we put the JavaScript?",
        choices: ["<script>", "<scripting>", "<js>", "<javascript>"],
        answer: "<script>"
    },
    {
        text: "What is mean by “this” keyword in javascript?",
        choices: [  "It referes previous object","It refers current object", "It is variable which contains value", "none of the above"],
        answer: "It refers current object"
    },
    {
        text: "The _______ method of an Array object adds and/or removes elements from an array.",
        choices: [" Reverse", "Shift", " Slice", " Splice"],
        answer: " Splice"
    }
];

console.log(questions.length);

let questionIndex = 0;
let time = 60;
let quizTimer;

const startQuiz = () => {
    highScoresDiv.innerHTML = ''
    startBtn.style.display = 'none';
    timeSpan.textContent = time;
    quizTimer = setInterval(function() {
        time--
        timeSpan.textContent = time;
        if (time === 0) {
            endQuiz();
        }
    }, 1000);

    displayQuestion();

};

const displayQuestion = () => {
    questionsDiv.innerHTML = '';
    const questionText = questions[questionIndex].text;
    const questionAns = questions[questionIndex].answer;
    const questionTextDiv = document.createElement('div');
    questionTextDiv.innerText = questionText;
    questionsDiv.append(questionTextDiv);

    const questionChoices = questions[questionIndex].choices;
    questionChoices.forEach(choice => {
        const questionBtn = document.createElement('button');
        questionBtn.textContent = choice;
        questionsDiv.append(questionBtn);

        questionBtn.addEventListener('click', function(event){
          handleAns(event.target.innerText, questionAns)
        })
    });
    
};

const handleAns = (currentAnswer, correctAnswer) => {
    console.log(currentAnswer, correctAnswer)
    if (currentAnswer !== correctAnswer) {
        console.log(time)
        time -= 5; 
        console.log('after ' + time)
    }
    if (questionIndex >= questions.length - 1) {
        endQuiz();
        return;
    }
    questionIndex++;
    displayQuestion();
};

const endQuiz = () => {
    clearInterval(quizTimer);
    timeSpan.textContent = time;
    questionsDiv.innerHTML = '';

    const intials = prompt(`Game Over! \nYour score was ${time}  \nEnter your initials`);
    const scores = localStorage.getItem('scores');
    if (scores) {
        const scoresArr = JSON.parse(scores);
        scoresArr.push(intials + ": " + time);
        console.log(scoresArr)
        localStorage.setItem('scores', JSON.stringify(scoresArr));
    } else {
       const scoresArr = [];
       scoresArr.push(intials + ": " + time);
       console.log(scoresArr)
       localStorage.setItem('scores', JSON.stringify(scoresArr));
    }

    questionIndex = 0;
    time = 60;

    const scoresArr = JSON.parse(scores);
    const highScoresTitle = document.createElement('h3');
    highScoresTitle.innerText = 'High Scores:'
    highScoresDiv.append(highScoresTitle)
    scoresArr.forEach(score => {
        const newScoreDiv = document.createElement('div')
        newScoreDiv.innerText = score;
        highScoresDiv.append(newScoreDiv);
    })

    startBtn.style.display = 'inline';

};


startBtn.addEventListener('click', startQuiz);