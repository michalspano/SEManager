<script setup>

import EmployeePopUp from '@/components/EmployeePopUp.vue';
import { onMounted, onUnmounted, ref } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';

const props = defineProps({
    //Course data
    courseCode: String,
    courseName: String,
    courseStaff: Array,
    dependencies: Array,

    //Employees data
    employees: Array
})

const activePopUp = ref(null);

const togglePopUp = (index) => {
    if (index === activePopUp.value) {
        hidePopUp();
    } else {
        activePopUp.value = index;
    }
}

const hidePopUp = () => {
    activePopUp.value = null;
}

const handleClickEvent = (event) => {
    const popUpElement = document.querySelector('.employee-pop-up');
    const staffNameElements = document.getElementsByClassName('staff-name');
    let eventInNames = false;
    for (let i = 0; i < staffNameElements.length; i++) {
        if (staffNameElements[i].contains(event.target)) {
            eventInNames = true;
        }
    }
    if (activePopUp.value !== null && !popUpElement.contains(event.target) && !eventInNames) {
        hidePopUp();
    }
}

onMounted(() => {
    window.addEventListener('mousedown', handleClickEvent);
    window.addEventListener('touchstart', handleClickEvent);
})

onUnmounted(() => {
    window.removeEventListener('mousedown', handleClickEvent);
    window.removeEventListener('touchstart', handleClickEvent);
})

onBeforeRouteUpdate(() => {
    hidePopUp();
})

</script>


<template>
    <div class="container">

        <div class="course-title">
            <h2 class="fw-bold">{{ props.courseCode }}: {{ props.courseName }}</h2>
        </div>
        
        <div class="course-staff fs-5 mt-2" v-if="employees">
            <span class="sub-heading">Course staff: </span>
            <span
                v-for="(employee, index) in employees"
                :key="index"
            >
                <span class="staff-name hyper-link" @click="togglePopUp(index)">{{ employee.name }}</span>
                <span v-if="index < employees.length - 1">, </span>
            </span>
        </div>

        <div class="course-dependencies fs-5 mt-2 mb-2">
            <span class="sub-heading">Dependencies: </span>
            <span v-if="dependencies.length <= 0">-</span>
            <span v-else
                v-for="(course, index) in dependencies"
                :key="index"
                class="prerequisite-courses"
            >
                <router-link :to="'/courses/' + course" class="hyper-link">{{ course }}</router-link><span v-if="index < dependencies.length - 1">, </span>
            </span>
        </div>

        <div class="pop-up row justify-content-center pb-3">
            <EmployeePopUp v-if="activePopUp !== null"
            :emailAddress="employees[activePopUp].emailAddress"
            :name="employees[activePopUp].name"
            :contactInfo="employees[activePopUp].contactInfo"
            @close="hidePopUp"
            class="col-sm-auto"
            ></EmployeePopUp>
        </div>

    </div>
</template>

<style scoped>
.course-title {
    color: var(--highlight-color)
}
.sub-heading {
    color: var(--tertiary-color);
    font-weight: bold;
}
.staff-name {
    user-select: none;
}
.hyper-link {
    text-underline-offset: 1.5px;
    color: var(--accent-color);
    text-decoration: none;
    cursor: pointer;
}
.hyper-link:hover {
    color: var(--highlight-color);
    text-decoration: underline;
}
</style>
