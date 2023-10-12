<template>
    <div class="container-fluid text-center period-container p-2 rounded-2">
        <div class="row">
            <div class="col">
                <h4 class="period-title">{{ 'LP' + periodNumber }}</h4>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div v-for="(courses, _) of periodCourses" class="col mb-2">
                    <CourseNode :courseCode="courses[0]['courseCode']" :courseName="courses[0]['courseName']" :status="courses[0]['courseStatus']" @sending-status="emitStatus"/>
                </div>
            </div>
        </div>
    </div>
</template>

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


<style scoped>

.period-container {
    /* border: 0.1rem solid var(--secondary-color); */
    /* background-color: beige; */
    box-shadow: 2.5px 2.5px 5px rgba(0, 0, 0, 0.2);
}

.period-title {
    font-size: 130%;
}
</style>