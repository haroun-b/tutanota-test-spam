class SpamDetector {

  static analyseEmails(emails) {
    const emailsWithStats = emails.map(email => this.#generateStats(email));

    // calculates how similar each email to all other emails
    for (let i = 0; i < emailsWithStats.length; i++) {
      for (let j = i + 1; j < emailsWithStats.length; j++) {
        const similarity = this.#getSimilarity(emailsWithStats[i], emailsWithStats[j]);

        emailsWithStats[i].similarityArray.push(similarity);
        emailsWithStats[j].similarityArray.push(similarity);
      }
    }

    // reduces the similarityArray to an average spamScore
    emailsWithStats.forEach(email => {
      const similarityTotal = email.similarityArray.reduce((acc, cur) => acc + cur);
      const comparisonsCount = email.similarityArray.length;

      email.spamScore = parseFloat((similarityTotal / comparisonsCount).toFixed(2));
    });

    return emailsWithStats;
  }

  // calculates similarity using Levenshtein distance
  static #getSimilarity(
    { words: wordsA, wordCount: wordCountA },
    { words: wordsB, wordCount: wordCountB }
  ) {

    if (!wordCountA || !wordCountB) return 0;

    const longerEmailLength = Math.max(wordCountA, wordCountB);

    const grid = Array(wordCountA + 1)
      .fill(0)
      .map(x => Array(wordCountB + 1));

    for (let i = 0; i <= wordCountA; i++) {
      grid[i][0] = i;
    }
    for (let j = 0; j <= wordCountB; j++) {
      grid[0][j] = j;
    }

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
    const words = email.body.match(/\w+/g);
    const wordCount = words.length;
    const uniqueWordsCount = this.#getUniqueWordsCount(words);

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
}