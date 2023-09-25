<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<!-- the body of the component -->
<template>
  <nav>
    <!-- Render the content of the current page view -->
    <RouterView/>
  </nav>
</template>

<style scoped>
/* the scoped style */
</style>
