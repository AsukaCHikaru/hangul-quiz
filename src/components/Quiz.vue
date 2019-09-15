<template>
  <div class="quiz-container">
    <div ref="wrapper" class="quiz-wrapper">
      <h1 class="quiz-txt" ref="txt">{{quiz}}</h1>
    </div>
    <h3 class="quiz-answer" v-if="answerShown">{{answer}}</h3>
  </div>
</template>

<script>
import { TimelineMax } from "gsap";

export default {
  name: 'Quiz',
  props: {
    quiz: String,
    answer: String
  },
  data: function () {
    return {
      answerShown: false
    }
  },
  methods: {
    playCorrectAnime: function () {
      const { wrapper } = this.$refs;
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
.quiz-container{
  display: grid;
  grid-template-rows: 30% 40% 30%;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.quiz-wrapper{
  grid-row-start: 2;
  margin: 3em auto;
  padding: auto;
  /* height: 12em; */
  /* width: 12em; */
  border-radius: 50%;
}
.quiz-txt{
  margin: auto;
  color: #fff6da;
  font-size: 8em;
  display: inline;
}
.quiz-answer{
  grid-row-start: 3;
  font-size: 1.5em;
  /* font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; */
  color: #eee;
}
</style>