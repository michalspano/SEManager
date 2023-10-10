<script setup>

import { ref, computed } from 'vue';

const passed = ref(false);

const emit = defineEmits(['sending-status']);

const props = defineProps({
    courseCode: String,
    courseName: String,
    status: Number
})

const courseCardClass = computed(() => {
    return {
        'card': true,
        'w-100': true,
        'passed': props.status === 2,
        'not-passed': props.status === 1,
        'locked': props.status === 0
    }
})

const handleCardClick = () => {

    passed.value = !passed.value;

    let status = null;

    if (passed.value === false) {
        status = 1;
    }
    else if (passed.value === true) {
        status = 2;
    }

    emit('sending-status', props.courseCode, status);
}
</script>

<template>
    <div class="card w-100" :class="courseCardClass" @click="handleCardClick">
        <div class="card-header">{{ courseCode }}</div>
        <div class="card-body">
            {{ courseName }}
        </div>
        <div class="card-footer"></div>
    </div>
</template>

<style scoped>
p {
    color: white;
    font-family: 'Courier New', Courier, monospace;
    margin: 0;
    font-size: 130%;
}

.card {
    transition: transform .2s;
}
.card:hover {
    /* color: aqua; */
    transform: scale(1.05);
    box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 10px;
    cursor: pointer;
}

.passed {
    color: green;
}

.not-passed {
    color: black;
}

.locked {
    color: white;
    pointer-events: none;
}
</style>
