importScripts("./spam-detector.js");

onmessage = ({ data: emails }) => {
  const analysedEmails = SpamDetector.analyseEmails(emails);
  postMessage(analysedEmails);
};