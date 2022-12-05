import { getAnalysisFromWorker, displayAnalysis } from "./helpers.js";
const worker = new Worker("./scripts/worker.js");

const exampleJsonName = "emails-example.json";
// because "assert {type: 'json'}" isn't yet widely adopted
const exampleJsonFile = await (await fetch(`./scripts/${exampleJsonName}`)).json();

const reader = new FileReader();
const form = document.querySelector("form");
const emailsInput = document.querySelector("[name='emails']");
const analysisOutput = document.querySelector("#analysis");
const template = document.querySelector("template");
const loadingScreen = document.querySelector("#loading-screen");



form.addEventListener("submit", async e => {
  e.preventDefault();
  loadingScreen.classList.remove("hidden");

  if (!emailsInput.files[0]) {
    // ===================================
    // a workaround to display the example file's name in the input
    // credit goes to: Rik Schennink - "https://pqina.nl/blog/set-value-to-file-input/"
    const placeholderFile = new File([], exampleJsonName, {
      type: 'application/json',
      lastModified: new Date(),
    });

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(placeholderFile);
    emailsInput.files = dataTransfer.files;

    // so it works on safari
    if (emailsInput.webkitEntries.length) {
      emailsInput.dataset.file = `${dataTransfer.files[0].name}`;
    }
    // ===================================
  }

  const emailsJson = emailsInput.files[0];
  const emailsJsonIsExample = emailsJson?.name === exampleJsonName && emailsJson.size === 0;

  if (emailsJsonIsExample) return getAnalysisFromWorker({ emails: exampleJsonFile, worker, loadingScreen });


  reader.readAsText(emailsJson);
});


reader.addEventListener("load", ({ target: { result } }) => {
  const emails = JSON.parse(result);

  getAnalysisFromWorker({ emails, worker, loadingScreen });
});

worker.onmessage = ({ data: analysedEmails }) => {
  displayAnalysis({ analysedEmails, analysisOutput, template });
  loadingScreen.classList.add("hidden");
};