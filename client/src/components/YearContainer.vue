<template>
    <div class="container-fluid text-center year-container p-2">
        <div class="row">
            <div class="col">
                <h2 class="year-title p-1">{{ 'Year ' + yearNumber }}</h2>
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


<style scoped>

.year-container {
    border: 0.1rem solid var(--secondary-color);
    box-shadow: 5px 5px 1px rgba(0, 0, 0, 0.4);
}
.year-title {
    font-size: 180%;
    color: var(--primary-color);
    background-color: var(--primary-com-color);
}

</style>