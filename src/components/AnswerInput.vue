<template>
  <div>
    <input ref="input" class="answer-input" type="text" v-model="answer" @keyup.enter="handleKeyUpEnter">
  </div>
</template>

<script>
import { TimelineMax } from "gsap";

export default {
  name: 'AnswerInput',
  data: function () {
    return {
      answer: ""
    }
  },
  methods: {
    handleKeyUpEnter: function () {
      this.$emit('keyup-enter', this.answer);
    },
    playWrongAnime: function () {
      const { input } = this.$refs;
      const timeline = new TimelineMax({repeat: 1});

      timeline.to(input, 0.03, {
        x: 10
      });
      timeline.to(input, 0.03, {
        x: -10
      });
      timeline.to(input, 0.03, {
        x: 0
      });
    }
  }
}
</script>

<style>
.answer-input{
  background-color: transparent;
  border: solid 0px #fbc99d;
  border-width: 0 0 3px 0;
  color: #fbc99d;
  font-size: 1.5em;
}
.answer-input:focus{
  outline: none;
}
</style>
