const functions = require("firebase-functions");
const admin = require('firebase-admin');
const serviceAccount = require("./firebase-credentials.json");
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

const aiConfig = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const ai = new OpenAIApi(aiConfig);

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
    const id = request.query.id;
    if (!id) {
        response.status(400).send("Espresso record id is required");
        return;
    }
    const res = await admin.firestore().collection('espresso').doc(id).get();
    console.log(res)
    response.set('Access-Control-Allow-Origin', '*');
    response.status(200).send(JSON.stringify(res.data()));
});

// reads all espresso records
exports.readEspressoRecords = functions.https.onRequest(async (request, response) => {
    const res = await admin.firestore().collection('espresso').get();
    response.set('Access-Control-Allow-Origin', '*');
    response.status(200).send(JSON.stringify(res.docs.map(doc => doc.data())));
});

// updates a specific espresso record
exports.updateEspressoRecord = functions.https.onRequest(async (request, response) => {
    const id = request.query.id;
    if (!id) {
        response.status(400).send("Espresso record id is required");
        return;
    }
    const espresso = request.body.espresso;
    if (!espresso) {
        response.status(400).send("Espresso record is required");
        return;
    }
    const res = await admin.firestore().collection('espresso').doc(id).update(espresso);
    response.set('Access-Control-Allow-Origin', '*');
    response.status(200).send(JSON.stringify("Espresso record updated"));
});

// deletes a specific espresso record
exports.deleteEspressoRecord = functions.https.onRequest(async (request, response) => {
    const id = request.query.id;
    if (!id) {
        response.status(400).send("Espresso record id is required");
        return;
    }
    const res = await admin.firestore().collection('espresso').doc(id).delete();
    response.set('Access-Control-Allow-Origin', '*');
    response.status(200).send(JSON.stringify(res.body));
});

// fetches an espresso suggestion from chat ai, based on the provided query
exports.fetchEspressoSuggestion = functions.https.onRequest(async (request, response) => {
    const espresso = request.body.espresso;
    if (!espresso) {
        response.status(400).send("Espresso is required");
        return;
    }
    const previousSuggestions = request.body.previousSuggestions;
    const previousSuggestionsMsg = previousSuggestions ? "Your previous suggestions, including the resulting tasting notes, were:" + previousSuggestions : "";
    const query = `I'm trying to dial in a ${espresso.processing} ${espresso.country} espresso. It's a ${espresso.roast} roast level. It was roasted on ${espresso.roastDate}. The tasting notes listed on the bag are ${espresso.tastingNotes}. ${previousSuggestionsMsg } Can you suggest a recipe? Please include dose, yield and time. Please format your response as such: "dose: 18g, yield: 30g, time: 25s". Do not include any additional text. Thank you.`
    const res = await ai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: 'user', content: query}],
      });
    response.set('Access-Control-Allow-Origin', '*');
    response.status(200).send(JSON.stringify(res.data.choices[0].message.content));
});

// logs in a user with email and password
exports.emailPasswordLogin = functions.https.onRequest(async (request, response) => {
    const email = request.body.email;
    const pass = request.body.pass;
    if (!email || !pass) {
        response.status(400).send("Email and password are required");
        return;
    }
    await admin.auth().signInWithEmailAndPassword(email, pass);
    response.set('Access-Control-Allow-Origin', '*');
    response.status(200).send(JSON.stringify("Successfully logged in"));
});

// logs out a user
exports.logout = functions.https.onRequest(async (request, response) => {
    await admin.auth().signOut();
    response.set('Access-Control-Allow-Origin', '*');
    response.status(200).send(JSON.stringify("Successfully logged out"));
});

// sends a password reset email to the provided email address
exports.resetPassword = functions.https.onRequest(async (request, response) => {
    const email = request.body.email;
    if (!email) {
        response.status(400).send("Email is required");
        return;
    }
    await admin.auth().sendPasswordResetEmail(email);
    response.set('Access-Control-Allow-Origin', '*');
    response.status(200).send(JSON.stringify("Password reset email sent"));
});