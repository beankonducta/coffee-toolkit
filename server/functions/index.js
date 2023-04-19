var functions = require("firebase-functions");
var admin = require('firebase-admin');
var serviceAccount = require("./firebase-credentials.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// creates a new espresso record
exports.createEspressoRecord = functions.https.onRequest(async (request, response) => {
    const espresso = request.body.espresso;
    if (!espresso) { 
        response.status(400).send("Espresso record is required"); 
        return; 
    }
    // should make sure espresso is valid here
    await admin.firestore().collection('espresso').add(espresso);
    response.set('Access-Control-Allow-Origin', '*');
    response.status(200).send(JSON.stringify("Espresso record created"));
});

// reads a specific espresso record
exports.readEspressoRecord = functions.https.onRequest(async (request, response) => {
    const res = { body: "" }
    response.set('Access-Control-Allow-Origin', '*');
    response.status(200).send(JSON.stringify(res.body));
});

// reads all espresso records
exports.readEspressoRecords = functions.https.onRequest(async (request, response) => {
    const res = { body: "" }
    response.set('Access-Control-Allow-Origin', '*');
    response.status(200).send(JSON.stringify(res.body));
});

// updates a specific espresso record
exports.updateEspressoRecord = functions.https.onRequest(async (request, response) => {
    const res = { body: "" }
    response.set('Access-Control-Allow-Origin', '*');
    response.status(200).send(JSON.stringify(res.body));
});

// deletes a specific espresso record
exports.deleteEspressoRecord = functions.https.onRequest(async (request, response) => {
    const res = { body: "" }
    response.set('Access-Control-Allow-Origin', '*');
    response.status(200).send(JSON.stringify(res.body));
});

// fetches an espresso suggestion from chat ai, based on the provided query
exports.fetchChatAiEspressoSuggestion = functions.https.onRequest(async (request, response) => {
    const res = { body: "" }
    response.set('Access-Control-Allow-Origin', '*');
    response.status(200).send(JSON.stringify(res.body));
});

// logs in a user with email and password
exports.emailPasswordLogin = functions.https.onRequest(async (request, response) => {
    const res = { body: "" }
    response.set('Access-Control-Allow-Origin', '*');
    response.status(200).send(JSON.stringify(res.body));
});

// logs in a user with google
exports.googleLogin = functions.https.onRequest(async (request, response) => {
    const res = { body: "" }
    response.set('Access-Control-Allow-Origin', '*');
    response.status(200).send(JSON.stringify(res.body));
});

// logs out a user
exports.logout = functions.https.onRequest(async (request, response) => {
    const res = { body: "" }
    response.set('Access-Control-Allow-Origin', '*');
    response.status(200).send(JSON.stringify(res.body));
});