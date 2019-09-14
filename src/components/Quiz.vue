<template>
  <div class="quiz-container">
    <h1>{{quiz}}</h1>
  </div>
</template>

<script>


export default {
  name: 'Quiz',
  props: {
    quiz: String
  }
}
</script>

<style>
h1{
  color: #fff6da;
  font-size: 5em;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
</style>