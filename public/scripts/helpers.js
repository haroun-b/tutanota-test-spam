function displayAnalysis({ analysedEmails, analysisOutput, template }) {
  analysisOutput.innerHTML = null;

  analysedEmails.forEach(email => {
    const statsCard = template.content.cloneNode(true);
    const spamScoreEl = statsCard.querySelector(".spam-score");
    const hslGreen = 100;

    statsCard.querySelector(".title").textContent = email.title || "Unknown";
    statsCard.querySelector(".recipient").textContent = email.recipient || "Unknown";
    statsCard.querySelector(".word-count").textContent = email.wordCount;
    statsCard.querySelector(".unique-words-count").textContent = email.uniqueWordsCount;

    spamScoreEl.textContent = email.spamScore;
    spamScoreEl.parentNode.style.color = `hsl(${hslGreen - email.spamScore}, 100%, 35%)`;

    analysisOutput.append(statsCard);
  });
}


export { displayAnalysis };