<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<!-- the body of the component -->
<template>
  <div>
    <Header></Header>
    <nav id="router-view">
      <!-- Render the content of the current page view -->
      <RouterView/>
    </nav>
    <Footer></Footer>
  </div>
</template>

<style scoped>
#router-view {
  min-height: 100vh;
  background-color: var(--primary-color);
  /* Make bg color consistent with the global value from main.css */                         
}
</style>
