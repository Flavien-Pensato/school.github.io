const test = require('firebase-functions-test')();

adminInitStub = sinon.stub(admin, 'initializeApp');
// Now we can require index.js and save the exports inside a namespace called myFunctions.
myFunctions = require('../src/functions/index');
