<template>
  <div id="app">
    <div class="main-container">
      <Quiz :quiz="currentQuiz.hangul"/>
      <answer-input ref="input" @keyup-enter="checkAnswer($event)" />
    </div>
  </div>
</template>

<script>
import { TimelineMax } from "gsap";

import Quiz from "./components/Quiz";
import AnswerInput from "./components/AnswerInput";
import { hangul } from "./constants/hangulTable";
import { pick } from "./logic/pick";

export default {
  name: 'app',
  components: {
    Quiz,
    AnswerInput
  },
  data: function () {
    return {
      currentQuiz: {
        hangul: "",
        spell: "",
        startTime: "",
        attampt: 0
      },
      history: [],
      quizPool: []
    }
  },
  methods: {
    pickNewHangul: function () {
      return pick(hangul.double);
    },
    startNewQuiz: function () {
      const newHangul = pick(
        Object.
          entries(hangul.double).
          filter(item => item[0] !== this.currentQuiz.spell)
      );
      this.currentQuiz = {
        hangul: newHangul[1],
        spell: newHangul[0],
        startTime: (new Date()).getTime()
      };
      this.$refs.input.clearAnswer();
    },
    checkAnswer: function (answer) {
      const correct = answer === this.currentQuiz.spell || answer === "yes";
      if(correct) {
        const answerTime = (((new Date()).getTime() - this.currentQuiz.startTime) / 1000).toFixed(2);
        this.history.push({
          ...this.currentQuiz, answerTime: answerTime
        });
        this.decreaseRate(this.answer);
        this.startNewQuiz();
      }
      else {
        this.$refs.input.playWrongAnime();
        this.currentQuiz.attampt++;
        this.increaseRate();
      }
    },
    setQuizPool: function () {
      const defRatio = 5;
      for(let time = 0; time < defRatio; time++){
        this.quizPool = this.quizPool.concat([...Object.entries(hangul.double)]);
      }
    },
    decreaseRate: function () {
      const itemsInPool = this.quizPool.filter(item => item[0] === this.currentQuiz.spell).length;
      if(itemsInPool > 1){
        const indexOfItemToDel = this.quizPool.findIndex(item => item[0] === this.currentQuiz.spell);
        this.quizPool.splice(indexOfItemToDel, 1);
      }
    },
    increaseRate: function () {
      this.quizPool.push([this.currentQuiz.spell, this.currentQuiz.hangul]);
    }
  },
  mounted: function () {
    this.setQuizPool();
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
</style>
