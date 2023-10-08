<template>
    <div>
        <h1>Graph test</h1>
        <div v-for="(nodeData, _) of graphData">
            <br>
            <span>{{ 'Course ' + nodeData[0]['courseCode'] + ', ' + nodeData[0]['courseName'] + ' has status ' + nodeData[0]['courseStatus'] + ' and it depends on ' }}</span>
            
            <div v-for="(dependency, _) in nodeData[1]">
                <span>{{ dependency + ' with status ' + getCourseStatus(dependency) }}</span>
            </div>
            <br>
        </div>
    </div>

    <div class="container-fluid text-center">
        <div class="row">
            <h1>Node Test</h1>
        </div>
        <div class="row gy-2">
            <div v-for="(nodeData, _) of graphData" class="col">
                <CourseNode :courseCode="nodeData[0]['courseCode']" :courseName="nodeData[0]['courseName']" :status="nodeData[0]['courseStatus']" @sending-status="testStatus"/>
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
            console.log("Update courses");
            for (var i of graphData.value.keys())
            {
                if (getCourseStatus(i['courseCode']) === 2) {
                    console.log(i['courseCode'] + ' is completed :)!');
                    continue;
                }
                let dependencies = graphData.value.get(i);
                let numberOfDependencies = dependencies.length;
                console.log(i['courseCode'] + ' has ' + numberOfDependencies + ' dependencies: ');

                const totalPoints = numberOfDependencies * 2;

                let sumOfDependenciesStatus = 0;
                for (var j of dependencies)
                {
                    sumOfDependenciesStatus += getCourseStatus(j);
                    console.log(j + ' with status ' + getCourseStatus(j));
                }

                console.log('Sum of dependencies: ' + sumOfDependenciesStatus);

                if(sumOfDependenciesStatus === totalPoints)
                {
                    console.log("Unlocked!");
                    i['courseStatus'] = 1;
                }
                else {
                    console.log("Locked :(");
                    i['courseStatus'] = 0;
                }

                console.log('\n');
            }
        }

        return { graphData, testStatus, getCourseStatus };
    },
    components: {
        CourseNode
    }
};
</script>
