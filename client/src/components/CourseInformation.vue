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
            <p>{{ props.courseCode }}: {{ props.courseName }}</p>
        </div>

        <div class="course-staff">
            <p>
                Course staff:
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
                Dependencies:
                <!-- TODO: if-else to show "-" if there are no dependencies -->
                <span
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
    font-family: 'Courier New', Courier, monospace;
    margin: 0;
    font-size: 130%;
}
</style>
