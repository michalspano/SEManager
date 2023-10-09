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
            console.log(`Emiting status ${status} from YearContainer for ${courseCode}`);
            emit('sending-status', courseCode, status);
        }

const firstTermCourses = computed(() => {

    if (!props.yearCourses) {
        return null;
    }

    let firstTerm = (props.yearNumber * 2) - 1;
    firstSemesterNumber.value = firstTerm;

    return props.yearCourses.filter(([key, _]) => 
        key.courseTerm === firstTerm
    );
})

const secondTermCourses = computed(() => {
    
    if (!props.yearCourses) {
        return null;
    }
    
    let secondTerm = (props.yearNumber * 2);
    secondSemesterNumber.value = secondTerm;

    return props.yearCourses.filter(([key, _]) => 
    key.courseTerm === secondTerm
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
                <SemesterContainer :semesterNumber="firstSemesterNumber" :semesterCourses="firstTermCourses" @sending-status="emitStatus"></SemesterContainer>
            </div>
            <div class="col">
                <SemesterContainer :semesterNumber="secondSemesterNumber" :semesterCourses="secondTermCourses" @sending-status="emitStatus"></SemesterContainer>
            </div>
        </div>
    </div>

</template>


<style scoped>

</style>