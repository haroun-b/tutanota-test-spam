# You've got Spam!  

A simple browser application that uses a set of emails uploaded as **json** to assign a spam probability to each of them depending on the similarity to the other emails in the set. The more similar it is to the other emails, the more likely it is spam.

This implementation uses **Levenstein distance** to compare the email bodies, and the **Web Workers API** to run the algorithm in a worker thread so as to not block the main thread.

## Documentation
See [WIKI.md](./doc/WIKI.md)

## Run the app locally
### Prerequisites
- [NodeJS](https://nodejs.org/en/download/)
- [NPM](https://docs.npmjs.com/cli/v8)
- [Git](https://git-scm.com/downloads)


### Install & Run
```bash
git clone https://github.com/haroun-b/tutanota-test-spam.git
cd tutanota-test-spam
npm install
npm start
```

### Run tests
```bash
npm run test
```

**NOTE:** Make sure the app is running locally, before running E2E tests.

## Live version
Alternatively you can check out the [live version](https://harryb.dev/tutanota-test-spam/)