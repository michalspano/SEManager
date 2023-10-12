<template>
    <div class="card" :class="courseCardClass" @click="handleCardClick">
        <div class="card-header card-accent" :class="cardAccentClass">
            <button class="btn bg-transparent" id="courseInfoButton" @click.stop="handleButtonClick"> {{ courseCode }}</button>
        </div>
        <div class="card-body">
            {{ courseName }}
        </div>
        <div class="card-footer card-accent" :class="cardAccentClass"></div>
    </div>
</template>

<script setup>

import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

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

const cardAccentClass = computed(() => {
    return {
        'card-accent-locked': props.status === 0,
        'card-accent-not-passed': props.status === 1,
        'card-accent-passed': props.status === 2
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

const handleButtonClick = () => {

    const routePath = '/courses/' + props.courseCode;

    router.push(routePath);
}
</script>

<style scoped>
p {
    color: white;
    font-family: 'Courier New', Courier, monospace;
    margin: 0;
    font-size: 130%;
}

.card {
    transition: transform .2s;
    border: 0px;
}

.card:hover {
    transform: scale(1.02);
    box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 10px;
    cursor: pointer;
}

.card.locked:hover {
    cursor: default;
}

.passed {
    color: green;
}

.not-passed {
    color: black;
}

.locked {
    color: rgb(183, 183, 183);;
}

.card-accent {
    color: var(--primary-color);
    font-weight: bolder;
}

.card-accent-locked {
    background-color: rgb(183, 183, 183);
}

.card-accent-not-passed {
    background-color: var(--accent-color);
}

.card-accent-passed {
    background-color: #0e742c;
}

.btn {
    background-color: transparent;
    box-shadow: 0px 0px 0px;
}

#courseInfoButton:hover {
    box-shadow: none !important;
}
</style>
