<template>

    <div class="container-fluid text-center">
        <div class="row">
            <h1>Node Test</h1>
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

<script>
import { ref, onMounted } from 'vue';
import { getCoursesGraph } from '@/api/v1/courseApi';
import CourseNode from '@/components/CourseNode.vue';
import YearContainer from '@/components/YearContainer.vue'

//TODO: I know how to fix the rest, I just need to pass the term and period to the objects in the graph
// With that I should be able to organize them in the grid without any problem

export default {
    name: 'Home',
    setup() {
        const graphData = ref(null);
        
        onMounted(async () => {
            graphData.value = await getCoursesGraph();
        });

        const testStatus = (courseCode, status) => {
            updateCourseStatus(courseCode, status);
            updateCoursesCompletionStatus();
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

        return { graphData, testStatus, getCourseStatus };
    },
    components: {
        CourseNode,
        YearContainer
    },
    computed: {
        firstYearCourses() {
            
            if (!this.graphData) {
                return null;
            }
            
            // Convert the Map to an array of key-value pairs
            const graphArray = Array.from(this.graphData);

            // I would like to make this a parameter but vue doesn't allow it
            // TODO: There is some repetition going on here but there's no much to do
            // Otherwise it looks too bloated
            let year = 1;

            let firstTerm = (year * 2) - 1;
            let secondTerm = year * 2;


            return graphArray.filter(([key, _]) => 
                key.courseTerm === firstTerm || key.courseTerm === secondTerm
            );
        },
        secondYearCourses() {
            
            if (!this.graphData) {
                return null;
            }

            let year = 2;

            let firstTerm = year * 2 - 1;
            let secondTerm = year * 2;
            
            // Convert the Map to an array of key-value pairs
            const graphArray = Array.from(this.graphData);

            return graphArray.filter(([key, _]) => 
                key.courseTerm === firstTerm || key.courseTerm === secondTerm
            );
        },
        thirdYearCourses() {
            
            if (!this.graphData) {
                return null;
            }

            let year = 3;

            let firstTerm = year * 2 - 1;
            let secondTerm = year * 2;
            
            // Convert the Map to an array of key-value pairs
            const graphArray = Array.from(this.graphData);

            return graphArray.filter(([key, _]) => 
                key.courseTerm === firstTerm || key.courseTerm === secondTerm
            );
        }
    },
};
</script>
