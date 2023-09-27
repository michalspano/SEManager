<script>
import Semester from '@/components/Semester.vue'

export default {
    props: {
        yearTitle: String,
        semester1Title: String,
        semester2Title: String,
        period1Courses: Array,
        period2Courses: Array
    },
    components: {
        Semester
    }
}
</script>

<template>
    <div class="yearContainer">
            <span class="yearTitle">{{ yearTitle }}</span>
            <div class="year">
                <Semester :semesterTitle="semester1Title" :period1Courses="period1Courses" :period2Courses="period2Courses"/>
                <div class="semesterSpace"></div>
                <Semester :semesterTitle="semester2Title" :period1Courses="period1Courses" :period2Courses="period2Courses"/>
            </div>
        </div>
</template>

<style>
.yearContainer {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-color: crimson;
    padding: 10px;
    align-items: center;
}

.year {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 10px;
}

.yearTitle {
    color: white;
    font-size: 30px;
    background-color: orangered;
    width: 100%;
    text-align: center;
}

.semesterSpace {
    margin-left: 10px;
}
</style>