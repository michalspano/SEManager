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
    setup() {
        const period1CoursesTest = ref([
            { courseCode: "DIT001", courseName: "Cringe 1", courseStaff: ["ABC"] },
            { courseCode: "DIT002", courseName: "Cringe 2", courseStaff: ["DEF"] }
        ]);

        const period2CoursesTest = ref([
            { courseCode: "DIT420", courseName: "Cringe Advanced", courseStaff: ["ABC"] },
            { courseCode: "DIT421", courseName: "Cringe Expert", courseStaff: ["DEF"] }
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
    }
}

</script>

<template>
    <div class="mainContainer">
        <h1>Main course view test</h1>
        <!-- ============================== -->
        <div class="programStructure">
            <Year yearTitle="Year 1" semester1Title="Semester 1" semester2Title="Semester 2"
                :period1Courses="period1Courses" :period2Courses="period2Courses" />
            <Year yearTitle="Year 2" semester1Title="Semester 3" semester2Title="Semester 4"
                :period1Courses="period1CoursesTest" :period2Courses="period2CoursesTest" />
        </div>
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
