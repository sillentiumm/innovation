import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  const list = reactive([
    {id: 0, title: 'first case', descr:'очень важная задача'},
    {id: 1, title: 'second case'},
    {id: 3, title: '3 case'}
  ])

  const addTask = (task) => {
    const lastIdx = list.at(-1).id
    list.push({id:lastIdx+1, title:task})
  }

  const deleteTask = (task) => {
    const idx = list.findIndex(el => el.id === task.id);
    list.splice(idx, 1)
  }

  const addDescr = (idx, descr) => {
    console.log(idx)
    console.log(descr)
    list[idx].descr = descr
  }

  return { count, doubleCount, increment, list, addTask, deleteTask, addDescr }
})
