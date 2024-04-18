
<template>
  <div class="main">
    <h2 class="title">Cписок задач</h2>
    <div class="sorting">
      <select v-model="selectedOption">
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.text }}
        </option>
      </select>
      <input type="text" v-model="sortedInput" placeholder="поиск..">
    </div>
    <div v-for="item, index in finalSorted" :key="item.id" class="case" @click="gotoDetails(item.id)">
      <div v-if="item.complete" @click.stop="changeComplete(index)" class="case-complete">✔️</div>
      <div v-else @click.stop="changeComplete(index)" class="case-complete"></div>
      <h3 class="case-title">{{item.title}} </h3>
      <button class="case-btn" @click.stop="delCase(index)">
        <svg
          viewBox="0 0 512 512"
        >
          <path d="m437.019 74.98a256 256 0 0 0 -362.038 362.04 256 256 0 0 0 362.038-362.04zm-22.627 339.413a224.254 224.254 0 0 1 -316.784 0c-87.337-87.338-87.337-229.448 0-316.786s229.446-87.336 316.784 0 87.337 229.448 0 316.786zm-50.913-243.246-84.852 84.853 82.206 82.206a16 16 0 1 1 -22.627 22.627l-82.206-82.206-84.853 84.852a16 16 0 0 1 -22.626-22.626l84.852-84.853-82.206-82.206a16 16 0 0 1 22.627-22.627l82.206 82.206 84.853-84.852a16 16 0 0 1 22.626 22.626z" fill="#000000" style="fill: #EF4343;"></path>
        </svg>
      </button>
    </div>
    <span v-if="!finalSorted.length" class="case case-empty">
      Нет задач, удовлетворяющих критериям поиска
    </span>
    <form @submit.prevent="addCase" class="addtask" id="formMain">
      <button class="addtask-btn">
        <svg 
          class="addtask-img" 
          viewBox="0 0 426.66667 426.66667"
        >
          <g fill="#4caf50">
            <path d="m405.332031 234.667969h-384c-11.773437 0-21.332031-9.558594-21.332031-21.335938 0-11.773437 9.558594-21.332031 21.332031-21.332031h384c11.777344 0 21.335938 9.558594 21.335938 21.332031 0 11.777344-9.558594 21.335938-21.335938 21.335938zm0 0"/>
            <path d="m213.332031 426.667969c-11.773437 0-21.332031-9.558594-21.332031-21.335938v-384c0-11.773437 9.558594-21.332031 21.332031-21.332031 11.777344 0 21.335938 9.558594 21.335938 21.332031v384c0 11.777344-9.558594 21.335938-21.335938 21.335938zm0 0"/>
          </g>
        </svg>
      </button>
      <input type="text" v-model="caseInput" class="addtask-input" placeholder="Добавить">
      <span v-if="v$.caseInput.$error" class="addtask-error">Введите название задачи</span>
    </form>
  </div>
</template>

<script setup>

import { ref, computed } from 'vue'
import { useStore } from "../stores/store.js"
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()

const list = ref(store.list);
const caseInput = ref('')
const selectedOption= ref(0);
const sortedInput = ref('')
const options = [
  { text: 'Все задачи', value: 0 },
  { text: 'Выполненные', value: 1 },
  { text: 'Невыполненные', value: 2 }
]
const rules = {
  caseInput: { required }
}
const v$ = useVuelidate(rules,{
  caseInput
})

const firstSorted = computed(() => {
  if(selectedOption.value == 0) return list.value
  else if(selectedOption.value == 1) return list.value.filter(el => el.complete)
  else if(selectedOption.value == 2) return list.value.filter(el => !el.complete)
})

const finalSorted = computed(() => {
  return firstSorted.value.filter(el => el.title.toLowerCase().includes(sortedInput.value.toLowerCase()))
})

const delCase = (idx) => {
  store.deleteTask(idx)
}

const addCase = () => {
  v$.value.$touch()
  if(v$.value.$error) return false
  store.addTask(caseInput.value)
  caseInput.value = ''
  v$.value.caseInput.$reset()
}

const changeComplete = (idx) => {
  store.changeComplete(idx)
}

const gotoDetails = (id) => {
  router.push({ name: 'details', query: {id: id} })
}

</script>

<style scoped>
.main {
  position: relative;
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  margin-top: 24px;
}
.title {
  font-size: 22px;
  font-weight: 400;
  margin-bottom: 24px;
}
.sorting {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-right: 12px;
  margin-bottom: 16px;
}
.sorting select {
  width: 128px;
  height: 32px;
  outline: none;
  margin-right: 8px;
}
.sorting input {
  width: 45%;
  height: 32px;
  outline: none;
  padding-left: 8px;
}
.case {
  position: relative;
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  margin: 8px;
  padding: 12px 24px;
  border-radius: 12px;
  cursor: pointer;
}
.case::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -8px;
  width: 100%;
  height: 1px;
  background-color: rgb(205, 205, 205)
}
.case-complete {
  width: 24px;
  height: 24px;
  border: 1px solid rgb(205, 205, 205);
  border-radius: 50%;
  margin-right: 12px;
}
.case-btn {
  cursor: pointer;
  min-width: 24px;
  min-height: 24px;
  background: transparent;
  border: none;
  margin-left: auto;
  margin-right: 0;
}
.case-empty {
  cursor: unset;
  font-size: 18px;
  font-weight: 400;
}

@media (max-width: 600px) {
  .main {
    width: 100%;
  }
  .case {
    padding: 12px;
  }
}
@media (max-width: 300px) {
  .sorting select {
    width: 80px;
  }
}

</style>
