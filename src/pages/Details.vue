
<template>
  <div class="details">
    <div class="details-header">
      <h2 class="details-title">{{ info.title }}</h2>
      <router-link to="/">
        <svg 
          class="goback" 
          viewBox="0 0 459 459" 
        >
          <path d="M178.5,140.25v-102L0,216.75l178.5,178.5V290.7c127.5,0,216.75,40.8,280.5,130.05C433.5,293.25,357,165.75,178.5,140.25z"/>
        </svg>
      </router-link>
    </div>
    <div v-if="!descrVisible && info.descr" class="details-descr">
      <svg 
        @click="changeDescrVisible"
        class="details-svg" 
        viewBox="0 0 512.008 512.008"
      >
        <path d="M504.507,79.905L432.102,7.499c-9.993-9.992-26.206-10.001-36.207,0L51.959,351.435c-2.807,2.807-4.924,6.238-6.187,10.01 L1.313,478.309c-3.063,9.199-0.674,19.336,6.187,26.197c6.861,6.861,16.998,9.25,26.197,6.187l116.864-44.459 c3.772-1.254,7.194-3.371,10.01-6.187l343.936-343.936C514.508,106.11,514.508,89.906,504.507,79.905z M25.608,486.398 l44.459-116.864l72.405,72.405L25.608,486.398z M160.571,423.841l-72.405-72.405L359.696,79.905l72.405,72.405L160.571,423.841z M450.201,134.211l-72.405-72.405l36.207-36.207l72.405,72.405L450.201,134.211z"/>
      </svg>
      <span> {{ info.descr }}</span>
    </div>

    <form 
      v-if="!info.descr" 
      @submit.prevent="acceptChangeDescr" 
      class="details-form" 
      action=""
    >
      <button>
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
      <input type="text" v-model="descrInput" placeholder="Добавить описание">
    </form>
    
    <form 
      v-if="descrVisible" 
      @submit.prevent="acceptChangeDescr" 
      @keydown.escape="cancelChangeDescr" 
      action="" 
      class="details-form"
    >
      <input type="text" v-model="descrInput">
      <button>
        <svg 
          class="details-svg" 
          viewBox="0 0 512 512"
        >
          <path d="M256,0C115.041,0,0,115.049,0,256c0,140.959,115.049,256,256,256c140.96,0,256-115.049,256-256C512,115.04,396.951,0,256,0 z M256,482C131.383,482,30,380.617,30,256S131.383,30,256,30c124.617,0,226,101.383,226,226S380.617,482,256,482z" fill="#000000" style="fill: rgb(0, 255, 42);"></path><path d="M365.396,149.182c-5.857-5.858-15.355-5.858-21.213,0L211,282.365l-58.183-58.183c-5.857-5.857-15.355-5.857-21.213,0 l-42.422,42.422c-5.858,5.858-5.858,15.355,0,21.213l111.211,111.211c2.929,2.929,6.768,4.393,10.606,4.393 s7.678-1.465,10.606-4.393l186.211-186.211c5.858-5.858,5.858-15.355,0-21.213L365.396,149.182z M211,367.209l-89.998-89.998 l21.208-21.209l58.183,58.183c5.857,5.858,15.355,5.858,21.213,0l133.183-133.182l21.209,21.209L211,367.209z" fill="#000000" style="fill: rgb(0, 255, 42);"></path>
        </svg>
      </button>

      <button @click.prevent="cancelChangeDescr">
        <svg 
          class="details-svg" 
          viewBox="0 0 286.054 286.054" 
        >
          <path style="fill:#E2574C;" d="M168.352,142.924l25.28-25.28c3.495-3.504,3.495-9.154,0-12.64l-12.64-12.649 c-3.495-3.486-9.145-3.495-12.64,0l-25.289,25.289l-25.271-25.271c-3.504-3.504-9.163-3.504-12.658-0.018l-12.64,12.649 c-3.495,3.486-3.486,9.154,0.018,12.649l25.271,25.271L92.556,168.15c-3.495,3.495-3.495,9.145,0,12.64l12.64,12.649 c3.495,3.486,9.145,3.495,12.64,0l25.226-25.226l25.405,25.414c3.504,3.504,9.163,3.504,12.658,0.009l12.64-12.64 c3.495-3.495,3.486-9.154-0.009-12.658L168.352,142.924z M143.027,0.004C64.031,0.004,0,64.036,0,143.022 c0,78.996,64.031,143.027,143.027,143.027s143.027-64.031,143.027-143.027C286.054,64.045,222.022,0.004,143.027,0.004z M143.027,259.232c-64.183,0-116.209-52.026-116.209-116.209s52.026-116.21,116.209-116.21s116.209,52.026,116.209,116.209 S207.21,259.232,143.027,259.232z"/>
        </svg>
      </button>
    </form>
  </div>
</template>

<script setup>
import router from '@/router';
import { useStore } from '../stores/store';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const store = useStore()
const route = useRoute();

const descrInput = ref('')
const descrVisible = ref(false)
const info = ref('')
const idx = store.list.findIndex((el => el.id == route.query.id))

onMounted(() => {
  if(idx == -1) {
    router.push({ name: 'main' })
    return false
  } 
  info.value = store.list[idx]
  descrInput.value = info.value.descr
})

const changeDescrVisible = () => {
  descrVisible.value = !descrVisible.value
}

const acceptChangeDescr = () => {
  store.changeDescr(idx, descrInput.value)
  descrVisible.value = false
}

const cancelChangeDescr = () => {
  descrInput.value = info.value.descr
  descrVisible.value = false
}

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
    margin-bottom: 24px;
  }
  .details-title {
    margin-right: 12px;
  }
  .details-descr {
    width: 100%;
    height: 32px;
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: 400;
  }
  .details-descr svg {
    width: 22px;
    height: 22px;
    min-width: 22px;
    min-height: 22px;
    margin-right: 10px;
    cursor: pointer;
  }
  .details-form {
    width: 100%;
    display: flex;
    align-items: center;
  }
  .details-form button {
    min-width: 30px;
    min-height: 30px;
    width: 30px;
    height: 30px;
    background: transparent;
    border: none;
    margin-left: 6px;
  }
  .details-form svg {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  .details-form input {
    width: 100%;
    margin-left:8px;
    font-size: 21px;
    font-weight: 400;
    background-color: transparent;
    outline: none;
    border: none;
  }

  @media (max-width: 600px) {
  .details {
    width: 100%;
    padding: 12px;
  }
}
</style>