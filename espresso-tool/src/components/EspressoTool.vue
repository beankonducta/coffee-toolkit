<template>
  <div>
    <div class="espresso">
      <div class="user-input-right">
        <h2>Coffee Info</h2>
        <label>Country</label>
        <input type="text" v-model="coffeeInfo.country" />
        <label>Region</label>
        <input type="text" v-model="coffeeInfo.region" />
        <label>Processing</label>
        <input type="text" v-model="coffeeInfo.processing" />
        <label>Altitude</label>
        <input type="text" v-model="coffeeInfo.altitude" />
        <label>Roast Level</label>
        <input type="text" v-model="coffeeInfo.roast" />
        <div v-for="note in coffeeInfo.tastingNotes" :key="note.id">
          <label>Tasting Note {{ note.id + 1 }}</label>
          <input type="text" v-model="note.note" />
        </div>
      </div>
      <!-- <div class="user-input-right">
        <h2>Current Recipe</h2>
        <label>Dose</label>
        <input type="text" v-model="currentRecipe.dose" />
        <label>Yield</label>
        <input type="text" v-model="currentRecipe.yield" />
        <label>Time</label>
        <input type="text" v-model="currentRecipe.time" />
        <div v-for="note in currentRecipe.tastingNotes" :key="note.id">
          <label>Getting Note {{ note.id + 1 }}</label>
          <input type="text" v-model="note.note" />
        </div>
      </div> -->
      <div class="suggestion-left">
        <h2>Suggested Recipe</h2>
        <label>Dose</label>
        <input disabled="true" type="text" v-model="suggestedRecipe.dose" />
        <label>Yield</label>
        <input disabled="true" type="text" v-model="suggestedRecipe.yield" />
        <label>Time</label>
        <input disabled="true" type="text" v-model="suggestedRecipe.time" />
        <label>Notes</label>
        <textarea
          disabled="true"
          v-model="suggestedRecipe.note"
          rows="15"
          style="resize: none"
        ></textarea>
      </div>
    </div>
    <div class="button-bar">
      <button :disabled="!submitValid || loading" @click="getSuggestion()">Get Suggestion</button>
      <p class="error">{{  error  }}</p>
    </div>
  </div>
</template>

<script>
const { Configuration, OpenAIApi } = require("openai");
const aiConfig = new Configuration({
    apiKey: process.env.VUE_APP_OPENAI_API_KEY,
});
const ai = new OpenAIApi(aiConfig);
export default {
  name: "EspressoTool",
  props: {},
  data() {
    return {
      coffeeInfo: {
        country: "",
        region: "",
        processing: "",
        altitude: "",
        roast: "",
        tastingNotes: [
          { id: 0, note: "" },
          { id: 1, note: "" },
          { id: 2, note: "" },
        ],
      },
      currentRecipe: {
        dose: 0,
        yield: 0,
        time: 0,
        tastingNotes: [
          { id: 0, note: "" },
          { id: 1, note: "" },
          { id: 2, note: "" },
        ],
      },
      suggestedRecipe: {
        dose: 0,
        yield: 0,
        time: 0,
        note: "",
      },
      loading: false,
      error: ''
    };
  },
  methods: {
    async getSuggestion() {
      this.error = '';
      this.loading = true;
      const query = `I'm trying to dial in a ${this.coffeeInfo.processing} ${this.coffeeInfo.country} espresso. It was grown at ${this.coffeeInfo.altitude} altitude. It's a ${this.coffeeInfo.roast} roast level. The tasting notes listed on the bag are ${this.coffeeInfo.tastingNotes}. Can you suggest a recipe to me, in the following JSON format: { "yield" : '10g', "dose": '10g', "time": '10s', "note": 'here are some helpful tips to dial in easier' }. Please only return the JSON part, no additional text. Will you try to get a unique recipe based on the parameters of the coffee, instead of always saying 1:2 ratio in 30 seconds?`
      const res = await ai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: query }],
      });
      try {
      this.suggestedRecipe = JSON.parse(res.data.choices[0].message.content);
      } catch (e) {
        console.log(e)
        this.error = 'Something went wrong, please try again.'
      }
      this.loading = false;
    },
  },
  computed: {
    submitValid() {
      return this.coffeeInfo.country.length > 1 && this.coffeeInfo.region.length > 1 && this.coffeeInfo.processing.length > 1 && this.coffeeInfo.altitude.length > 1 && this.coffeeInfo.roast.length > 1 && this.coffeeInfo.tastingNotes[0].note.length > 1 && this.coffeeInfo.tastingNotes[1].note.length > 1 && this.coffeeInfo.tastingNotes[2].note.length > 1
    }
  },
};
</script>

<style scoped>
@font-face {
  font-family: BNMainz;
  src: url("../assets/BNMainz.woff");
}

@font-face {
  font-family: Hanover-Bold;
  src: url("../assets/Hanover-Bold.woff");
}

@media screen and (max-width: 1100px) {
  .espresso,
  .button-bar {
    width: 90%;
  }
}

@media screen and (min-width: 1100px) {
  .espresso,
  .button-bar {
    width: 50%;
  }
}

.espresso {
  background-color: rgb(10, 0, 10);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  border: 1px solid rgb(208, 255, 0);
  margin: 0 auto;
  border-radius: 15px;
  color: rgb(208, 255, 0);
  padding: 10px;
  margin-top: 20px;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: Hanover-Bold;
}

h2 {
  font-size: 1em;
  margin-bottom: 10px;
}

button {
  background-color: rgb(208, 255, 0);
  color: rgb(10, 0, 10);
  border: 1px solid rgb(208, 255, 0);
  padding: 5px;
  width: 150px;
  font-size: 1em;
  font-family: BNMainz;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 auto;
}

button:hover {
  background-color: rgb(10, 0, 10);
  color: rgb(208, 255, 0);
}

button:hover:disabled {
  background-color: rgb(208, 255, 0);
  color: rgb(10, 0, 10);
  cursor: not-allowed;
}

button:disabled,
button[disabled] {
  opacity: 0.5;
}

input:disabled,
input[disabled],
textarea:disabled,
textarea[disabled] {
  border: 0px;
}

input,
textarea {
  background-color: rgb(10, 0, 10);
  color: rgb(208, 255, 0);
  border: 1px solid rgb(208, 255, 0);
  padding: 5px;
  margin: 5px;
  width: 90%;
  font-size: 1em;
  font-family: BNMainz;
}

input::placeholder,
textarea::placeholder {
  color: rgb(208, 255, 0);
  font-family: BNMainz;
}

input:focus,
textarea:focus {
  outline: none;
}

label {
  font-size: 1em;
  font-family: BNMainz;
  margin-left: 5px;
}

.button-bar {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  margin: 0 auto;
  margin-top: 10px;
}

.user-input-right {
  padding: 15px;
  border-right: 1px solid rgb(208, 255, 0);
}

.user-input-left {
  padding: 15px;
}

.suggestion-left {
  padding: 15px;
}

.suggestion-right {
  padding: 15px;
}

.error {
  color: rgb(255, 0, 106);
  font-family: BNMainz;
  font-size: 1em;
  text-align: center;
  margin: 0 auto;
  margin-top: 10px;
}
</style>
