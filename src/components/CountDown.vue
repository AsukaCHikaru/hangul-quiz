<template>
  <div class="countdown-container">
    <h1 class="countdown-txt">{{time}}</h1>
  </div>
</template>

<script>
export default {
  name: 'CountDown',
  data: function () {
    return {
      time: 60
    }
  },
  methods: {
    startCountDown: function () {
      this.time = 60;
      const cdTimer = setInterval(() => {
        if(this.time > 0) this.time--;
        else {
          clearInterval(cdTimer);
          this.$emit('timeup');
        }
      }, 1000);
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