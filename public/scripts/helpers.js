function displayAnalysis({ analysedEmails, analysisOutput, template }) {
  analysisOutput.innerHTML = null;

  analysedEmails.forEach(email => {
    const statsCard = template.content.cloneNode(true);
    const spamScoreEl = statsCard.querySelector(".spam-score");
    const hslGreen = 100;

    statsCard.querySelector(".title").textContent = email.title || "Unknown";
    statsCard.querySelector(".recipiant").textContent = email.recipiant || "Unknown";
    statsCard.querySelector(".word-count").textContent = email.wordCount;
    statsCard.querySelector(".unique-words-count").textContent = email.uniqueWordsCount;

    spamScoreEl.textContent = email.spamScore;
    spamScoreEl.parentNode.style.color = `hsl(${hslGreen - email.spamScore}, 100%, 35%)`;

    analysisOutput.append(statsCard);
  });
}


function getAnalysisFromWorker({ emails, worker }) {
  const validEmails = validateEmails(emails);

  worker.postMessage(validEmails);
}


function validateEmails(emails) {
  const emailsIsArray = Array.isArray(emails);
  const emailsIsAllStrings = emailsIsArray && emails.every(email => typeof email === "string");
  const someEmailsAreValid = emailsIsArray && emails.some(email => typeof email.body === "string");

  if (
    !emailsIsArray ||
    (!emailsIsAllStrings && !someEmailsAreValid)
  ) {
    alert("Please provide a json that follows the recommonded structure");
    throw Error("Invalid input");
  }

  if (emailsIsAllStrings) {
    return emails.map(email => {
      email = { body: email };
      return email;
    });
  }

  if (someEmailsAreValid) {
    return emails.map(email => {
      const bodyIsValid = typeof email.body === "string";
      if (!bodyIsValid) email.body = "";
      return email;
    });
  }
}


export { displayAnalysis, getAnalysisFromWorker };