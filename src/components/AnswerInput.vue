<template>
  <div class="input-container">
    <input 
      ref="input" 
      class="answer-input" 
      type="text" 
      v-model="answer" 
      @keyup.enter="handleKeyUpEnter"
      :placeholder="placeholderStr"
      @click="handleClickInput"
    >
  </div>
</template>

<script>
import { TimelineMax } from "gsap";

export default {
  name: 'AnswerInput',
  props: {
    mode: String
  },
  data: function () {
    return {
      answer: "",      
    }
  },
  computed: {
    placeholderStr: function () {
      return this.mode === "countdown" ? "Click to start" : "Insert romanisation";
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
    },
    handleClickInput: function () {
      this.$emit('click-input-event');
    }
  }
}
</script>

<style>
.input-container{
  grid-row-start: 4;
  grid-column-start: 2;
}
.answer-input{
  background-color: transparent;
  border: solid 0px #fbc99d;
  border-width: 0 0 3px 0;
  color: #fbc99d;
  font-size: 1.5em;
}
.answer-input::placeholder, .answer-input::-webkit-input-placeholder{
  color: #ffffff55;
  font-weight: 300;
}
.answer-input:focus{
  outline: none;
}
</style>
