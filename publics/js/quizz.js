if (localStorage.getItem('challenge-48h-star-wars-groupe-2') == undefined) {
    localStorage.setItem('challenge-48h-star-wars-groupe-2', JSON.stringify([{
            name_quizz: "general",
            "score": 0,
            "question": 0
        },
        {
            name_quizz: "people",
            "score": 0,
            "question": 0
        },
        {
            name_quizz: "film",
            "score": 0,
            "question": 0
        },
        {
            name_quizz: "planet",
            "score": 0,
            "question": 0
        }
    ]));
}

function send() {
    const a = document.getElementById('a');
    const b = document.getElementById('b');
    const c = document.getElementById('c');
    const d = document.getElementById('d');
    if (a.checked || b.checked || c.checked || d.checked) {
        const good = document.getElementById('form').dataset.good;
        const url = document.location.href;
        const type = url.split('/')[url.split('/').length - 1];
        let lastQuizzs = JSON.parse(localStorage.getItem('challenge-48h-star-wars-groupe-2'));
        let newQuizzs = [];
        let nbrQuestions;
        if ((a.checked && a.value == good) || (b.checked && b.value == good) || (c.checked && c.value == good) || (d.checked && d.value == good)) {
            for (let quizz of lastQuizzs) {
                if (type == quizz.name_quizz) {
                    quizz.score++;
                    quizz.question++;
                    nbrQuestions = quizz.question;
                }
                newQuizzs.push(quizz);
            }
        } else {
            for (let quizz of lastQuizzs) {
                if (type == quizz.name_quizz) {
                    quizz.question++;
                    nbrQuestions = quizz.question;
                }
                newQuizzs.push(quizz);
            }
        }
        localStorage.removeItem('challenge-48h-star-wars-groupe-2');
        localStorage.setItem('challenge-48h-star-wars-groupe-2', JSON.stringify(newQuizzs));
        if (nbrQuestions < 10) {
            window.location.href = "/quizz/" + type;
        } else {
            window.location.href = "/quizz/result";
        }
    }
}