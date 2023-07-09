<template>
  <div id="app">
    <EspressoTool />
  </div>
</template>

<script>
import EspressoTool from './components/EspressoTool.vue'

export default {
  name: 'App',
  components: {
    EspressoTool
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background-color: rgb(10, 0, 10);
}
#app {
  width: 100%;
}
</style>
