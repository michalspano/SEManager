<script>
import Course from '@/components/Course.vue';
import { onMounted, ref, watch, watchEffect } from 'vue';
import { getTermCourses } from '@/api/v1/courseApi';

export default {
    emits: {
        'send-test': null
    },
    setup(props) {
        const periodCourses = ref([]);
        const periodCoursesStatus = ref({});

        onMounted(async () => {
            periodCourses.value = await getTermCourses(props.semesterNumber, props.periodNumber);
        });

        const testStatus = (courseCode, status) => {
            console.log(`${courseCode} is active: ${status}`);
            periodCoursesStatus.value[courseCode] = status;
        }

        return {
            periodCourses,
            periodCoursesStatus,
            testStatus
        }
    },
    props: {
        semesterNumber: Number,
        periodNumber: Number
    },
    components: {
        Course,
    }
}
</script>

<template>
    <div class="container-fluid text-center">
        <div class="row">
            <p>{{ periodCoursesStatus }}</p>
            <div class="col">
                <span class="periodTitle">{{ 'Period ' + periodNumber }}</span>
            </div>
        </div>
        <div class="row gy-2">
            <div class="col" v-for="(course, index) in periodCourses" :key="index">
                <Course :courseCode="course.courseCode" :courseName="course.courseName" :courseStaff="course.courseStaff" @sending-status="testStatus"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.period {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin-top: 10px;
    background-color: aqua;

}

.periodTitle {
    color: white;
    font-size: 20px;
    background-color: darkcyan;
    width: 100%;
    text-align: center;
}

.courseItem {
    margin-top: 10px;
}
</style>