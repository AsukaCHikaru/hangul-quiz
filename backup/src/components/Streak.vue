<template>
  <div class="streak-container">
    <div ref="wrapper" class="streak-wrapper">
      <h3 class="result-txt" v-if="resultStr!==null">{{resultStr}}</h3>
      <h3 class="streak-txt" v-if="streak>=3 && resultStr===null">{{streak+" combo!"}}</h3>
    </div>
  </div>
</template>

<script>
import { TimelineMax } from "gsap";

export default {
  name: 'Streak',
  props: {
    streak: Number,
    result: Object
  },
  computed: {
    resultStr: function () {      
      return this.result.hasOwnProperty('correct') 
      ? `${this.result.correct}/${this.result.numOfQ} (${this.result.correctPer}%), ${(this.result.timeUsed/this.result.numOfQ).toFixed(2)}s per question` 
      : null
    }
  },
  methods: {
    playComboAnime: function () {
      const { wrapper } = this.$refs;
      const timeline = new TimelineMax();

      timeline.to(wrapper, 0.01, {
        scale: 2,
        opacity: 0.1
      });
      timeline.to(wrapper, 0.2, {
        scale: 1,
        opacity: 1
      });
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
