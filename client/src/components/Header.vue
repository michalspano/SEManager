<script setup>
import { ref, watchEffect } from 'vue';

const buttonMsg = ref('Login')
const userType = ref('') // TODO: add logic from the API and token

watchEffect(() => {
    const token = localStorage.getItem('token');
    buttonMsg.value = token ? 'Logout' : 'Login'
});

</script>

<template>
    <nav class="navbar bg-body-tertiary">
        <div class="container-fluid d-flex justify-content-between">
            <a class="navbar-brand" href="/">
                <img src="@/assets/logo.gif" alt="Logo" width="50" height="50" class="d-inline-block">
                <span class="fs-4" style="font-weight: 700px;">Software Engineering &amp; Management</span>
            </a>
            <!-- TODO: align this properly -->
            <p class="fs-5" :class="userType.toLowerCase()">{{ userType }}</p>
            <a href="/login">
                <button class="btn btn-primary">{{ buttonMsg }}</button>
            </a>
        </div>
    </nav>
</template>

<style scoped>
.admin {
    color: red;
    font-weight: 800;
}

.student {
    color: green;
    font-weight: 600;
}
</style>