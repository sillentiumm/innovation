<script setup>
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
// import Main from './pages/Main.vue'
</script>

<template>
  <Suspense>
    <router-view>
    </router-view>
  </Suspense>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.addtask {
  width: 600px;
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 8px;
  padding: 12px 24px;
}
.addtask-btn {
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  margin-right: 12px;
  cursor: pointer;
}
.addtask-img {
  width: 24px;
  height: 24px;
}
.addtask-input {
  border: none;
  outline: none;
  font-size: 18px;
  font-weight: 400;
}
.addtask-error {
  color: #EF4343;
  align-self: flex-end;
  margin-left: auto;
  margin-right: 0;
}

.goback {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

@media (max-width: 600px)  {
  .addtask {
    width: 100%;
    padding: 12px;
  }
  .addtask-input {
    width: 100%;
  }
}

</style>
