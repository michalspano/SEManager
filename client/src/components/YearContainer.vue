<script setup>

import { ref, computed } from 'vue';
import SemesterContainer from '@/components/SemesterContainer.vue';

const props = defineProps({
    yearNumber: Number,
    yearCourses: Array
})

const firstSemesterNumber = ref(null);
const secondSemesterNumber = ref(null);

const emit = defineEmits(['sending-status']);

const emitStatus = (courseCode, status) => {
            emit('sending-status', courseCode, status);
        }

const getFirstSemesterCourses = computed(() => {

    if (!props.yearCourses) {
        return null;
    }

    let firstSemester = (props.yearNumber * 2) - 1;
    firstSemesterNumber.value = firstSemester;

    return props.yearCourses.filter(([key, _]) => 
        key.courseTerm === firstSemester
    );
})

const getSecondSemesterCourses = computed(() => {
    
    if (!props.yearCourses) {
        return null;
    }
    
    let secondSemester = (props.yearNumber * 2);
    secondSemesterNumber.value = secondSemester;

    return props.yearCourses.filter(([key, _]) => 
    key.courseTerm === secondSemester
    );
})

</script>

<template>
    <div class="container-fluid text-center">
        <div class="row">
            <div class="col">
                <h1 class="yearTitle">{{ 'Year ' + yearNumber }}</h1>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <SemesterContainer :semesterNumber="firstSemesterNumber" :semesterCourses="getFirstSemesterCourses" @sending-status="emitStatus"></SemesterContainer>
            </div>
            <div class="col">
                <SemesterContainer :semesterNumber="secondSemesterNumber" :semesterCourses="getSecondSemesterCourses" @sending-status="emitStatus"></SemesterContainer>
            </div>
        </div>
    </div>

</template>


<style scoped>

</style>