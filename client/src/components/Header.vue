<script setup>
import { ref, onMounted } from 'vue'
import router from '@/router';
import eventBus from '@/EventBus';

// TODO: avoid magic strings
const buttonMsg = ref(localStorage.getItem('token') ? 'Logout' : 'Login')

// Receive a signal from the EventBus
onMounted(() => {
    eventBus.on('login-success', () => buttonMsg.value = 'Logout');
});

/**
 * A function that is called when the user clicks the login/logout button.
 */
const toggleLogin = () => {
    const token = localStorage.getItem('token')
    if (token) {
        localStorage.removeItem('token');

        /* An alternative approach is to emit a signal to the event bus, using the following:
         * eventBus.emit('logout-success'). However that is not required, because the change
         * of the text (indicated by such a signal) is within the component. If this event is
         * to be recognized outside, then it should be emitted accordingly.*/
        buttonMsg.value = 'Login'
        router.push('/')
    } else {
        router.push('/login')
    }
}

</script>

<template>
    <nav class="navbar bg-body-tertiary">
        <div class="container-fluid d-flex justify-content-between">
            <router-link to="/">
                <img src="@/assets/logo.gif" alt="Logo" width="50" height="50" class="d-inline-block">
            </router-link>
            <span class="fs-3 fw-bold">N1SOF</span>
            <button class="btn btn-primary" @click="toggleLogin">{{ buttonMsg }}</button>
        </div>
    </nav>
</template>

<style scoped></style>