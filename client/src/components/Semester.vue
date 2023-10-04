<script>
import Period from '@/components/Period.vue'

export default {
    props: {
        semesterNumber: Number,
        firstPeriod: Number,
        secondPeriod: Number
    },
    components: {
        Period
    },
}
</script>

<template>
    <div class="semesterContainer">
        <span class="semesterTitle">{{ 'Semester ' + semesterNumber }}</span>
        <div class="semester">
            <Period class="periodItem" :semesterNumber="semesterNumber" :periodNumber="firstPeriod"/>
            <div class="periodSpace"></div>
            <Period class="periodItem" :semesterNumber="semesterNumber" :periodNumber="secondPeriod"/>
        </div>
    </div>
</template>

<style scoped>

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