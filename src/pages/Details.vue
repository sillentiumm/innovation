
<template>
  <div class="details">
    <div class="details-header">
      <h2 class="details-title">{{ info.title }}</h2>
      <router-link to="/">
        <svg class="goback" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 459 459" style="enable-background:new 0 0 459 459;" xml:space="preserve"><g><g id="reply"><path d="M178.5,140.25v-102L0,216.75l178.5,178.5V290.7c127.5,0,216.75,40.8,280.5,130.05C433.5,293.25,357,165.75,178.5,140.25z"/></g></g></svg>
      </router-link>
    </div>
    <div v-if="info.descr">{{ info.descr }}</div>
  </div>
</template>

<script setup>
import { useStore } from '../stores/store';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const store = useStore()
const route = useRoute();

const info = ref(store.list[route.query.idx]);
// const caseInput = ref('')

// const addDescr = () => {
//   store.addDescr(route.query.idx, caseInput.value )
// }

</script>

<style scoped>
  .details {
    width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 400;
    margin: 0 auto;
    margin-top: 24px;
    margin-bottom: 24px;
  }
  .details-header {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }
  .details-title {
    margin-right: 12px;
  }
  .details-input {
    width: 100%;
  }
  @media (max-width: 600px) {
  .details {
    width: 100%;
    padding: 12px;
  }
}
</style>