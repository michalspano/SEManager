<template>
    <div class="container-fluid text-center">
        <div v-if="graphData === null" class="row gy-2 justify-content-center">
            <div class="alert alert-danger col-md-4 tex-center mt-5" role="alert">
                Server Error
            </div>
        </div>
        <div v-else class="row gy-2">
            <div class="col-md">
                <YearContainer :yearNumber="1" :yearCourses="firstYearCourses" @sending-status="testStatus"></YearContainer>
            </div>
            <div class="col-md">
                <YearContainer :yearNumber="2" :yearCourses="secondYearCourses" @sending-status="testStatus"></YearContainer>
            </div>
            <div class="col-md">
                <YearContainer :yearNumber="3" :yearCourses="thirdYearCourses" @sending-status="testStatus"></YearContainer>
            </div>
        </div>
    </div>
</template>

<style scoped>
.alert-danger {
    font-size: xx-large;
}
</style>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getCoursesGraph } from '@/api/v1/courseApi';
import YearContainer from '@/components/YearContainer.vue'
import Graph from '@/modules/Graph'

const graphData = ref(null);

const testStatus = (courseCode, status) => {
            updateCourseStatus(courseCode, status);
            updateCoursesCompletionStatus();
        };

onMounted(async () => {

    let data = generateMap(localStorage.getItem('coursesData'));

    if(!data){
        graphData.value = await getCoursesGraph();
    }
    else {
        graphData.value = data;
    }
});

const generateMap = (coursesData) => {

    let coursesArray = JSON.parse(coursesData);
    if (coursesArray === null) {
        return null;
    }

    let testMap = new Map();

    for(let course of coursesArray)
    {
        testMap.set(course[0], course[1]);
    }

    return testMap;
}

const updateCourseStatus = (courseCode, status) => {
    for (var i of graphData.value.keys())
    {
        if(i['courseCode'] === courseCode)
        {
            i['courseStatus'] = status;
        }
    }
}

const getCourseStatus = (courseCode) => {
    var targetCourse = null;
    for(var i of graphData.value.keys())
    {
        if(i['courseCode'] === courseCode)
        {
            targetCourse = i;
            break;
        }
    }
    
    return targetCourse['courseStatus'];
}

/**
 * This algorithms goes through every course and check its depedencies
 * to determine its status.
 * Status 0: Locked
 * Status 1: Unlocked
 * Status 2: Passed
 */
const updateCoursesCompletionStatus = () => {
    
    for (var i of graphData.value.keys())
    {
        let dependencies = graphData.value.get(i);
        let numberOfDependencies = dependencies.length;

        const totalPoints = numberOfDependencies * 2;

        let sumOfDependenciesStatus = 0;

        for (var j of dependencies)
        {
            sumOfDependenciesStatus += getCourseStatus(j);
        }

        if(sumOfDependenciesStatus === totalPoints && i['courseStatus'] == 2)
        {
            // Course completed!
            i['courseStatus'] = 2;
        }
        else if (sumOfDependenciesStatus === totalPoints && i['courseStatus'] != 2)
        {
            // Course unlocked :)
            i['courseStatus'] = 1;
        }
        else {
            i['courseStatus'] = 0;
        }
    }

    localStorage.setItem('coursesData', JSON.stringify(Array.from(graphData.value)));
}

/**
 * TODO: There is some repetition going on here but there's no much to do
 * I would like to make this a parameter but  vue doesn't allow it
 */
const firstYearCourses  = computed(() => {
            
    if (!graphData.value) {
        return null;
    }
    
    // Convert the Map to an array of key-value pairs
    const graphArray = Array.from(graphData.value);

    let year = 1;

    let firstTerm = (year * 2) - 1;
    let secondTerm = year * 2;


    return graphArray.filter(([key, _]) => 
        key.courseTerm === firstTerm || key.courseTerm === secondTerm
    );
});

const secondYearCourses = computed(() => {
            
    if (!graphData.value) {
        return null;
    }

    const graphArray = Array.from(graphData.value);
    
    let year = 2;

    let firstTerm = year * 2 - 1;
    let secondTerm = year * 2;

    return graphArray.filter(([key, _]) => 
        key.courseTerm === firstTerm || key.courseTerm === secondTerm
    );
});

const thirdYearCourses = computed(() => {

    if (!graphData.value) {
        return null;
    }

    const graphArray = Array.from(graphData.value);
    
    let year = 3;

    let firstTerm = year * 2 - 1;
    let secondTerm = year * 2;

    return graphArray.filter(([key, _]) => 
        key.courseTerm === firstTerm || key.courseTerm === secondTerm
    );
});

// TODO: I would like to use this function to make it automatic, but it messes up with the array
const generateCourses = (year) => {
    return computed(() => {
        if (!graphData.value) {
            return null;
        }

        const graphArray = Array.from(graphData.value);

        let firstTerm = year * 2 - 1;
        let secondTerm = year * 2;

        return graphArray.filter(([key, _]) =>
            key.courseTerm === firstTerm || key.courseTerm === secondTerm
        );
    });
}
</script>
