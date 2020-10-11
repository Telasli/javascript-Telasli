class Profil {
    constructor(pseudo, score) {
        this.pseudo = pseudo;
        this.score = score;
    }
}

const Sondage = {
    title: "Football",
    question: [
        {questionTitle: "Qui a gagner la Ligue des Champions en 2020",
        answers: [
            {choice: "Liverpool", isRight: false},
            {choice: "Bayern Munich", isRight: true}
        ]},
        {questionTitle: "De quelle nationalité est Messi",
        answers: [
            {choice: "Portuguais", isRight: false},
            {choice: "Francais", isRight: false},
            {choice: "Espagnol", isRight: false},
            {choice: "Argentin", isRight: true}
        ]},
        {questionTitle: "Qui est l'entraineur du PSG",
        answers: [
            {choice: "Tuchel", isRight: true},
            {choice: "Klopp", isRight: false},
            {choice: "Guardiola", isRight: false}
        ]},
        {questionTitle: "Combien de fois la France a gagner la coupe du monde",
        answers: [
            {choice: "1", isRight: false},
            {choice: "2", isRight: true},
            {choice: "3", isRight: false}
        ]},
        {questionTitle: "Qui a gagner le plus de ballon d'or",
        answers: [
            {choice: "Pele", isRight: false},
            {choice: "Ronaldo", isRight: false},
            {choice: "Messi", isRight: true}
        ]},
        {questionTitle: "Ou va se jouer la prochaine ligue des champions",
        answers: [
            {choice: "Madrid", isRight: false},
            {choice: "Istanbul", isRight: true},
            {choice: "Paris", isRight: false},
            {choice: "Comphenague", isRight: false}
        ]}
    ]
}

let answerContent = document.getElementsByClassName("reponses")[0]
let container = document.getElementsByClassName("container")[0]
let answerClass = document.getElementsByClassName("reponse")
document.getElementsByClassName("questionTitle")[0].innerHTML = Sondage.title
let titre = document.getElementsByClassName("question")[0]

let question = 0;

const answerAdd = (answerArray) => {
    answerContent.innerHTML = "";
    for (j = 0; j < answerArray.length; j++) {
        let text = document.createElement("p");
        text.innerHTML = answerArray[j].choice;
        text.setAttribute("class", "reponse")
        text.setAttribute("onclick", `add(${j})`)
        answerContent.appendChild(text);
    }
}

let score = 0;
const add = (index) => {
    let reponse = Sondage.question[question].answers[index].isRight;
    if (reponse === true) {
        score += 1
    }
    question += 1;
}

let i = 1;
titre.innerHTML = Sondage.question[0].questionTitle
answerAdd(Sondage.question[0].answers)

const nextQuestion = () => {
    for (k = 0; k < answerClass.length; k++) {
        answerClass[k].addEventListener("click", () => {
            if (question < Sondage.question.length) {
                titre.innerHTML = Sondage.question[i].questionTitle;
                answerAdd(Sondage.question[i].answers)
                i++;
                nextQuestion()
            } else {
                end()
            }
        })
    }
}

const end = () => {
    container.innerHTML = "";

    let scoreFinal = Math.round((score * 100) / Sondage.question.length);

    let text = document.createElement("p");
    text.innerHTML = "Bravo, vous avez réalisé un score de : " + scoreFinal + "/100";
    text.setAttribute("class", "score");
    container.appendChild(text);

    let newDiv = document.createElement("div")
    newDiv.setAttribute("class", "selectEnd");
    let p1 = document.createElement("p");
    p1.innerHTML = "Envoyer";
    p1.setAttribute("class", "send");
    let p2 = document.createElement("p");
    p2.innerHTML = "Annuler";
    p2.setAttribute("class", "return");
    newDiv.appendChild(p1)
    newDiv.appendChild(p2)
    container.appendChild(newDiv)

    let answerSend = document.getElementById("change-js");

    document.getElementsByClassName("return")[0].addEventListener("click", () => {
        window.location.href = "sondage.html";
    });

    document.getElementsByClassName("send")[0].addEventListener("click", () => {
        answerSend.style.display = "block";
    });

    document.getElementsByClassName("close")[0].addEventListener("click", () => {
        answerSend.style.display = "none";
    })

    document.getElementsByClassName("envoyer")[0].addEventListener("click", () => {
        let pseudo = document.getElementsByClassName("pseudo")[0].value;
        sendAnswer(pseudo, scoreFinal)
    })

}

const sendAnswer = (pseudo, score) => {
    let utilisateur = new Profil(pseudo, score)
    localStorage.setItem(pseudo, JSON.stringify(utilisateur))
    alert("Votre score a été envoyé !")
    window.location.href = "sondage.html";
}

nextQuestion()