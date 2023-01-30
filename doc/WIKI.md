## Flow Chart
![Flow Chart](./flow-chart.svg)

## Basic structure
- [`tests/`](../tests): Contains all the tests. [`jest/`](../tests/jest) for unit tests and [`cypress/`](../tests/cypress) for E2E
- [`public/`](../public): Actual app's code
- [`index.js`](../index.js): Runs the `express` server which servers the app locally
- [``]():

## Module structure
![Module structure](./module-structure.svg)

## Code structure
All the scripts are in the [`scripts/`](../public/scripts/) directory

### [`main.js`](../public/scripts/main.js)
Contains the main thread code and is responsible for updating the UI.
- On form submit: posts the emails uploaded by the user (or the example emails: [`emails-example.json`](../public/scripts/emails-example.json), if the user didn't upload any) to the worker to be analysed.
- On worker message: it renders the analysis result on the page, if there is one. Otherwise it alerts the user that there's been an issue and logs the error to the console.

### [`helper.js`](../public/scripts/helper.js)
#### `displayAnalysis`
Takes as arguments:
- analysedEmails: the analysed emails returned from the worker
- analysisOutput: the HTML element which will contain the result of the analysis
- template: a template HTML element to be used to create each email analysis card

### [`worker.js`](../public/scripts/worker.js)


### [`spam-detector.js`](../public/scripts/spam-detector.js)
#### `analyseEmails`
#### `getSimilarity`
#### `generateStats`
#### `getUniqueWordsCount`
#### `validateEmails`