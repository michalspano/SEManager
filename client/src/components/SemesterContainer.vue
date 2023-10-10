<template>
    <div class="container-fluid text-center semester-container">
        <div class="row">
            <div class="col">
                <h3 class="semester-title p-1">{{ 'Semester ' + semesterNumber }}</h3>
            </div>
        </div>
        <div class="row">
            <div class="col mb-1">
                <PeriodContainer :periodNumber="firstPeriodNumber" :periodCourses="firstPeriodCourses" @sending-status="emitStatus"></PeriodContainer>
            </div>
            <div class="col">
                <PeriodContainer :periodNumber="secondPeriodNumber" :periodCourses="secondPeriodCourses" @sending-status="emitStatus"></PeriodContainer>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref, computed } from 'vue';
import PeriodContainer from '@/components/PeriodContainer.vue';

const props = defineProps({
    semesterNumber: Number,
    semesterCourses: Array
})

const firstPeriodNumber = ref(null);
const secondPeriodNumber = ref(null);

const emit = defineEmits(['sending-status']);

const emitStatus = (courseCode, status) => {
            emit('sending-status', courseCode, status);
        }

const firstPeriodCourses = computed(() => {

    if (!props.semesterCourses) {
        return null;
    }

    let firstPeriod = 0;

    // If the semester is even, first period is always 3
    if (props.semesterNumber % 2 == 0) {
        firstPeriod = 3;
    } else {
        firstPeriod = 1;
    }

    firstPeriodNumber.value = firstPeriod;

    return props.semesterCourses.filter(([key, _]) => 
        key.coursePeriod === firstPeriod
    );
})

const secondPeriodCourses = computed(() => {

    if (!props.semesterCourses) {
        return null;
    }

    let secondPeriod = 0;

    if (props.semesterNumber % 2 == 0) {
        secondPeriod = 4;
    }
    else {
        secondPeriod = 2;
    }

    secondPeriodNumber.value = secondPeriod;

    return props.semesterCourses.filter(([key, _]) =>
        key.coursePeriod === secondPeriod
    );

});

</script>

<style scoped>

.semester-title {
    font-size: 150%;
    color: var(--primary-color);
    background-color: var(--secondary-com-color);
}

</style>