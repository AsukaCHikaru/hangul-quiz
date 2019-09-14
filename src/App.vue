<template>
  <div id="app">
    <div class="main-container">
      <Quiz :quiz="currentQuiz[1]"/>
      <input class="answer-input" type="text" v-model="answer" @keyup="checkAnswer">
    </div>
  </div>
</template>

<script>
import Quiz from "./components/Quiz";
import { hangul } from "./constants/hangulTable";
import { pick } from "./logic/pick";

export default {
  name: 'app',
  components: {
    Quiz
  },
  data: function () {
    return {
      currentQuiz: this.pickNewHangul(),
      answer: ""
    }
  },
  methods: {
    pickNewHangul: function () {
      return pick(hangul.double);
    },
    checkAnswer: function () {
      const correct = this.answer===this.currentQuiz[0];
      if(correct) {
        this.currentQuiz = this.pickNewHangul();
        this.answer = "";
      }
      
    }
  }  
}
</script>

<style>
body, html{
  background-color: #042f4b;
};
.app{
  display: flex;
}
.main-container{
  margin: auto;
  width: 800px;
  height: 500px;
  text-align: center;
}
.answer-input{
  background-color: transparent;
  border: solid 0px #fff6da;
  border-width: 0 0 3px 0;
  color: #fff6da; 
  font-size: 1.5em;
}
.answer-input:focus{
  outline: none;
}
</style>
