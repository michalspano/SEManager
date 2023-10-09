<script setup>

import CourseInformation from '@/components/CourseInformation.vue';
import { getCourse } from '../api/v1/courseApi';
import { getCourseEmployees } from '../api/v1/courseApi';
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
let courseID = route.params.id;
const course = ref(null);
const employeesList = ref(null);

const fetchData = async (courseID) => {
    //TODO: Should we catch potential errors here?
    const [courseData, employeesData] = await Promise.all([
        getCourse(courseID),
        getCourseEmployees(courseID)
    ]);
    course.value = courseData;
    employeesList.value = employeesData;
};

onMounted(async () => {
    await fetchData(courseID);
});

//TODO: We could also use beforeRouteUpdate: https://router.vuejs.org/guide/advanced/navigation-guards.html ? 
watch(route, async (newRoute) => {
    courseID = newRoute.params.id;
    await fetchData(courseID);
});

</script>


<template>
    <div class="page-content">

        <div class="page-header">
            <div class="container-fluid">
                <div class="row row-col-4">
                    <div class="col">
                        <div class="back-button">
                            <router-link to="/courses">
                                <!-- TODO: replace with arrow vector-image as button instead? -->
                                <button type="button">Back to courses</button>
                            </router-link>
                        </div>
                    </div>
                    <div class="col">
                        <h1 class="page-title text-center fw-bold text-nowrap">Course Details:</h1>
                    </div>
                    <div class="col">
                        <!-- White space to the right of the heading -->
                    </div>
                </div>
            </div>
        </div>

        <div class="course-content">
            <div class="container">
                <div class="component">
                    <CourseInformation
                    v-if="course && employeesList"
                    :courseCode="course.courseCode"
                    :courseName="course.courseName"
                    :courseStaff="course.courseStaff"
                    :dependencies="course.dependencies"
                    :employees="employeesList"
                    ></CourseInformation>
                </div>
            </div>
        </div>
                
    </div>
</template>


<style scoped>

/* TODO: remove - only used for development */
.component {
    border-style: dotted;
    border-color: red;
}
.course-content {
    border-style: dotted;
    border-color: blue;
}
.page-content {
    border-style: dotted;
    border-color:forestgreen;
}
</style>
