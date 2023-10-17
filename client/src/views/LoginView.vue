<script setup>
import { ref } from 'vue'
import { authenticateUser } from '@/api/v1/userApi'
import eventBus from '@/EventBus'
import router from '@/router'

const username = ref('')
const password = ref('')
const errorMessage = ref('')

/**
 * A function that is called when the user clicks the login button.
 * It sends a request to the server to authenticate the use and returns a token.
 * @emits login-success - a signal that is emitted when the login is successful.
 * @uses authenticateUser - function to perform the authentication on the server.
 */
const login = async () => {
    authenticateUser(username.value, password.value)
        .then((response) => {
            localStorage.setItem('token', response.token)

            eventBus.emit('login-success')
            router.push('/courses')
        }).catch(() => {
            errorMessage.value = "Error: invalid password."
        });
}
</script>

<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card mt-5 login-card subtle-shadow">
                    <div class="card-header">
                        <p class="text-center mt-2 fs-2 fw-bolder">Login</p>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="login">
                            <div class="mb-3">
                                <label for="username" class="form-label">Username:</label>
                                <input type="text" class="form-control" id="username" v-model="username" required />
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password:</label>
                                <input type="password" class="form-control" id="password" v-model="password" required />
                            </div>
                            <div class="text-center">
                                <button type="submit" class="btn btn-primary btn-lg"
                                    :disabled="!username || !password">Login</button>
                            </div>
                        </form>
                        <p v-if="errorMessage" class="text-danger mt-3 fs-5">{{ errorMessage }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.login-card {
    border-width: 2.5px;
    border-style: outset;
    border-color: var(--accent-color);
}
</style>