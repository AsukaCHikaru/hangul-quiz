<template>
  <div
    id="app"
    @keyup="handleKeyUp"
  >
    <div class="main-container">
      <count-down
        ref="countdown"
        v-if="mode === 'countdown'"
        @timeup="handleTimeup"
      />
      <streak ref="streak" :streak="streak" :result="result" />
      <div class="option-container">
        <button class="option-btn" @click="handleClickModeBtn('free')">FREE MODE</button>
        <button class="option-btn" @click="handleClickModeBtn('countdown')">COUNT DOWN MODE</button>
      </div>
      <Quiz ref="quiz" :quiz="currentQuiz.hangul" :answer="currentQuiz.spell" />
      <answer-input
        ref="input"
        @keyup-enter="checkAnswer($event)"
        :mode="mode"
        @click-input-event="handleClickInput"
      />
      <div class="tooltip-container">
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
import CountDown from "./components/CountDown";

import { hangul } from "./constants/hangulTable";
import { pick } from "./logic/pick";

export default {
  name: 'app',
  components: {
    Quiz,
    AnswerInput,
    Streak,
    History,
    CountDown
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
      quizPool: [],
      mode: 'free',
      result: {}
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
        this.history.unshift({
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
    },
    handleClickModeBtn: function (mode) {
      this.mode = mode;
    },
    handleClickInput: function () {
      if(this.mode==='countdown') {
        this.startNewQuiz();
        this.$refs.countdown.startCountDown();
        this.history = [];
        this.result = {};
      }
    },
    handleTimeup: function () {
      let index = 1;
      const result = { numOfQ: this.history.length, correct: 0, timeUsed: 0 };
      this.history.forEach(q => {
        if(q.attampt === 1) result.correct++;
        result.timeUsed += parseInt(q.answerTime);
      });
      result.correctPer = (result.correct*100/this.history.length).toFixed(2);
      // result.avgTimePerQ = (60 / this.history.length).toFixed(2);
      this.result = { ...result };      
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
#app{
  height: 100%;
  background-color: transparent;
}
.main-container{
  display: grid;
  grid-template-rows: 10% 20% 30% 10% 30%;
  grid-template-columns: 20% 60% 20%;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  width: 1200px;
  height: 95vh;
  text-align: center;
}
.option-container{
  grid-area: 2/ 1/ 2/ 2;
}
.option-btn{
  display: block;
  margin: 10px 0;
  width: 100%;
  font-size: 1.2em;
  background-color: #ffffff22;
  color: #ccc;
  cursor: pointer;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', sans-serif;
  border-color: #444 #333 #000 #333;
  box-shadow: 0px 2px 2px 2px #111;
}
.option-btn:focus{
  outline: none;
}
.option-btn:active{
  background-color: #032033;
  color: #555;
}
.tooltip-container{
  grid-row-start: 5;
  grid-column-start: 2;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', sans-serif;
  color: #ccc;
}
</style>
