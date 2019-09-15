<template>
  <div class="quiz-container">
    <div ref="wrapper" class="quiz-wrapper">
      <h1 class="quiz-txt" ref="txt">{{quiz}}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Quiz',
  props: {
    quiz: String
  },
  methods: {
    playCorrectAnime: function () {
      const { txt, wrapper } = this.$refs;
      const timeline = new TimelineMax();
      timeline.to(wrapper, 0.1, {
        scale: 1.2,
        ease: Back.easeOut.config(1.5),
        opacity: 0.3
      });
      timeline.to(wrapper, 0.05, {
        scale: 1,
        opacity: 1
      });
    }
  }
}
</script>

<style>
.quiz-wrapper{
  margin: 3em auto;
  padding: auto;
  height: 12em;
  width: 12em;
  border-radius: 50%;
}
.quiz-txt{
  margin: auto;
  color: #fff6da;
  font-size: 8em;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  display: inline;
}
</style>