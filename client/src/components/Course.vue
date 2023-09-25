<script setup>
    import { Course } from '@/Api';
    import { ref } from 'vue';

    defineProps(['title']);

    const courseCode = ref('none');
    const courseName = ref('none');
    const courseStaff = ref('none');

    const getCourse = () => {
        Course.get('/').then((response) => {
            console.log(response.data.course.courseCode);
            courseCode.value = response.data.course.courseCode;
            courseName.value = response.data.course.courseName;
            courseStaff.value = response.data.course.courseStaff;
        })
        .catch((error) => {
            console.log(error);
            courseCode.value = error;
        });
    }

</script>

<template>
    <div>
        <br>
        <button type="button" class="btn btn-outline-primary btn-lg" @click="getCourse">Get a course from the server</button>
        <br>

        <div class="square">
            <h3>{{ title }}</h3>
            <br>
            <h3>Wow so cute :3</h3>
            <!-- Course Data -->
            <strong>Course Code: {{ courseCode }}<br></strong>
            <strong>Name: {{ courseName }}<br></strong>
            <strong>Staff: {{ courseStaff }}<br></strong>
        </div>
        
    </div>
</template>

<style>
.square {
    width: 250px;
    height: 250px;
    background-color: black;
    text-align: center;
    color: white;
    padding-top: 10px;
    font-size: 10px;
    justify-content: center;
    align-items: center;
}
</style>
