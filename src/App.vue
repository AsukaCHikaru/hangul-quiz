<template>
  <div id="app">
    <div class="main-container">
      <Quiz :quiz="currentQuiz.hangul"/>
      <input ref="input" class="answer-input" type="text" v-model="answer" @keyup.enter="checkAnswer">
    </div>
  </div>
</template>

<script>
import { TimelineMax } from "gsap";

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
      history: [],
      quizPool: []
    }
  },
  methods: {
    pickNewHangul: function () {
      return pick(hangul.double);
    },
    startNewQuiz: function () {
      const newHangul = pick(Object.entries(hangul.double).filter(item => item[0] !== this.currentQuiz.spell));
      this.currentQuiz = {
        hangul: newHangul[1],
        spell: newHangul[0],
        startTime: (new Date()).getTime()
      }
      this.answer = "";
    },
    checkAnswer: function () {
      const correct = this.answer === this.currentQuiz.spell || this.answer === "yes";
      if(correct) {
        const answerTime = (((new Date()).getTime() - this.currentQuiz.startTime) / 1000).toFixed(2);
        this.history.push({
          ...this.currentQuiz, answerTime: answerTime
        });

        this.decreaseRate(this.answer);
        this.startNewQuiz();
      }
      else {
        const { input } = this.$refs;
        const timeline = new TimelineMax({repeat: 1});

        timeline.to(input, 0.03, {
          x: 10
        });
        timeline.to(input, 0.03, {
          x: -10
        });
        timeline.to(input, 0.03, {
          x: 0
        });

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
.answer-input{
  background-color: transparent;
  border: solid 0px #fbc99d;
  border-width: 0 0 3px 0;
  color: #fbc99d;
  font-size: 1.5em;
}
.answer-input:focus{
  outline: none;
}
</style>
