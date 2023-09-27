<!-- Playground environment -->

<script setup>
import Semester from '@/components/Semester.vue'
import Year from '@/components/Year.vue'
import { ref } from 'vue'

// I don't know how to get the data so for now I'm just doing dummy data lmao :((( I wanna die I don't understand javascript fr fr
// Why is it called javascript? It doesn't have anything to do with java... I miss java :(

const period1Courses = ref([
    { courseCode: "DIT001", courseName: "Cringe 1", courseStaff: "ABC"},
    { courseCode: "DIT002", courseName: "Cringe 2", courseStaff: "DEF"}
])

const period2Courses = ref([
    { courseCode: "DIT420", courseName: "Cringe Advanced", courseStaff: "ABC"},
    { courseCode: "DIT421", courseName: "Cringe Expert", courseStaff: "DEF"}
])
</script>


<template>
    <div class="mainContainer">
        <h1>Main course view test</h1>

        <div class="programStructure">
            <Year yearTitle="Year 1" semester1Title="Semester 1" semester2Title="Semester 2" :period1Courses="period1Courses" :period2Courses="period2Courses"/>
            <Year yearTitle="Year 2" semester1Title="Semester 3" semester2Title="Semester 4" :period1Courses="period1Courses" :period2Courses="period2Courses"/>
        </div>
    </div>
    
</template>

<style>

.mainContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.programStructure {
    display: flex;
    flex-direction: row;
    align-items: center;
}

</style>
