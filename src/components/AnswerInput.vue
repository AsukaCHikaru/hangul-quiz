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
    />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { gsap } from "gsap";

export default {
  name: "AnswerInput",
  props: {
    mode: String,
  },
  emits: ["keyup-enter", "click-input-event"],
  setup(props, { emit }) {
    const answer = ref("");
    const input = ref(null);

    const placeholderStr = computed(() => {
      return props.mode === "countdown"
        ? "Click to start"
        : "Insert romanisation";
    });

    const handleKeyUpEnter = () => {
      emit("keyup-enter", answer.value);
    };

    const playWrongAnime = () => {
      if (input.value) {
        const timeline = gsap.timeline({ repeat: 1 });
        timeline.to(input.value, { duration: 0.03, x: 10 });
        timeline.to(input.value, { duration: 0.03, x: -10 });
        timeline.to(input.value, { duration: 0.03, x: 0 });
      }
    };

    const handleClickInput = () => {
      emit("click-input-event");
    };

    return {
      answer,
      input,
      placeholderStr,
      handleKeyUpEnter,
      playWrongAnime,
      handleClickInput,
    };
  },
};
</script>

<style>
.input-container {
  grid-row-start: 4;
  grid-column-start: 2;
}
.answer-input {
  background-color: transparent;
  border: solid 0px #fbc99d;
  border-width: 0 0 3px 0;
  color: #fbc99d;
  font-size: 1.5em;
}
.answer-input::placeholder,
.answer-input::-webkit-input-placeholder {
  color: #ffffff55;
  font-weight: 300;
}
.answer-input:focus {
  outline: none;
}
</style>
