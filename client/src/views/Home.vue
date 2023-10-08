<template>
    <!-- A simple simulation of the previous template -->
    <div class="container py-4">
        <h1 class="display-2">DIT342 Group &#45; 15</h1>
        <div class="p-5 mb-4 bg-body-tertiary rounded-3">
            <button type="button" class="btn btn-outline-primary btn-lg" @click="updateMessage">Get response</button>
            <p>The server says:<br/>{{ message }}</p>
        </div>
    </div>

    <div class="container py-4">
        <h1>Update Test</h1>
        <button type="button" class="btn btn-danger" @click="updateInfo">Danger</button>
    </div>

    <!-- <div>
        <h1>Graph test</h1>
        <p>{{ graphData }}</p>
        <p v-for="(nodeData, _) of graphData">
            <p>{{ 'Course: ' + nodeData[0] + ' has'}}</p>
            <div v-for="(value, _) in nodeData[1]">
                <p>{{ value }}</p>
            </div>
        </p>

    </div> -->

    <div>
        <h1>Graph test</h1>
        <!-- <p>{{ graphData }}</p> -->
        <p v-for="(nodeData, key) of graphData" :key="key">
            <p>{{ 'Course ' + nodeData[0]['courseCode'] + ', '
            + nodeData[0]['courseName'] + ' has status '
            + nodeData[0]['courseStatus'] + ' and it depends on ' }}</p>
            <div v-for="(dependency, _) in nodeData[1]">
                <p>{{ dependency + ' with status ' + getCourseStatus(dependency) }}</p>
                <!-- <p>{{ getCourseStatus(dependency) }}</p> -->
            </div>
            <br>
        </p>
    </div>

    <div class="container-fluid align-items-center justify-content-center">
        <h2>Node Test</h2>
        <CourseNode courseCode="DIT420" courseName="FUck this shit"></CourseNode>
    </div>

    <div class="container-fluid text-center">
        <div class="row">
            <h1>Node Test</h1>
            <div class="col">
                <span>Test</span>
            </div>
        </div>
        <div class="row gy-2">
            <div v-for="(nodeData, _) of graphData">
                <CourseNode :courseCode="nodeData[0]['courseCode']" :courseName="nodeData[0]['courseName']" @sending-status="testStatus"/>
            </div>
            <!-- <div class="col" v-for="(course, index) in periodCourses" :key="index"> -->
                <!-- <Course :courseCode="course.courseCode" :courseName="course.courseName" :courseStaff="course.courseStaff" @sending-status="testStatus"/> -->
            </div>
        </div>

    <div>
        <h1>THIS IS JUTS A FHIGE PARAFJKSJKFASF JKFASFJK FKJDSK JFKJDSF KJ</h1>
    </div>

</template>

<script>
import { ref, onMounted } from 'vue';
import { getApi } from '@/api/v1/Api';
import { getCoursesGraph2 } from '@/api/v1/courseApi';
import Node from '@/components/Node.vue';
import Edge from '@/components/Edge.vue';
import CourseNode from '@/components/CourseNode.vue';

export default {
    name: 'Home',
    setup() {
        const message = ref('none');
        const graphData = ref(null);
        
        onMounted(async () => {
            console.log("Test Graph :)");
            graphData.value = await getCoursesGraph2();
            console.log(graphData.value);
            
            // for (var i of graphData.value.keys()) {
            //     console.log(i.courseCode + ' has: ');
            //     for (var j of graphData.value.get(i))
            //     {
            //         console.log(j);
            //     }
            // }

            // console.log(graphData.value.get('DIT182')[1]);

            // for (var i of graphData.value.keys()) {
            //     console.log('Course: ' +  i + ' has:');
            //     for(var j of graphData.value.get(i)) {
            //         console.log(j)
            //     }
            // }
        });

        const testStatus = (courseCode, status) => {
            console.log(`${courseCode} status: ${status}`);
            updateCourseStatus(courseCode, status);

            // periodCoursesStatus.value[courseCode] = status;
        }

        const updateCourseStatus = (courseCode, status) => {
            // TODO: FInish this updateing the course status
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
        getNodePosition(node) {
            const index = Object.keys(this.graphData).indexOf(node);
            const spacing = 100;
            return {x: index * spacing, y:1000};
        },
        async updateInfo() {
            console.log('Update info');
            var targetCourse = null;
            for(var i of this.graphData.keys())
            {
                if(i['courseCode'] === 'DIT023')
                {
                    targetCourse = i;
                    i['courseStatus'] = 1;
                }
            }

            console.log(targetCourse);

            console.log(this.graphData.get(targetCourse));
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
        Node,
        Edge,
        CourseNode
    }
};
</script>

<style scoped>
.grap-container {
    position: relative;
}
</style>