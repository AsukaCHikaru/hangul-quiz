<template>
  <div class="countdown-container">
    <h1 class="countdown-txt">{{time}}</h1>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'CountDown',
  emits: ['timeup'],
  setup(props, { emit }) {
    const time = ref(60)
    let cdTimer = null

    const startCountDown = () => {
      time.value = 60
      if (cdTimer) {
        clearInterval(cdTimer)
      }
      cdTimer = setInterval(() => {
        if (time.value > 0) {
          time.value--
        } else {
          clearInterval(cdTimer)
          emit('timeup')
        }
      }, 1000)
    }

    return {
      time,
      startCountDown
    }
  }
}
</script>

<style>
.countdown-container{
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  grid-row-start: 1;
  grid-column: 1/ 4;
}
.countdown-txt{
  margin: 0 auto;
  color: #ddd;
  font-family: Helvetica, sans-serif;
  font-size: 4em;
  text-shadow: 0px 5px #222;
}
</style>