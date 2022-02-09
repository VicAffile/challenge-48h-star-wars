let quizzs = JSON.parse(localStorage.getItem('challenge-48h-star-wars-groupe-2'));

for (let i = 0; i < 4; i++) {
    if (quizzs[i].question == 10) {
        document.getElementById('score').innerText = "You did " + quizzs[i].score + " / 10";
        console.log(document.getElementById('score').innerText)
        quizzs[i].score = 0;
        quizzs[i].question = 0;
        localStorage.removeItem('challenge-48h-star-wars-groupe-2');
        localStorage.setItem('challenge-48h-star-wars-groupe-2', JSON.stringify(quizzs));
    }
}