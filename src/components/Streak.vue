<template>
  <div class="streak-container">
    <div ref="wrapper" class="streak-wrapper">
      <h3 class="streak-txt" v-if="streak>=3">{{streak+" combo!"}}</h3>
    </div>
  </div>
</template>

<script>
import { TimelineMax } from "gsap";

export default {
  name: 'Streak',
  props: {
    streak: Number
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
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: #ed1250;
  font-size: 1.5em;
}
.streak-wrapper{
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
}
</style>
