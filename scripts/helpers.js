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
    // the hue angle starts at 100˚ which is green. then the higher the spamScore, the closer the color is to red, since the max spamScore is 100% and 0˚ is the hue angle for red
    spamScoreEl.parentNode.style.color = `hsl(${hslGreen - email.spamScore}, 100%, 35%)`;

    analysisOutput.append(statsCard);
  });
}


export { displayAnalysis };