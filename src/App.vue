<template>
  <div
    id="app" 
    @keyup.right="handleKeyUpRight"
    @keydown.shift="() => handleKeyPressShift(true)"
    @keyup.shift="() => handleKeyPressShift(false)"
    @keyup.down="handleKeyUpDown"
  >
    <div class="main-container">
      <Quiz ref="quiz" :quiz="currentQuiz.hangul" :answer="currentQuiz.spell" />
      <answer-input ref="input" @keyup-enter="checkAnswer($event)" />
      <div class="tooltip-container">
        <h3>SHIFT + → to skip question</h3>
        <h3>SHIFT + ↓ to show answer</h3>
      </div>
    </div>
  </div>
</template>

<script>


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
      quizPool: [],
      shiftDown: false
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
      this.$refs.input.answer = "";
      this.$refs.quiz.answerShown = false;
    },
    checkAnswer: function (answer) {
      const correct = answer === this.currentQuiz.spell || answer === "yes";
      if(correct) {
        const answerTime = (((new Date()).getTime() - this.currentQuiz.startTime) / 1000).toFixed(2);
        this.history.push({
          ...this.currentQuiz, answerTime: answerTime
        });
        this.decreaseRate(this.answer);
        this.$refs.quiz.playCorrectAnime();
        setTimeout(() => {
          this.startNewQuiz();
        }, 100);
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
    },
    handleKeyPressShift: function (pressed) {
      this.shiftDown = pressed;
    },
    handleKeyUpRight: function () {
      if(this.shiftDown){
        this.increaseRate();
        this.startNewQuiz();
      }
    },
    handleKeyUpDown: function () {
      if(this.shiftDown) this.$refs.quiz.answerShown = true;
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
  grid-template-rows: 60% 10% 30%;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  width: 800px;
  height: 100vh;
  text-align: center;
}
.tooltip-container{
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', sans-serif;
  color: #ccc;
}
</style>
