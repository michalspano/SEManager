<template>
    <!-- A simple simulation of the previous template -->
    <div class="container py-4">
        <div class="p-5 mb-4 bg-body-tertiary rounded-3">
            <button type="button" class="btn btn-outline-primary btn-lg" @click="getMessage">Get Message from Server</button>
            <p>Message from the server:<br /> {{ message }}</p>
        </div>
        <h1>Try to access <code>/test</code> to <i>test</i> the <strong>router</strong>.</h1>
    </div>
</template>

<script>
import { ref } from 'vue';
import { Api } from '@/Api';

export default {
    name: 'Home',
    setup() {
        const message = ref('none');

        const getMessage = () => {
            Api.get('/')
                .then((response) => {
                    message.value = response.data.message; // Update message using .value
                })
                .catch((error) => {
                    message.value = error; // Update message using .value
                });
        };
        return {
            message,
            getMessage,
        };
    },
};
</script>

