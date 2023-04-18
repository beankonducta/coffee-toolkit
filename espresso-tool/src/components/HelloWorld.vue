<template>
  <!--Assuming best practice to have these as divs like react -->
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>You want some helping with them dials</h2>
    <p>Never fight your Natural Ethiopia again</p>
  </div>
</template>

<script>
export default {
  // The name is the file export title (Remember this Sean)
  name: 'HelloWorld',
  // What you're passing through (this case the "msg" from the App.vue)
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
