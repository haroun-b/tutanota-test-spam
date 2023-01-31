const SpamDetector = require("../../public/scripts/spam-detector.js");

const {
  allEmptyStrings,
  allNonEmptyStrings,
  someEmptyStrings,
  mixedWithoutValid,
  mixedWithSomeValidObj,
  allValidObj
} = require("./unit-test-emails.js");

const analysed = {
  allEmptyStrings: SpamDetector.analyseEmails(allEmptyStrings),
  allNonEmptyStrings: SpamDetector.analyseEmails(allNonEmptyStrings),
  someEmptyStrings: SpamDetector.analyseEmails(someEmptyStrings),
  mixedWithoutValid: SpamDetector.analyseEmails(mixedWithoutValid),
  mixedWithSomeValidObj: SpamDetector.analyseEmails(mixedWithSomeValidObj),
  allValidObj: SpamDetector.analyseEmails(allValidObj)
};

describe("analyseEmails", () => {
  describe("should return null when passed anything that isn't an array", () => {
    test("when called without argument", () => {
      expect(SpamDetector.analyseEmails()).toBeNull();
    });
    test("when passed null as argument", () => {
      expect(SpamDetector.analyseEmails(null)).toBeNull();
    });
    test("when passed boolean as argument", () => {
      expect(SpamDetector.analyseEmails(true)).toBeNull();
      expect(SpamDetector.analyseEmails(false)).toBeNull();
    });
    test("when passed string as argument", () => {
      expect(SpamDetector.analyseEmails("")).toBeNull();
      expect(SpamDetector.analyseEmails("hello")).toBeNull();
    });
    test("when passed number as argument", () => {
      expect(SpamDetector.analyseEmails(0)).toBeNull();
      expect(SpamDetector.analyseEmails(42)).toBeNull();
      expect(SpamDetector.analyseEmails(-42)).toBeNull();
      expect(SpamDetector.analyseEmails(4.2)).toBeNull();
    });
    test("when passed BigInt as argument", () => {
      expect(SpamDetector.analyseEmails(BigInt(9007199254740991n))).toBeNull();
    });
    test("when passed infinity as argument", () => {
      expect(SpamDetector.analyseEmails(Infinity)).toBeNull();
      expect(SpamDetector.analyseEmails(-Infinity)).toBeNull();
    });
    test("when passed NaN as argument", () => {
      expect(SpamDetector.analyseEmails(NaN)).toBeNull();
    });
    test("when passed object as argument", () => {
      expect(SpamDetector.analyseEmails({})).toBeNull();
    });
  });

  test("should return null when passed an email set without valid emails", () => {
    expect(analysed.mixedWithoutValid).toBeNull();
  });

  test("should return an empty array when passed an empty array", () => {
    expect(SpamDetector.analyseEmails([])).toEqual([]);
  });

  describe("should return an array of the same length as the one passed as argument", () => {
    test("when passed an array of empty strings", () => {
      expect(analysed.allEmptyStrings.length).toBe(allEmptyStrings.length);
    });
    test("when passed an array of non empty strings", () => {
      expect(analysed.allNonEmptyStrings.length).toBe(allNonEmptyStrings.length);
    });
    test("when passed an array of strings where some of them are empty", () => {
      expect(analysed.someEmptyStrings.length).toBe(someEmptyStrings.length);
    });
    test("when passed an array which contains some valid objects", () => {
      expect(analysed.mixedWithSomeValidObj.length).toBe(mixedWithSomeValidObj.length);
    });
    test("when passed an array where all email objects are valid", () => {
      expect(analysed.allValidObj.length).toBe(allValidObj.length);
    });
  });

  describe("should return an array where every element is an object containing { body ,words, wordCount, uniqueWordsCount, similarityArray, spamScore } when passed a valid email set", () => {
    const generatedStatKeys = ["body", "words", "wordCount", "uniqueWordsCount", "similarityArray", "spamScore"];

    test("when passed an array of empty strings", () => {
      analysed.allEmptyStrings.every(email => {
        generatedStatKeys.every(key => expect(Object.keys(email)).toContain(key));
      });
    });
    test("when passed an array of non empty strings", () => {
      analysed.allNonEmptyStrings.every(email => {
        generatedStatKeys.every(key => expect(Object.keys(email)).toContain(key));
      });
    });
    test("when passed an array of strings where some of them are empty", () => {
      analysed.someEmptyStrings.every(email => {
        generatedStatKeys.every(key => expect(Object.keys(email)).toContain(key));
      });
    });
    test("when passed an array which contains some valid objects", () => {
      analysed.mixedWithSomeValidObj.every(email => {
        generatedStatKeys.every(key => expect(Object.keys(email)).toContain(key));
      });
    });
    test("when passed an array where all email objects are valid", () => {
      analysed.allValidObj.every(email => {
        generatedStatKeys.every(key => expect(Object.keys(email)).toContain(key));
      });
    });
  });

  test("should return an array of objects where every object's body property is identical to the element with the same index when passed an array of strings", () => {
    expect(analysed.allEmptyStrings.map(email => email.body)).toEqual(allEmptyStrings);
    expect(analysed.allNonEmptyStrings.map(email => email.body)).toEqual(allNonEmptyStrings);
    expect(analysed.someEmptyStrings.map(email => email.body)).toEqual(someEmptyStrings);
  });

  test("should not modify the original array", () => {
    const unused = require("./unit-test-emails.js");
    const used = {
      allEmptyStrings,
      allNonEmptyStrings,
      someEmptyStrings,
      mixedWithoutValid,
      mixedWithSomeValidObj,
      allValidObj
    };

    expect(used).toEqual(unused);
  });

  describe("spamScore", () => {
    test("should not consider emails with empty bodies as spam", () => {
      const analysed = SpamDetector.analyseEmails(["", "", ""]);

      analysed.every(email => {
        expect(email.spamScore).toBe(0);
      });
    });

    test("should assign a spamScore of 0 when passed emails that share no words", () => {
      const analysed = SpamDetector.analyseEmails(["Hello There", "Hi Friend", "Goodbye Buddy"]);

      analysed.every(email => {
        expect(email.spamScore).toBe(0);
      });
    });

    test("should assign a spamScore of 100 when passed identical emails", () => {
      const analysed = SpamDetector.analyseEmails(["I'm unique and original", "I'm unique and original", "I'm unique and original"]);

      analysed.every(email => {
        expect(email.spamScore).toBe(100);
      });
    });

    describe("should return an array of analysed emails with the correct spamScore based on a correct similarityArray", () => {
      const [emailA, emailB, emailC] = SpamDetector.analyseEmails(["one two three four five", "one five three four", "one two  five"]);

      test("similarityArray", () => {
        expect(emailA.similarityArray).toEqual([60, 60]);
        expect(emailB.similarityArray).toEqual([60, 25]);
        expect(emailC.similarityArray).toEqual([60, 25]);
      });
      test("spamScore", () => {
        expect(emailA.spamScore).toBe(60);
        expect(emailB.spamScore).toBe(42.5);
        expect(emailC.spamScore).toBe(42.5);
      });
    });
  });

  test("should return an array of analysed emails with the correct words array", () => {
    const [analysedEmail] = SpamDetector.analyseEmails(["How many words am I holding up?"]);

    expect(analysedEmail.words).toEqual(["How", "many", "words", "am", "I", "holding", "up"]);
  });

  describe("should return an array of analysed emails with the correct wordCount", () => {
    test("when the email body is empty", () => {
      const [analysedEmail] = SpamDetector.analyseEmails([""]);

      expect(analysedEmail.wordCount).toBe(0);
    });

    test("when the email body is not empty", () => {
      const [analysedEmail] = SpamDetector.analyseEmails(["You can count on my words to guide you"]);

      expect(analysedEmail.wordCount).toBe(9);
    });
  });
});