<template>
    <!-- A simple simulation of the previous template -->
    <div class="container py-4">
        <div class="p-5 mb-4 bg-body-tertiary rounded-3">
            <button type="button" class="btn btn-outline-primary btn-lg" @click="updateMessage">Get Message from
                Server</button>
            <p>Message from the server:<br /> {{ message }}</p>
        </div>
        <h1>Try to access <code>/test</code> to <i>test</i> the <strong>router</strong>.</h1>
    </div>
</template>

<script>
import { ref } from 'vue';
import { getApi } from '@/api/v1/Api';

export default {
    name: 'Home',
    setup() {
        const message = ref('none');
        return { message };
    },
    methods: {
        async updateMessage() {
            const response = await getApi()
            this.message = response.api_info.description
        }
    }
};
</script>

