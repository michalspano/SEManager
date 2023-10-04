<script>
import Semester from '@/components/Semester.vue'

export default {
    setup(props) {

        const firstTerm = props.year + props.year - 1; 
        const secondTerm = props.year * 2;

        return {
            firstTerm,
            secondTerm
        }
    },
    props: {
        year: Number
    },
    components: {
        Semester
    }
}
</script>

<template>
    <div class="yearContainer">
            <span class="yearTitle">{{ 'Year ' + year }}</span>
            <div class="year">
                <Semester :semesterNumber="firstTerm" :firstPeriod="1" :secondPeriod="2"/>
                <div class="semesterSpace"></div>
                <Semester :semesterNumber="secondTerm" :firstPeriod="3" :secondPeriod="4"/>
            </div>
        </div>
</template>

<style scoped>
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