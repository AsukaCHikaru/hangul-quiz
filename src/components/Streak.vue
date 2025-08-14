<template>
  <div class="streak-container">
    <div ref="wrapper" class="streak-wrapper">
      <h3 class="result-txt" v-if="resultStr!==null">{{resultStr}}</h3>
      <h3 class="streak-txt" v-if="streak>=3 && resultStr===null">{{streak+" combo!"}}</h3>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { gsap } from 'gsap'

export default {
  name: 'Streak',
  props: {
    streak: Number,
    result: Object
  },
  setup(props) {
    const wrapper = ref(null)

    const resultStr = computed(() => {
      return props.result && props.result.hasOwnProperty('correct')
        ? `${props.result.correct}/${props.result.numOfQ} (${props.result.correctPer}%), ${(props.result.timeUsed/props.result.numOfQ).toFixed(2)}s per question`
        : null
    })

    const playComboAnime = () => {
      if (wrapper.value) {
        const timeline = gsap.timeline()
        timeline.to(wrapper.value, {
          duration: 0.01,
          scale: 2,
          opacity: 0.1
        })
        timeline.to(wrapper.value, {
          duration: 0.2,
          scale: 1,
          opacity: 1
        })
      }
    }

    return {
      wrapper,
      resultStr,
      playComboAnime
    }
  }
}
</script>

<style>
.streak-container{
  grid-row-start: 2;
  grid-column: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  font-size: 1.5em;
}
.streak-wrapper{
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
}
.streak-txt{
  color: #ed1250;
}
.result-txt{
  color: #12beed;
}
</style>
