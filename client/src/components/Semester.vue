<script>
import Period from '@/components/Period.vue'

export default {
    setup(props) {
        /*
        * If the semester is odd, the periods will always be 1 and 2
        * If the semester is even, the periods will always be 3 and 4
        */
        const semester = props.semesterNumber;
        const first = semester % 2 != 0 ? 1 : 3; 
        const second = semester % 2 != 0 ? 2 : 4;

        return {
            first,
            second
        }
    },
    props: {
        semesterNumber: Number
    },
    components: {
        Period
    }
}
</script>

<template>
    <div class="semesterContainer">
        <span class="semesterTitle">{{ 'Semester ' + semesterNumber }}</span>
        <div class="semester">
            <Period class="periodItem" :semesterNumber="semesterNumber" :periodNumber="first"/>
            <div class="periodSpace"></div>
            <Period class="periodItem" :semesterNumber="semesterNumber" :periodNumber="second"/>
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