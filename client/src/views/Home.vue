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
        <p>{{ graphData }}</p>
        <p v-for="(nodeData, _) of graphData">
            <p>{{ 'Course: ' + nodeData[0] + ' has'}}</p>
            <div v-for="(value, _) in nodeData[1]">
                <p>{{ value }}</p>
            </div>
        </p>

    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getApi } from '@/api/v1/Api';
import { getCoursesGraph } from '@/api/v1/courseApi';
import Node from '@/components/Node.vue';
import Edge from '@/components/Edge.vue';

export default {
    name: 'Home',
    setup() {
        const message = ref('none');
        const graphData = ref(null);
        
        onMounted(async () => {
            console.log("Test Graph :)");
            graphData.value = await getCoursesGraph();
            // console.log(graphData.value.get('DIT182')[1]);

            for (var i of graphData.value.keys()) {
                console.log('Course: ' +  i + ' has:');
                for(var j of graphData.value.get(i)) {
                    console.log(j)
                }
            }
        });

        return { message, graphData };
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
        }
    },
    components: {
        Node,
        Edge
    }
};
</script>

<style scoped>
.grap-container {
    position: relative;
}
</style>