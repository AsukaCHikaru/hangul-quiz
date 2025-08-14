<template>
  <div class="quiz-container">    
    <div ref="wrapper" class="quiz-wrapper">
      <h1 class="quiz-txt" ref="txt">{{quiz}}</h1>
    </div>
    <div class="quiz-answer-wrapper">
      <h3 class="quiz-answer" v-if="answerShown">{{answer}}</h3>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { gsap } from 'gsap'

export default {
  name: 'Quiz',
  props: {
    quiz: String,
    answer: String
  },
  setup() {
    const answerShown = ref(false)
    const wrapper = ref(null)

    const playCorrectAnime = () => {
      if (wrapper.value) {
        const timeline = gsap.timeline()
        timeline.to(wrapper.value, {
          duration: 0.1,
          scale: 1.2,
          ease: "back.out(1.5)",
          opacity: 0.3
        })
        timeline.to(wrapper.value, {
          duration: 0.05,
          scale: 1,
          opacity: 1
        })
      }
    }

    return {
      answerShown,
      wrapper,
      playCorrectAnime
    }
  }
}
</script>

<style>
.quiz-container{
  grid-row-start: 3;
  grid-column: 2;
  display: grid;
  grid-template-rows: 80% 20%;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.quiz-wrapper{
  display: flex;
  grid-row-start: 1;
  margin: auto;
  padding: auto;
  border-radius: 50%;
}
h1.quiz-txt{
  margin: auto;
  color: #fff6da;
  font-size: 8em;
  display: inline;
}
.quiz-answer-wrapper{
  grid-row-start: 2;
}
.quiz-answer{
  margin: 0 auto;
  font-size: 1.5em;
  color: #eee;
}
</style>
