<script setup>
import AdminDeleteSelector from '@/components/AdminDeleteSelector.vue';
import AdminActionSelector from '@/components/AdminActionSelector.vue';
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <div class="container py-3">
                    <div class="p-4 bg-body-tertiary rounded-4 subtle-shadow">
                        <p class="fs-1 fw-bolder mx-2">Add/Update</p>
                        <AdminActionSelector />
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="container py-3">
                    <div class="p-4 bg-body-tertiary rounded-4 subtle-shadow">
                        <p class="fs-1 fw-bolder mx-2">Delete</p>
                        <AdminDeleteSelector/>
                    </div>
                </div>
                <h1>TODO: ADD LAST CONTAINER</h1>
            </div>
        </div>
    </div>
</template>