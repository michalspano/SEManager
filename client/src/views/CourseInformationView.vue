<script setup>

import CourseInformation from '@/components/CourseInformation.vue';
import { getCourse } from '../api/v1/courseApi';
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
let courseID = route.params.id;
const course = ref(null);

onMounted(async () => {
    //TODO: Should we catch potential errors here?
    course.value = await getCourse(courseID);
});

watch(route, async (newRoute) => {
    courseID = newRoute.params.id;
    course.value = await getCourse(courseID);
});

</script>


<template>
    <div>

        <div class="back-button">
            <router-link to="/courses">
                <!-- TODO: replace with arrow vector-image as button instead? -->
                <button type="button">Back</button>
            </router-link>
        </div>

        <div class="page-title">
            <h1>Course Details:</h1>
        </div>
        
        <div class="course-info-component">
            <!-- TODO: double check prop names -->
            <CourseInformation
            v-if="course"
            :courseCode="course.courseCode"
            :courseName="course.courseName"
            :courseStaff="course.courseStaff"
            :dependencies="course.dependencies"
            ></CourseInformation>
        </div>

    </div>
</template>


<style scoped>

</style>
