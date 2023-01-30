const SpamDetector = require("../../public/scripts/spam-detector.js");
const exampleEmailsJson = require("../../public/scripts/emails-example.json");
const {
  allEmptyStrings,
  allNonEmptyStrings,
  someEmptyStrings,
  mixedWithoutValid,
  mixedWithSomeValidObj,
  allValidObj
} = require("./fake-emails.js");

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




  describe("when passed an array of email objects where some of them contain a body property of type string", () => {
    it.todo("should return an array of objects: {...emailObject, body: string}");
    it.todo("should add an empty string body property to email objects that don't have a body of type string");
  });

  it.todo("should return an array of objects: {body: string} when passed an array of strings");
});