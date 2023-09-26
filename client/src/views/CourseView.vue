<!-- Playground environment -->

<script setup>
import Course from '@/components/Course.vue'

import { CourseApi } from '@/Api';
import { ref } from 'vue';

const jsonResponse = ref(null);

const getCourses = () => {
    CourseApi.get('/').then((response) => {
            jsonResponse.value = response.data.courses;

        })
        .catch((error) => {
            console.log(error);
        });
}
</script>

<template>
    <h1>Main course view test</h1>
    <h1>Click here to get the courses :D</h1>
    <button type="button" class="btn btn-outline-primary btn-lg" @click="getCourses">Get courses</button>

    <div class="CourseView">
        <Course
            v-for="item in jsonResponse"
            :courseName="item.courseName"
            :courseCode="item.courseCode"
            :courseStaff="item.courseStaff"
        />

        <Course
            v-for="item in jsonResponse"
            :courseName="item.courseName"
            :courseCode="item.courseCode"
            :courseStaff="item.courseStaff"
        />
    </div>
    
</template>

<style>

.CourseView {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 10px;
}

</style>
