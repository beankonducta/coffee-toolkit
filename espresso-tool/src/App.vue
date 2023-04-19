<template>
  <img class="logo" alt="Coffee logo" src="./assets/coffee.png">
  <!-- This is how you render the components on the webpage -->
  <HelloWorld msg="Slingin' spro"/>
  <TestComponent/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import TestComponent from './components/TestComponent.vue'

export default {
  name: 'App',
  // Can pass multiple compenents (sane structure as react app.js)
  // This will not render the component on the webpage
  components: {
    HelloWorld,
    TestComponent,
  }
}
</script>

<style>
.logo {
  width: 200px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
