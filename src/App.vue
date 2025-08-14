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
import { ref, reactive, onMounted } from 'vue'
import Quiz from "./components/Quiz.vue"
import AnswerInput from "./components/AnswerInput.vue"
import Streak from "./components/Streak.vue"
import History from "./components/History.vue"
import CountDown from "./components/CountDown.vue"

import { hangul } from "./constants/hangulTable.js"
import { pick } from "./logic/pick.js"

export default {
  name: 'App',
  components: {
    Quiz,
    AnswerInput,
    Streak,
    History,
    CountDown
  },
  setup() {
    // Refs for template refs
    const quiz = ref(null)
    const input = ref(null)
    const streak = ref(null)
    const countdown = ref(null)

    // Reactive state
    const currentQuiz = reactive({
      hangul: "",
      spell: "",
      startTime: "",
      attampt: 0
    })

    const streakCount = ref(0)
    const history = ref([])
    const quizPool = ref([])
    const mode = ref('free')
    const result = ref({})

    // Methods
    const pickNewHangul = () => {
      return pick(hangul.double)
    }

    const startNewQuiz = () => {
      const newHangul = pick(
        Object.entries(hangul.double).filter(item => item[0] !== currentQuiz.spell)
      )
      
      Object.assign(currentQuiz, {
        hangul: newHangul[1],
        spell: newHangul[0],
        startTime: (new Date()).getTime(),
        attampt: 0
      })
      
      if (input.value) {
        input.value.answer = ""
      }
      if (quiz.value) {
        quiz.value.answerShown = false
      }
    }

    const checkAnswer = (answer) => {
      currentQuiz.attampt++

      const correct = answer === currentQuiz.spell || answer === "yes"
      if (correct) {
        const answerTime = (((new Date()).getTime() - currentQuiz.startTime) / 1000).toFixed(2)
        history.value.unshift({
          ...currentQuiz, 
          answerTime: answerTime
        })
        decreaseRate()
        if (quiz.value) {
          quiz.value.playCorrectAnime()
        }
        if (quiz.value && !quiz.value.answerShown) {
          streakCount.value++
          if (streak.value) {
            streak.value.playComboAnime()
          }
        }
        setTimeout(() => {
          startNewQuiz()
        }, 100)
      } else {
        if (input.value) {
          input.value.playWrongAnime()
        }
        streakCount.value = 0
        increaseRate()
      }
    }

    const setQuizPool = () => {
      const defRatio = 5
      for (let time = 0; time < defRatio; time++) {
        quizPool.value = quizPool.value.concat([...Object.entries(hangul.double)])
      }
    }

    const decreaseRate = () => {
      const itemsInPool = quizPool.value.filter(item => item[0] === currentQuiz.spell).length
      if (itemsInPool > 1) {
        const indexOfItemToDel = quizPool.value.findIndex(item => item[0] === currentQuiz.spell)
        quizPool.value.splice(indexOfItemToDel, 1)
      }
    }

    const increaseRate = () => {
      quizPool.value.push([currentQuiz.spell, currentQuiz.hangul])
    }

    const handleKeyUp = (event) => {
      switch (event.key) {
        case 'Control':
          if (quiz.value) {
            quiz.value.answerShown = true
          }
          streakCount.value = 0
          break
        default:
          break
      }
    }

    const handleClickModeBtn = (selectedMode) => {
      mode.value = selectedMode
    }

    const handleClickInput = () => {
      if (mode.value === 'countdown') {
        startNewQuiz()
        if (countdown.value) {
          countdown.value.startCountDown()
        }
        history.value = []
        result.value = {}
      }
    }

    const handleTimeup = () => {
      const newResult = { numOfQ: history.value.length, correct: 0, timeUsed: 0 }
      history.value.forEach(q => {
        if (q.attampt === 1) newResult.correct++
        newResult.timeUsed += parseInt(q.answerTime)
      })
      newResult.correctPer = (newResult.correct * 100 / history.value.length).toFixed(2)
      result.value = { ...newResult }
    }

    // Lifecycle
    onMounted(() => {
      setQuizPool()
      startNewQuiz()
    })

    return {
      // Template refs
      quiz,
      input,
      streak,
      countdown,
      // State
      currentQuiz,
      streak: streakCount,
      history,
      mode,
      result,
      // Methods
      checkAnswer,
      handleKeyUp,
      handleClickModeBtn,
      handleClickInput,
      handleTimeup
    }
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
