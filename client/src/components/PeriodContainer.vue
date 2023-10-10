<script setup>

import CourseNode from '@/components/CourseNode.vue';

const props = defineProps({
    periodNumber: Number,
    periodCourses: Array
})

const emit = defineEmits(['sending-status']);

const emitStatus = (courseCode, status) => {
            emit('sending-status', courseCode, status);
        }

</script>

<template>
    <div class="container-fluid text-center">
        <div class="row">
            <div class="col">
                <h1>{{ 'Period ' + periodNumber }}</h1>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div v-for="(courses, _) of periodCourses" class="col">
                    <CourseNode :courseCode="courses[0]['courseCode']" :courseName="courses[0]['courseName']" :status="courses[0]['courseStatus']" @sending-status="emitStatus"/>
                </div>
            </div>
        </div>
    </div>

</template>


<style scoped>

</style>