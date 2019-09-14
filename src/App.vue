<template>
  <div id="app">
    <div class="main-container">
      <Quiz :quiz="currentQuiz.hangul"/>
      <input class="answer-input" type="text" v-model="answer" @keyup.enter="checkAnswer">
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
      currentQuiz: {
        hangul: "",
        spell: "",
        startTime: "",
        attampt: 0
      },
      answer: "",
      history: []
    }
  },
  methods: {
    pickNewHangul: function () {
      return pick(hangul.double);
    },
    startNewQuiz: function () {
      const newHangul = pick(hangul.double);
      this.currentQuiz = {
        hangul: newHangul[1],
        spell: newHangul[0],
        startTime: (new Date()).getTime()
      }
      this.answer = "";
    },
    checkAnswer: function () {
      const correct = this.answer === this.currentQuiz.spell;
      if(correct) {
        const answerTime = (((new Date()).getTime() - this.currentQuiz.startTime) / 1000).toFixed(2);
        this.history.push({
          ...this.currentQuiz, answerTime: answerTime
        });

        this.startNewQuiz();
      }
      else {
        this.currentQuiz.attampt++;
      }
    }
  },
  mounted: function () {
    this.startNewQuiz();
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
