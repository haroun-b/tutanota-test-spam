class SpamDetector {
  static analyseEmails(emails) {
    const validEmails = this.#validateEmails(emails);
    if (!validEmails) return null;

    const emailsWithStats = validEmails.map(email => this.#generateStats(email));

    // calculates how similar each email is to all other emails
    for (let i = 0; i < emailsWithStats.length; i++) {
      for (let j = i + 1; j < emailsWithStats.length; j++) {
        const similarity = this.#getSimilarity(emailsWithStats[i], emailsWithStats[j]);

        emailsWithStats[i].similarityArray.push(similarity);
        emailsWithStats[j].similarityArray.push(similarity);
      }
    }

    // reduces the similarityArray to an average spamScore
    emailsWithStats.forEach(email => {
      // to account for when there's only one email in the set, reduce uses 0 as an initial value and the comparisonsCount is set to 1 when the similarityArray is empty
      const similarityTotal = email.similarityArray.reduce((acc, cur) => acc + cur, 0);
      const comparisonsCount = email.similarityArray.length || 1;

      email.spamScore = parseFloat((similarityTotal / comparisonsCount).toFixed(2));
    });

    return emailsWithStats;
  }

  // calculates similarity using Levenshtein distance on words
  // with ((levenshteinDistance / longerEmailWordCount) * 100) as the difference between two emails in percent, (100 - diff) is the similarity
  static #getSimilarity(
    { words: wordsA, wordCount: wordCountA },
    { words: wordsB, wordCount: wordCountB }
  ) {

    // similarity is 0% if any of the emails is empty. doesn't consider empty emails as spam
    if (!wordCountA || !wordCountB) return 0;

    const longerEmailLength = Math.max(wordCountA, wordCountB);

    // creates an empty (wordCountA + 1) x (wordCountB + 1) grid
    const grid = Array(wordCountA + 1)
      .fill(0)
      .map(x => Array(wordCountB + 1));

    // initializes the first row and column of the grid
    for (let i = 0; i <= wordCountA; i++) {
      grid[i][0] = i;
    }
    for (let j = 0; j <= wordCountB; j++) {
      grid[0][j] = j;
    }

    // uses the grid for the Levenshtein distance calculation. the last cell contains the distance in words
    for (let i = 1; i <= wordCountA; i++) {
      for (let j = 1; j <= wordCountB; j++) {
        if (wordsA[i - 1] === wordsB[j - 1]) grid[i][j] = grid[i - 1][j - 1];
        else grid[i][j] = 1 + Math.min(grid[i - 1][j - 1], grid[i - 1][j], grid[i][j - 1]);
      }
    }

    const diffPercent = parseFloat((grid[wordCountA][wordCountB] / longerEmailLength * 100).toFixed(2));

    return 100 - diffPercent;
  }

  static #generateStats(email) {
    const words = email.body.match(/\w+/g) || [];
    const wordCount = words.length;
    const uniqueWordsCount = this.#getUniqueWordsCount(words);

    // the similarityArray will hold the email's comparisons with others in its set
    return { ...email, words, wordCount, uniqueWordsCount, similarityArray: [] };
  }

  static #getUniqueWordsCount(words) {
    const uniqueWordsCount = {};

    words.forEach(word => {
      if (!uniqueWordsCount[word]) {
        uniqueWordsCount[word] = 1;
      }
    });

    return Object.keys(uniqueWordsCount).length;
  }

  static #validateEmails(emails) {
    const emailsIsArray = Array.isArray(emails);
    const emailsIsAllStrings = emailsIsArray && emails.every(email => typeof email === "string");
    const someEmailsAreValid = emailsIsArray && emails.some(email => typeof email?.body === "string");

    if (!emailsIsAllStrings && !someEmailsAreValid) return null;

    if (emailsIsAllStrings) {
      return emails.map(email => ({ body: email }));
    }

    if (someEmailsAreValid) {
      return emails.map(email => {
        const bodyIsValid = typeof email?.body === "string";
        // overwrites body when invalid
        if (!bodyIsValid) email = { ...email, body: "" };
        return email;
      });
    }
  }
}


// only exports SpamDetector when testing in node, since otherwise SpamDetector is imported using importScripts in worker.js
if (typeof process !== "undefined" && process.env.NODE_ENV === "testing") {
  module.exports = SpamDetector;
}