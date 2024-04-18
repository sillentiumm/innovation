import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('counter', () => {
  const list = reactive([])

  const addTask = (taskName) => {
    let lastIdx = 0
    if(list[0]) lastIdx = list.at(-1).id
    list.push({id: lastIdx+1, title:taskName, complete: false, descr:''})
  }

  const deleteTask = (idx) => {
    list.splice(idx, 1)
  }

  const changeDescr = (idx, data) => {
    list[idx].descr = data
  }

  const changeComplete = (idx) => {
    list[idx].complete = !list[idx].complete
  }

  return { list, addTask, deleteTask, changeDescr, changeComplete }
})
