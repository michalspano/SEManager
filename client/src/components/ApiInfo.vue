<script setup>

import { ref, onMounted } from 'vue';
import { getApi } from '@/api/v1/Api';

const apiInfo = ref({})
const apiErrorMsg = ref('')
const isApiInfoVisible = ref(false)

/**
 * Get the API information from the server and update the refs.
 */
onMounted(async () => {
    try {
        apiInfo.value = await getApi('/')
    } catch (error) {
        apiErrorMsg.value = error.message
    }
})

/**
 * Function to toggle the visibility of the API information.
 */
const toggleInfoVisibility = () => {
    isApiInfoVisible.value = !isApiInfoVisible.value;
}
</script>

<template>
    <div class="card border-none pastel-bg-primary subtle-shadow" style="border: none;">
        <div class="card-header">
            <p class="fs-3 card-title">API Version Information</p>
            {{ apiErrorMsg ? `Error: ${apiErrorMsg}` : '' }}
        </div>
        <div class="card-body">
            <button @click="toggleInfoVisibility" class="btn btn-primary mb-3" :class="{ 'disabled': apiErrorMsg }">
                <!-- Display the 2 toggle states (show/hide) or disallow text -->
                {{ !apiErrorMsg ? (isApiInfoVisible ? 'Hide API Info' : 'Show API Info') : 'Unavailable' }}
            </button>

            <dl class="row" v-if="isApiInfoVisible && !apiErrorMsg">
                <dt class="col-sm-3">Version:</dt>
                <dd class="col-sm-9">{{ apiInfo.version }}</dd>

                <dt class="col-sm-3">Release Date:</dt>
                <dd class="col-sm-9">{{ apiInfo.api_info.releaseDate }}</dd>

                <dt class="col-sm-3">Description:</dt>
                <dd class="col-sm-9">{{ apiInfo.api_info.description }}</dd>

                <dt class="col-sm-3">Authors:</dt>
                <dd class="col-sm-9">
                    <ul>
                        <li v-for="author in apiInfo.api_info.authors" :key="author">{{ author }}</li>
                    </ul>
                </dd>
            </dl>
        </div>
    </div>
</template>

<style scoped></style>
