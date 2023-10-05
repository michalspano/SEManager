<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>

<!-- the body of the component -->
<template>
  <Header/>
  <nav>
    <!-- Render the content of the current page view -->
    <RouterView/>
  </nav>
  <Footer/>
</template>

<style scoped>
/* the scoped style */
</style>
