<script setup>

import { getApi } from '../api/v1/Api';
import { onMounted, ref } from 'vue'

const apiInfo = ref('');

onMounted(async () => {
    try {
        const response = await getApi();
        apiInfo.value = response.version;
    } catch {
        console.error('Problem getting API information')
        apiInfo.value = 'error'
    }
})

</script>

<template>
    <footer class="bg-light">
        <div class="container-fluid footer-container">
            <p class="text-center my-3">DIT342, Group 15 &#8208; API: <code>{{ apiInfo }}</code></p>
            <p class="text-center my-3">&#169; 2023</p>
        </div>
    </footer>
</template>

<style scoped>
.footer-container {
    font-weight: 800;
    font-size: 22px;
    padding: 5px;
}

/* Wrap the footer below on smaller devices */
@media (max-width: 756px) {
    .footer-container {
        padding: 2.5px;
        font-size: 20px;
    }
}

</style>