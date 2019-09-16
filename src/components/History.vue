<template>
  <div class="history-container">
    <ul class="history-ul">
      <li
        v-for="item in history"
        :key="item.startTime"
        class="history-li"
      >
        <div class="history-li-context-container">
          <p>{{item.hangul}}</p>
          <p>{{item.spell}}</p>
          <p>{{item.answerTime+"s"}}</p>
          <p>{{item.attampt+" try"}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'History',
  props: {
    history: Array
  },
  computed: {
    liItems: function () {
      return this.history.map(item => {
        return `${item.hangul} ${item.spell} ${item.answerTime}s ${item.attampt} try`
      })
    }
  }
}
</script>

<style>
.history-container{
  grid-row-start: 2;
  grid-column-start: 3;
}
.history-ul{
  list-style: decimal;
  padding: 0;
  color: #ccc;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', sans-serif;
}
.history-li{
}
.history-li-context-container{
  display: grid;
  grid-template-columns: 15% 25% 30% 30%;
}
.history-li p{
  margin: 0;
}
</style>
