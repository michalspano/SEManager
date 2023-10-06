<script>
import Course from '@/components/Course.vue';
import { onMounted, ref } from 'vue';
import { getTermCourses } from '@/api/v1/courseApi';

export default {
    setup(props) {
        const periodCourses = ref([]);

        onMounted(async () => {
            // TODO: Pass the period and the term here
            periodCourses.value = await getTermCourses(props.semesterNumber, props.periodNumber);
        });

        return {
            periodCourses
        }
    },
    props: {
        semesterNumber: Number,
        periodNumber: Number
    },
    components: {
        Course,
    },
}
</script>

<template>
    <div class="container-fluid text-center">
        <div class="row">
            <div class="col">
                <span class="periodTitle">{{ 'Period ' + periodNumber }}</span>
            </div>
        </div>
        <div class="row gy-2">
            <div class="col" v-for="(course, index) in periodCourses" :key="index">
                <Course :courseCode="course.courseCode" :courseName="course.courseName" :courseStaff="course.courseStaff"/>
                
                <!-- <h3>{{ course.courseName }}</h3> -->
            </div>
        </div>
    </div>
    <!-- <div class="period">
        <span class="periodTitle">{{ 'Period ' + periodNumber }}</span>

        <Course class="courseItem" v-for="(course, index) in periodCourses" :key="index" :courseCode="course.courseCode"
            :courseName="course.courseName" :courseStaff="course.courseStaff" />

    </div> -->
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