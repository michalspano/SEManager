<script setup>
import AdminManual from '@/components/AdminManual.vue';
import AdminDeleteSelector from '@/components/AdminDeleteSelector.vue';
import AdminActionSelector from '@/components/AdminActionSelector.vue';
</script>

<template>
    <div class="container-fluid py-4">
        <router-link to="/courses">
            <img src="@/assets/back-icon.png" alt="Back to courses" id="nav-back-icon" width="75" height="75"
                class="d-inline-block">
        </router-link>
    </div>
    <div class="container">
        <div class="row">
            <!-- Note: herein, the layout changes at large, so that the text size is not too small -->
            <div class="col-lg-6">
                <div class="container py-3">
                    <AdminActionSelector />
                </div>
            </div>
            <div class="col-lg-6">
                <div class="container py-3">
                    <AdminDeleteSelector />
                </div>
                <div class="container py-3">
                    <AdminManual />
                </div>
            </div>
        </div>
    </div>
</template>