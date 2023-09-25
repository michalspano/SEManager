<script setup>

    import Course from "@/components/Course.vue";
    import { ref } from "vue";
    import { Courses } from "../Api";

    const count = ref(0);
    const jsonResponse = ref(null);

    function increment() {
        count.value++;
    }

    function getCourses() {
        Courses.get('/').then((response) => {
            console.log(response);
            jsonResponse.value = JSON.stringify(response.data.courses[0], null, 2);
        }).catch((error) => {
            console.log(error);
        });
    }

</script>

<!-- I'm assuming that somwhere here is where I'm supposed to do the logic for rendering multiple courses -->

<template>
    <h1>Press this button :D</h1>
    <button type="button" class="btn btn-outline-primary btn-lg" @click="increment">Here: {{ count }}</button>
    
    <br><br>

    <h1>Click here to get the courses</h1>
    <button type="button" class="btn btn-outline-primary btn-lg" @click="getCourses">Get courses</button>

    <br>
    <br>

    <!-- Display JSON -->
    <pre>{{ jsonResponse }}</pre>

    <Course title="Big titty course"/>
    <Course title="Fucking stupid course"/>
</template>
