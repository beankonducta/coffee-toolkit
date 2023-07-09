<template>
  <div class="espresso">
    <div class="user-input-left">
      <h2>Coffee Info</h2>
      <label>Country</label>
      <input type="text" placeholder="Country" v-model="coffeeInfo.country" />
      <label>Region</label>
      <input type="text" placeholder="Region" v-model="coffeeInfo.region" />
      <label>Processing</label>
      <input
        type="text"
        placeholder="Processing"
        v-model="coffeeInfo.processing"
      />
      <label>Altitude</label>
      <input type="text" placeholder="Altitude" v-model="coffeeInfo.altitude" />
      <div v-for="note in coffeeInfo.listedNotes" :key="note.id">
        <label>Tasting Note {{ note.id + 1 }}</label>
        <input type="text" placeholder="Tasting Note" v-model="note.note" />
      </div>
    </div>
    <div class="user-input-right">
      <h2>Current Recipe</h2>
      <label>Dose</label>
      <input type="text" placeholder="Dose" v-model="currentRecipe.dose" />
      <label>Yield</label>
      <input type="text" placeholder="Yield" v-model="currentRecipe.yield" />
      <label>Time</label>
      <input type="text" placeholder="Time" v-model="currentRecipe.time" />
      <label>Grind</label>
      <input type="text" placeholder="Grind" v-model="currentRecipe.grind" />
      <label>Temperature</label>
      <input
        type="text"
        placeholder="Temperature"
        v-model="currentRecipe.temperature"
      />
      <div v-for="note in currentRecipe.gettingNotes" :key="note.id">
        <label>Getting Note {{ note.id + 1 }}</label>
        <input type="text" placeholder="Tasting Note" v-model="note.note" />
      </div>
    </div>
    <div class="suggestion-left">
      <h2>Suggested Recipe</h2>
      <label>Dose</label>
      <input
        disabled="true"
        type="text"
        placeholder="Dose"
        v-model="suggestedRecipe.dose"
      />
      <label>Yield</label>
      <input
        disabled="true"
        type="text"
        placeholder="Yield"
        v-model="suggestedRecipe.yield"
      />
      <label>Time</label>
      <input
        disabled="true"
        type="text"
        placeholder="Time"
        v-model="suggestedRecipe.time"
      />
      <label>Grind</label>
      <input
        disabled="true"
        type="text"
        placeholder="Grind"
        v-model="suggestedRecipe.grind"
      />
      <label>Temperature</label>
      <input
        disabled="true"
        type="text"
        placeholder="Temperature"
        v-model="suggestedRecipe.temperature"
      />
    </div>
    <div class="suggestion-right">
      <h2>-</h2>
      <label>Notes</label>
      <textarea
        disabled="true"
        placeholder="Notes"
        v-model="suggestedRecipe.notes"
        rows="15"
      ></textarea>
    </div>
  </div>
</template>

<script>
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
        listedNotes: [
          { id: 0, note: "" },
          { id: 1, note: "" },
          { id: 2, note: "" },
        ],
      },
      currentRecipe: {
        dose: 0,
        yield: 0,
        time: 0,
        grind: 0,
        temperature: 0,
        gettingNotes: [
          { id: 0, note: "" },
          { id: 1, note: "" },
          { id: 2, note: "" },
        ],
      },
      suggestedRecipe: {
        dose: 0,
        yield: 0,
        time: 0,
        grind: 0,
        temperature: 0,
        notes: "",
      },
      attempts: 0,
    };
  },
  methods: {},
};
</script>

<style scoped>
@media screen and (max-width: 1100px) {
  .espresso {
    width: 90%;
  }
}

@media screen and (min-width: 1100px) {
  .espresso {
    width: 50%;
  }
}

.espresso {
  background-color: rgb(10, 0, 10);
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  border: 1px solid rgb(208, 255, 0);
  margin: 0 auto;
  border-radius: 15px;
  color: rgb(208, 255, 0);
  padding: 10px;
  margin-top: 20px;
}

input, textarea {
  background-color: rgb(10, 0, 10);
  color: rgb(208, 255, 0);
  border: 1px solid rgb(208, 255, 0);
  border-radius: 5px;
  padding: 1px;
  margin: 5px;
  width: 90%;
  font-size: 1em;
  font-family: sans-serif;
}

label {
  font-size: 1em;
  font-family: sans-serif;
  margin-left: 5px;
}

.user-input-right {
  grid-column: 4 / 7;
  padding: 15px;
  border-right: 1px solid rgb(208, 255, 0);
}

.user-input-left {
  grid-column: 1 / 4;
  padding: 15px;
}

.suggestion-left {
  grid-column: 7 / 10;
  padding: 15px;
}

.suggestion-right {
  grid-column: 10 / 13;
  padding: 15px;
}
</style>
