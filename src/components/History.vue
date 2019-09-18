<template>
  <div class="history-container">
    <div class="history-tab-container">
    <div class="history-tab" :class="[filter==='all' ? 'show' : '']" @click="handleClickFilter('all')">ALL</div>
    <div class="history-tab" :class="[filter==='wrong' ? 'show' : '']" @click="handleClickFilter('wrong')">WRONG</div>
    </div>
    <ul class="history-ul">
      <li
        v-for="item in liItems"
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
  data: function () {
    return {
      filter: 'wrong'
    }
  },
  computed: {
    liItems: function () {
      if(this.filter === 'all'){
        return this.history;
      }
      return this.history.filter(item => item.attampt > 1);
    }
  },
  methods: {
    handleClickFilter: function (filter) {
      this.filter = filter;      
    }
  }
}
</script>

<style>
.history-container{
  grid-row-start: 3;
  grid-row-end: 5;
  grid-column-start: 1;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', sans-serif;
  overflow: scroll;
  background-color: #ffffff22;
}
.history-tab-container{
  width: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
}
.history-tab{
  display: inline-block;
  color: #ccc;
  font-weight: 700;
  cursor: pointer;
  background-color: #042f4b;
}
.history-tab.show{
  background-color: transparent;
}
.history-ul{
  list-style: none;
  padding: 0;
  color: #ccc;
}
.history-li-context-container{
  display: grid;
  grid-template-columns: 15% 25% 30% 30%;
}
.history-li p{
  margin: 0;
}
</style>
