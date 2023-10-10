<template>
    <div class="container-fluid text-center">
        <div class="row">
            <h1>SEM Program Structure</h1>
        </div>
        <div class="row gy-2">
            <div class="col">
                <YearContainer :yearNumber="1" :yearCourses="firstYearCourses" @sending-status="testStatus"></YearContainer>
            </div>
            <div class="col">
                <YearContainer :yearNumber="2" :yearCourses="secondYearCourses" @sending-status="testStatus"></YearContainer>
            </div>
            <div class="col">
                <YearContainer :yearNumber="3" :yearCourses="thirdYearCourses" @sending-status="testStatus"></YearContainer>
            </div>
        </div>
    </div>
    
    <div>
        EMTPY SPACE BECAUSE OF THE FOOTER THAT DOENS"T LET ME SEE ANYTHING ASFJKFJDKFSDJKFDKJ
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
    </div>

</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getCoursesGraph } from '@/api/v1/courseApi';
import YearContainer from '@/components/YearContainer.vue'

const graphData = ref(null);

const testStatus = (courseCode, status) => {
            updateCourseStatus(courseCode, status);
            updateCoursesCompletionStatus();
        };

onMounted(async () => {
    graphData.value = await getCoursesGraph();
});

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

const updateCoursesCompletionStatus = () => {
     // Go through all the courses and see if the dependencies are fulfilled
    // If the dependencies have both status 2, then unlock the course (set status 1)
    // If not, set status 0 (locked)
    // console.log("Update courses");
    for (var i of graphData.value.keys())
    {
        if (getCourseStatus(i['courseCode']) === 2) {
            // console.log(i['courseCode'] + ' is completed :)!');
            continue;
        }
        let dependencies = graphData.value.get(i);
        let numberOfDependencies = dependencies.length;
        // console.log(i['courseCode'] + ' has ' + numberOfDependencies + ' dependencies: ');

        const totalPoints = numberOfDependencies * 2;

        let sumOfDependenciesStatus = 0;
        for (var j of dependencies)
        {
            sumOfDependenciesStatus += getCourseStatus(j);
            // console.log(j + ' with status ' + getCourseStatus(j));
        }

        // console.log('Sum of dependencies: ' + sumOfDependenciesStatus);

        if(sumOfDependenciesStatus === totalPoints)
        {
            // console.log("Unlocked!");
            i['courseStatus'] = 1;
        }
        else {
            // console.log("Locked :(");
            i['courseStatus'] = 0;
        }

        console.log('\n');
    }
}

/*
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
