<script setup>

import EmployeePopUp from '@/components/EmployeePopUp.vue';

const props = defineProps({
    //Course data
    courseCode: String,
    courseName: String,
    courseStaff: Array,
    dependencies: Array,

    //Employees data
    employees: Array
})

</script>


<template>
    <div class="container">

        <div class="course-title">
            <h2 class="fw-bold">{{ props.courseCode }}: {{ props.courseName }}</h2>
        </div>

        <div class="course-staff" v-if="employees">
            <p class="staff">
                <b>Course staff: </b>
                <!-- TODO: add functionality for pop-up component -->
                <span
                    v-for="(employee, index) in employees"
                    :key="index"
                    class="staff-name"
                >
                    {{ employee.name }}<span v-if="index < employees.length - 1">, </span>
                </span>
            </p>
        </div>

        <div class="course-dependencies">
            <p>
                <b>Dependencies: </b>
                <span v-if="dependencies.length <= 0">-</span>
                <span v-else
                    v-for="(course, index) in dependencies"
                    :key="index"
                    class="prerequisite-courses"
                >
                    <router-link :to="'/courses/' + course">{{ course }}</router-link><span v-if="index < dependencies.length - 1">, </span>
                </span>
            </p>
        </div>

        <!-- TEST EMPLOYEE DATA HERE -->
        <div class="employee-data-test">
            <EmployeePopUp
            v-for="(employee, index) in employees"
            :key="index"
            :emailAddress="employee.emailAddress"
            :name="employee.name"
            :contactInfo="employee.contactInfo"
            ></EmployeePopUp>
        </div>
        
    </div>
</template>


<style scoped>
p {
    color: black;
    font-family: 'Courier New', Courier;
    font-size: 150%;
}
.employee-data-test {
    border-style: dotted;
    border-color: black;

}
</style>
