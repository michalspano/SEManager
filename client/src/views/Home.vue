<template>
    <!-- A simple simulation of the previous template -->
    <div class="container py-4">
        <h1 class="display-2">DIT342 Group &#45; 15</h1>
        <div class="p-5 mb-4 bg-body-tertiary rounded-3">
            <button type="button" class="btn btn-outline-primary btn-lg" @click="updateMessage">Get response</button>
            <p>The server says:<br/>{{ message }}</p>
        </div>
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
