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
                <CourseNode :courseCode="nodeData[0]['courseCode']" :courseName="nodeData[0]['courseName']" @sending-status="testStatus"/>
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

export default {
    name: 'Home',
    setup() {
        const graphData = ref(null);
        
        onMounted(async () => {
            graphData.value = await getCoursesGraph();
            console.log(graphData.value);
        });

        const testStatus = (courseCode, status) => {
            updateCourseStatus(courseCode, status);
        }

        const updateCourseStatus = (courseCode, status) => {
            for(var i of graphData.value.keys())
            {
                if(i['courseCode'] === courseCode)
                {
                    i['courseStatus'] = status;
                }
            }
        }

        return { graphData, testStatus };
    },
    methods: {
        getCourseStatus(courseCode) {
            var targetCourse = null;
            for(var i of this.graphData.keys())
            {
                if(i['courseCode'] === courseCode)
                {
                    targetCourse = i;
                    break;
                }
            }

            return targetCourse['courseStatus'];
        }
    },
    components: {
        CourseNode
    }
};
</script>
