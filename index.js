class Qustion {
    questionId;
    questionText;
    constructor(questionId, questionText) {
        this.questionId = questionId;
        this.questionText = questionText;
    }
}
class Option {
    optionText;
    constructor(optionText) {
        this.optionText = optionText;
    }
}
class QuestionAnswerCombination {
    question;
    correctAnswer;
    options;
    constructor(question, correctAnswer, options) {
        this.question = question;
        this.correctAnswer = correctAnswer;
        this.options = options;
    }
}



// creating the questions1 
let qeustion1 = new Qustion(1, "JavaScript supports");
let q1Option1 = new Option("Functions");
let q1Option2 = new Option("XHTML");
let q1Option3 = new Option("CSS");
let q1Option4 = new Option("HTML");

let correctAnswer1 = q1Option1;

let questionAnswerCombination1 = new QuestionAnswerCombination(qeustion1, correctAnswer1, [q1Option1, q1Option2, q1Option3, q1Option4]);

// creating the questions2 
let qeustion2 = new Qustion(2, "Which is not a JavaScript Framework?");
let q2Option1 = new Option("Python Script");
let q2Option2 = new Option("JQuery");
let q2Option3 = new Option("Django");
let q2Option4 = new Option("Node js");

let correctAnswer2 = q2Option3;

let questionAnswerCombination2 = new QuestionAnswerCombination(qeustion2, correctAnswer2, [q2Option1, q2Option2, q2Option3, q2Option4]);

// creating the questions3 
let qeustion3 = new Qustion(3, "Which language is use for styling the webpage?");
let q3Option1 = new Option("HTML");
let q3Option2 = new Option("JQuery");
let q3Option3 = new Option("CSS");
let q3Option4 = new Option("XML");

let correctAnswer3 = q3Option3;

let questionAnswerCombination3 = new QuestionAnswerCombination(qeustion3, correctAnswer3, [q3Option1, q3Option2, q3Option3, q3Option4]);

// creating the questions4 
let qeustion4 = new Qustion(1, "Which is used to connect to a database?");
let q4Option1 = new Option("PHP");
let q4Option2 = new Option("HTML");
let q4Option3 = new Option("JS");
let q4Option4 = new Option("ALL");

let correctAnswer4 = q4Option4;

let questionAnswerCombination4 = new QuestionAnswerCombination(qeustion4, correctAnswer4, [q4Option1, q4Option2, q4Option3, q4Option4]);

// creating the questions5
let qeustion5 = new Qustion(1, "JavaScript is a");
let q5Option1 = new Option("Language");
let q5Option2 = new Option("Programming Language");
let q5Option3 = new Option("Development");
let q5Option4 = new Option("All");

let correctAnswer5 = q5Option1;

let questionAnswerCombination5 = new QuestionAnswerCombination(qeustion5, correctAnswer5, [q5Option1, q5Option2, q5Option3, q5Option4]);

//  class quiz app
class QuizApp {
    pageIndex;
    questionAnswerCombinations;
    score;

    constructor(questionAnswerCombinations) {
        this.pageIndex = 0;
        this.score = 0;
        this.questionAnswerCombinations = questionAnswerCombinations;
    }

    isLastQuestion() {
        return this.pageIndex == this.questionAnswerCombinations.length - 1;
    }

    getScore() {
        return this.score;
    }

    incrementScore() {
        this.score++;
    }

    calculatePercentage() {
        if (this.questionAnswerCombinations?.length > 0)
            return (this.score / this.questionAnswerCombinations?.length) * 100;
        else return 0;
    }

    showQuestion(qaCombination) {
        let text = qaCombination.question.questionText;
        let question = document.getElementById("question")
        question.innerText = text

        let buttons = document.querySelectorAll(".button");
        buttons.forEach((btn, idx) => {
            btn.firstChild.innerText = qaCombination.options[idx].optionText;
        })
        this.updateFooter();
    }

    updateFooter() {
        let footer = document.getElementById("progress");
        footer.innerText = `Question ${this.pageIndex + 1} of ${this.questionAnswerCombinations?.length}`
    }

    isCorrectAnswer(userAnswer) {
        return this.questionAnswerCombinations[this.pageIndex].correctAnswer.optionText == userAnswer;
    }

    eventListner() {
        let buttons = document.querySelectorAll(".button");
        let quizAppObj = this;
        buttons.forEach(btn => {
            btn.onclick = function () {
                let userAnswer = this.innerText;
                if (quizAppObj.isCorrectAnswer(userAnswer)) {
                    quizAppObj.incrementScore();
                }
                quizAppObj.changeQuestion()
            }
        })
    }

    changeQuestion() {
        if (this.isLastQuestion()) {
            this.showResult();
        } else {
            this.pageIndex++;
            this.showQuestion(this.questionAnswerCombinations[this.pageIndex]);
        }
    }

    showResult() {
        let quiz = document.getElementById("quiz")
        let content = `
            <h1>Result</h1>
            <h2 id="score"> Your scores: ${this.getScore()} . Percentage: ${this.calculatePercentage()} %.</h2>
        `
        quiz.innerHTML = content;
    }

    loadPage() {
        this.showQuestion(this.questionAnswerCombinations[this.pageIndex]);
        this.eventListner();
    }
}

let newQuizApp = new QuizApp([questionAnswerCombination1, questionAnswerCombination2, questionAnswerCombination3, questionAnswerCombination4, questionAnswerCombination5])
newQuizApp.loadPage();