<!-- Playground environment -->

<script>
// TODO: For now I'm passing pretty much all the information to the Year component
// I need to fix that
import Year from '@/components/Year.vue'
import Course from '@/components/Course.vue'
import { onMounted, ref } from 'vue'
import { getCourses } from '@/api/v1/courseApi';

// I don't know how to get the data so for now I'm just doing dummy data lmao :((( I wanna die I don't understand javascript fr fr
// Why is it called javascript? It doesn't have anything to do with java... I miss java :(

export default {
    // Note: props are readonly
    props: {
        userType: String
    },
    setup() {
        const period1CoursesTest = ref([
            { courseCode: "DIT001", courseName: "Data Management", courseStaff: ["ABC"] },
            { courseCode: "DIT002", courseName: "Data Structures", courseStaff: ["DEF"] }
        ]);

        const period2CoursesTest = ref([
            { courseCode: "DIT003", courseName: "Web Development", courseStaff: ["ABC"] },
            { courseCode: "DIT004", courseName: "Systems Development", courseStaff: ["DEF"] }
        ]);

        const jsonResponse = ref(null);

        const period1Courses = ref([]);
        const period2Courses = ref([]);

        onMounted(async () => {
            jsonResponse.value = await getCourses();
            period1Courses.value = jsonResponse.value.slice(0, 2);
            period2Courses.value = jsonResponse.value.slice(-2);
        })

        return {
            period1Courses,
            period2Courses,
            period1CoursesTest,
            period2CoursesTest,
            jsonResponse
        }
    },
    components: {
        Year,
        Course
    },
    methods: {
        discardToken() {
            localStorage.removeItem('token');
            location.reload();
        },
        userTypeText() {
            return this.userType === 'admin' ? 'an' : 'a';
        }
    }
}

</script>

<template>
    <div class="mainContainer">
        <h1>Main course view test</h1>
        <h2>You are logged in as {{ userTypeText() }} <strong>{{ userType }}</strong></h2>
        <!-- ============================== -->
        <div class="programStructure">
            <Year yearTitle="Year 1" semester1Title="Semester 1" semester2Title="Semester 2"
                :period1Courses="period1Courses" :period2Courses="period2Courses" />
            <Year yearTitle="Year 2" semester1Title="Semester 3" semester2Title="Semester 4"
                :period1Courses="period1CoursesTest" :period2Courses="period2CoursesTest" />
        </div>
        <br>
        <!-- TODO: fix styling -->
        <button type="button" class="btn btn-primary" @click="discardToken">Logout</button>
    </div>
</template>

<style>
.mainContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.programStructure {
    display: flex;
    flex-direction: row;
    align-items: center;
}
</style>
