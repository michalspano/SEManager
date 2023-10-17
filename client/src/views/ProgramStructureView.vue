<script setup>
import SEMProgramGraph from '@/components/SEMProgramGraph.vue';
import router from '@/router';

const props = defineProps({
    userType: String,
});

</script>

<template>
    <div>
        <div class="container py-4">
        <p class="fs-1 fw-bold text-center">Software Engineering and Management</p>
        <div class="d-flex justify-content-center align-items-center">
            <p class="fs-2 text-center">You're logged in as {{ userType === 'admin' ? 'an' : 'a' }}
                <span v-if="userType === 'admin'" class="fw-bold" id="admin-redirect" @click="router.push('/admin')">
                    {{ userType }}
                </span>
                <span v-else class="fw-bold">{{ userType }}</span>
            </p>
        </div>
        </div>
        <SEMProgramGraph/>
    </div>
</template>

<style scoped>
/* Additional styling when the user is an admin: go to admin's page */
#admin-redirect {
    cursor: pointer;
    padding: 0.35rem;
    border-radius: 10px;
    color: var(--highlight-color);
    border: 1px solid var(--accent-color);
    border-width: 3.5px;
}

#admin-redirect:hover {
    text-decoration: underline;
    color: var(--accent-color);
}
</style>