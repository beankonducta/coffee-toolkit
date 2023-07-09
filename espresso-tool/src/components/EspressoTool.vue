<template>
  <div class="espresso">
    <div class="user-input">
      <div>
        <input type="text" placeholder="Enter a city name" />
      </div>
      <div>
        <input type="text" placeholder="Enter a coffee shop name" />
      </div>
    </div>
    <div class="suggestion">
    </div>
  </div>
</template>

<script>
export default {
  name: 'EspressoTool',
  props: {
  },
  data () {
    return {
      coffeeInfo: {
        city: '',
        shop: ''
      },
      currentRecipe: {
        coffee: 0,
        water: 0,
        ratio: 0
      },
      suggestedRecipe: {
        coffee: 0,
        water: 0,
        ratio: 0
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped>
@media screen and (max-width: 768px) {
  .espresso {
    width: 100%;
  }
}

@media screen and (min-width: 768px) {
  .espresso {
    width: 50%;
  }
}

.espresso {
  background-color: rgb(10, 0, 10);
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  border: 1px solid rgb(208, 255, 0);
  margin: 0 auto;
  border-radius: 5px;
}

input {
  background-color: rgb(10, 0, 10);
  color: rgb(208, 255, 0);
  border: 1px solid rgb(208, 255, 0);
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
  width: 90%;
  font-size: 1.5em;
  font-family: sans-serif;
}

.user-input {
  grid-column: 1 / 1;
  grid-row: 1 / 2;
}

.suggestion {
  grid-column: 2 / 2;
  grid-row: 2 / 3;
}
</style>
