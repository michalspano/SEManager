<template>
    <!-- A simple simulation of the previous template -->
    <div class="container py-4">
        <h1 class="display-2">DIT342 Group &#45; 15</h1>
        <div class="p-5 mb-4 bg-body-tertiary rounded-3">
            <button type="button" class="btn btn-outline-primary btn-lg" @click="updateMessage">Get response</button>
            <p>The server says:<br/>{{ message }}</p>
        </div>
    </div>

    <div>
        <h1>Graph test</h1>
        <p v-for="(nodeData, key) of graphData" :key="key">
            <p>{{ 'Course ' + nodeData[0]['courseCode'] + ', '
            + nodeData[0]['courseName'] + ' has status '
            + nodeData[0]['courseStatus'] + ' and it depends on ' }}</p>
            <div v-for="(dependency, _) in nodeData[1]">
                <p>{{ dependency + ' with status ' + getCourseStatus(dependency) }}</p>
            </div>
            <br>
        </p>
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
import { getApi } from '@/api/v1/Api';
import { getCoursesGraph } from '@/api/v1/courseApi';
import CourseNode from '@/components/CourseNode.vue';

export default {
    name: 'Home',
    setup() {
        const message = ref('none');
        const graphData = ref(null);
        
        onMounted(async () => {
            console.log("Test Graph :)");
            graphData.value = await getCoursesGraph();
            console.log(graphData.value);
        });

        const testStatus = (courseCode, status) => {
            console.log(`${courseCode} status: ${status}`);
            updateCourseStatus(courseCode, status);
        }

        const updateCourseStatus = (courseCode, status) => {
            console.log(`Updating course status for ${courseCode} | ${status}`);
            
            for(var i of graphData.value.keys())
            {
                if(i['courseCode'] === courseCode)
                {
                    i['courseStatus'] = status;
                }
            }
        }

        return { message, graphData, testStatus };
    },
    methods: {
        async updateMessage() {
            const response = await getApi()
            this.message = response.api_info.description
        },
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
