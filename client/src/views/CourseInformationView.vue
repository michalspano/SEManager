<script setup>

import CourseInformation from '@/components/CourseInformation.vue';
import { getCourse } from '@/api/v1/courseApi';
import { getCourseEmployees } from '@/api/v1/courseApi';
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
let courseID = route.params.id;
const course = ref(null);
const employeesList = ref(null);
const errorMsg = ref('');

const fetchData = async (courseID) => {
    try {
        const [courseData, employeesData] = await Promise.all([
            getCourse(courseID),
            getCourseEmployees(courseID)
        ]);
        course.value = courseData;
        employeesList.value = employeesData;
    } catch (error) {
        errorMsg.value = error.message;
    }
};

onMounted(async () => {
    await fetchData(courseID);
});

watch(route, async (newRoute) => {
    courseID = newRoute.params.id;
    await fetchData(courseID);
});

</script>


<template>
    <div class="page-content">

        <div class="page-header">
            <div class="container-fluid">
                <router-link to="/courses">
                    <img src="@/assets/back-icon.png" alt="Back to courses" id="nav-back-icon" width="75" height="75"
                        class="d-inline-block mt-3">
                </router-link>
                <h1 class="page-title text-center fw-bold text-nowrap">Course Details:</h1>
            </div>
        </div>

        <div class="course-content container justify-content-center bg-light rounded-2">
            <CourseInformation
            v-if="course && employeesList && !errorMsg"
            :courseCode="course.courseCode"
            :courseName="course.courseName"
            :courseStaff="course.courseStaff"
            :dependencies="course.dependencies"
            :employees="employeesList"
            ></CourseInformation>
            <div class="text-danger p-2" v-if="errorMsg">Unable to fetch course data from server: {{ errorMsg }}</div>
        </div>
                
    </div>
</template>


<style scoped>
.page-title {
    color: var(--tertiary-color);
}
.course-content {
    box-shadow: 1px 1px 6px 2px rgba(0, 0, 0, 0.1);
}
</style>
