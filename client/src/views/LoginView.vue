<!-- TODO: refactor to Composition API -->
<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card mt-5">
                    <div class="card-header">
                        <h2 class="text-center">Login</h2>
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
                                <button type="submit" class="btn btn-primary" :disabled="!username || !password">Login</button>
                            </div>
                        </form>
                        <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { authenticateUser } from '@/api/v1/userApi'

export default {
    name: 'Login',
    setup() {
        const username = ref();
        const password = ref();
        const errorMessage = ref();

        // Expose the refs to the template and other API hooks
        return { username, password, errorMessage }
    },
    methods: {
        async login() {
            authenticateUser(this.username, this.password).then((response) => {
                localStorage.setItem('token', response.token);

                // TODO: redirect to some page after successful login,
                // currently, it is the dashboard with the courses.
                this.$router.push({ name: 'courses' });
            }).catch(() => {
                this.errorMessage = "Error: invalid password."
            });
        }
    }
}
</script>

<style>
</style>