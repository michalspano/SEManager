<script>
import Course from '@/components/Course.vue'

export default {
    props: {
        periodTitle: String,
        courses: Array
    },
    components: {
        Course,
    },
}
</script>

<template>
    <div class="period">
        <span class="periodTitle">{{ periodTitle }}</span>

        <Course class="courseItem" v-for="(course, index) in courses" :key="index" :courseCode="course.courseCode"
            :courseName="course.courseName" :courseStaff="course.courseStaff" />
    </div>
</template>

<style>
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