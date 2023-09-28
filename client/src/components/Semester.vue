<script>
import Period from '@/components/Period.vue'

export default {
    props: {
        semesterTitle: String,
        period1Courses: Array,
        period2Courses: Array
    },
    components: {
        Period
    },
}
</script>

<template>
    <div class="semesterContainer">
        <span class="semesterTitle">{{ semesterTitle }}</span>
        <div class="semester">
            <Period class="periodItem" periodTitle="Period 1" :courses="period1Courses"/>
            <div class="periodSpace"></div>
            <Period class="periodItem" periodTitle="Period 2" :courses="period2Courses"/>
        </div>
    </div>
</template>

<style>

.semesterContainer {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

.semesterTitle {
    color: white;
    font-size: 30px;
    background-color: darkblue;
    width: 100%;
    text-align: center;
}

.semester {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: green;
    justify-content: space-around;
}

.periodSpace {
    margin-left: 10px;
}

</style>