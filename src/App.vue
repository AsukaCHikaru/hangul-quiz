<template>
  <div
    id="app"
    @keyup="handleKeyUp"
  >
    <div class="main-container">
      <streak ref="streak" :streak="streak" />
      <Quiz ref="quiz" :quiz="currentQuiz.hangul" :answer="currentQuiz.spell" />
      <answer-input ref="input" @keyup-enter="checkAnswer($event)" />
      <div class="tooltip-container">
        <!-- <h3>CTRL to skip question</h3> -->
        <h3>CTRL to show answer</h3>
      </div>
      <history :history="history" />
    </div>
  </div>
</template>

<script>
import Quiz from "./components/Quiz";
import AnswerInput from "./components/AnswerInput";
import Streak from "./components/Streak";
import History from "./components/History";

import { hangul } from "./constants/hangulTable";
import { pick } from "./logic/pick";

export default {
  name: 'app',
  components: {
    Quiz,
    AnswerInput,
    Streak,
    History
  },
  data: function () {
    return {
      currentQuiz: {
        hangul: "",
        spell: "",
        startTime: "",
        attampt: 0
      },
      streak: 0,
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
        startTime: (new Date()).getTime(),
        attampt: 0
      };
      this.$refs.input.answer = "";
      this.$refs.quiz.answerShown = false;
    },
    checkAnswer: function (answer) {
      this.currentQuiz.attampt++;
    
      const correct = answer === this.currentQuiz.spell || answer === "yes";
      if(correct) {
        const answerTime = (((new Date()).getTime() - this.currentQuiz.startTime) / 1000).toFixed(2);
        this.history.push({
          ...this.currentQuiz, answerTime: answerTime
        });
        this.decreaseRate(this.answer);
        this.$refs.quiz.playCorrectAnime();
        if(!this.$refs.quiz.answerShown) {
          this.streak++;
          this.$refs.streak.playComboAnime();}
        setTimeout(() => {
          this.startNewQuiz();
        }, 100);

      }
      else {
        this.$refs.input.playWrongAnime();
        this.streak = 0;
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
    },
    handleKeyUp: function (event) {
      switch (event.key) {        
        case 'Control':
          this.$refs.quiz.answerShown = true;
          this.streak = 0;
          break;
        default:
          break;
      }
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
  margin: 0;
  height: 100vh;
  background-color: #042f4b;
};
#app{
  height: 100vh;
  background-color: transparent;
}
.main-container{
  display: grid;
  grid-template-rows: 30% 30% 10% 30%;
  grid-template-columns: 25% 50% 25%;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  width: 800px;
  height: 100vh;
  text-align: center;
}
.tooltip-container{
  grid-row-start: 4;
  grid-column-start: 2;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', sans-serif;
  color: #ccc;
}
</style>
