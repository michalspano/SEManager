<script>
import Semester from '@/components/Semester.vue'

export default {
    setup(props) {

        const firstSemesterNumber = props.yearNumber + props.yearNumber - 1; 
        const secondSemesterNumber = props.yearNumber * 2;

        return {
            firstSemesterNumber,
            secondSemesterNumber
        }
    },
    props: {
        yearNumber: Number
    },
    components: {
        Semester
    }
}
</script>

<template>
    <div class="container-fluid text-center">
        <div class="row">
            <div class="col">
                <span class="yearTitle">{{ 'Year ' + yearNumber }}</span>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <Semester :semesterNumber="firstSemesterNumber"/>
            </div>
            <div class="col">
                <Semester :semesterNumber="secondSemesterNumber"/>
            </div>
        </div>
    </div>
    <!-- <br>
    <div class="yearContainer">
            <span class="yearTitle">{{ 'Year ' + yearNumber }}</span>
            <div class="year">
                <Semester :semesterNumber="firstSemesterNumber"/>
                <div class="semesterSpace"></div>
                <Semester :semesterNumber="secondSemesterNumber"/>
            </div>
        </div> -->
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