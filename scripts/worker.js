importScripts("./spam-detector.js");

onmessage = ({ data: validEmails }) => {
  const analysedEmails = SpamDetector.analyseEmails(validEmails);
  postMessage(analysedEmails);
};