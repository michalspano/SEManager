<script setup>

import { defineProps } from 'vue';

const props = defineProps({
    courseCode: String,
    courseName: String,
    courseStaff: Array,
    dependencies: Array
})

</script>


<template>
    <div class="container">

        <div class="course-title">
            <h2 class="fw-bold">{{ props.courseCode }}: {{ props.courseName }}</h2>
        </div>

        <div class="course-staff">
            <p class="staff">
                <b>Course staff: </b>
                <!-- TODO: add functionality for pop-up component -->
                <span
                    v-for="(name, index) in courseStaff"
                    :key="index"
                    class="staff-name"
                >
                    {{ name }}<span v-if="index < courseStaff.length - 1">, </span>
                </span>
            </p>
        </div>

        <div class="course-dependencies">
            <p>
                <b>Dependencies: </b>
                <!-- TODO: if-else to show "-" if there are no dependencies -->
                <span v-if="dependencies.length <= 0">-</span>
                <span v-else
                    v-for="(course, index) in dependencies"
                    :key="index"
                    class="prerequisite-courses"
                >
                    <router-link :to="'/courses/' + course">{{ course }}</router-link><span v-if="index < dependencies.length - 1">, </span>
                </span>
            </p>
        </div>
        
    </div>
</template>


<style scoped>
p {
    color: black;
    font-family: 'Courier New', Courier;
    font-size: 150%;
}

</style>
