
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

    <div v-for="item in finalSorted" :key="item.id" class="case" @click="gotoDetails(item.id)">
      <h3 class="case-title">{{item.title}} </h3>
      <button class="case-btn" @click.stop="delCase(item)">
        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 490.667 490.667" style="enable-background:new 0 0 490.667 490.667;" xml:space="preserve"><g><g><g><path d="M245.333,0C110.059,0,0,110.059,0,245.333s110.059,245.333,245.333,245.333s245.333-110.059,245.333-245.333 S380.608,0,245.333,0z M245.333,469.333c-123.52,0-224-100.48-224-224s100.48-224,224-224s224,100.48,224,224 S368.853,469.333,245.333,469.333z"/><path d="M260.416,245.333l99.115-99.115c4.16-4.16,4.16-10.923,0-15.083c-4.16-4.16-10.923-4.16-15.083,0l-99.115,99.115 l-99.115-99.136c-4.16-4.16-10.923-4.16-15.083,0c-4.16,4.16-4.16,10.923,0,15.083l99.115,99.115l-99.115,99.115 c-4.181,4.203-4.181,10.944-0.021,15.125c2.091,2.069,4.821,3.115,7.552,3.115s5.461-1.045,7.552-3.115l99.115-99.115 l99.115,99.115c2.091,2.069,4.821,3.115,7.552,3.115c2.731,0,5.461-1.045,7.552-3.115c4.16-4.16,4.16-10.923,0-15.083 L260.416,245.333z"/></g></g></g></svg>
      </button>
    </div>
    <form id="formMain" class="addtask" @submit.prevent="addCase">
      <button class="addtask-btn">
        <svg class="addtask-img" viewBox="0 0 426.66667 426.66667" xmlns="http://www.w3.org/2000/svg"><g fill="#4caf50"><path d="m405.332031 234.667969h-384c-11.773437 0-21.332031-9.558594-21.332031-21.335938 0-11.773437 9.558594-21.332031 21.332031-21.332031h384c11.777344 0 21.335938 9.558594 21.335938 21.332031 0 11.777344-9.558594 21.335938-21.335938 21.335938zm0 0"/><path d="m213.332031 426.667969c-11.773437 0-21.332031-9.558594-21.332031-21.335938v-384c0-11.773437 9.558594-21.332031 21.332031-21.332031 11.777344 0 21.335938 9.558594 21.335938 21.332031v384c0 11.777344-9.558594 21.335938-21.335938 21.335938zm0 0"/></g></svg>
      </button>
      <input type="text" v-model="caseInput" class="addtask-input" placeholder="Добавить">
      <span v-if="v$.caseInput.$error" class="addtask-error">Введите название задачи</span>
    </form>
    <!-- <div> sorted {{ sorted }}</div> -->
    
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
const options= [
  { text: 'Все задачи', value: 0 },
  { text: 'С описанием', value: 1 },
  { text: 'Без описания', value: 2 }
]

const rules = {
  caseInput: { required }
}
const v$ = useVuelidate(rules,{
  caseInput
})

const firstSorted = computed(() => {
  if(selectedOption.value == 0) return list.value
  else if(selectedOption.value == 1) return list.value.filter(el => el.descr)
  else if(selectedOption.value == 2) return list.value.filter(el => !el.descr)
})

const finalSorted = computed(() => {
  return firstSorted.value.filter(el => el.title.toLowerCase().includes(sortedInput.value.toLowerCase()))
})

const delCase = (el) => {
  store.deleteTask(el)
}

const addCase = () => {
  v$.value.$touch()
  if(v$.value.$error) return false
  store.addTask(caseInput.value)
  caseInput.value = ''
  v$.value.caseInput.$reset()
}

const gotoDetails = (itemId) => {
  const idx = store.list.findIndex(el => el.id === itemId);
  router.push({ name: 'details', query: {idx: idx} })
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
  width: 120px;
  height: 32px;
  outline: none;
  margin-right: 8px;
}
.sorting input {
  width: 45%;
  height: 32px;
}
.case {
  position: relative;
  display: flex;
  justify-content: space-between;
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
.case-btn {
  cursor: pointer;
  min-width: 24px;
  min-height: 24px;
  background: transparent;
  border: none;
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
