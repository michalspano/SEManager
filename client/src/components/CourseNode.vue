<script>
export default {
    data() {
        return {
            passed: false,
        }
    },
    emits: {
        'sending-status': null
    },
    props: {
        courseCode: String,
        courseName: String,
        status: Number
    },
    computed: {
        courseCardClass() {
            return {
                'card': true,
                'w-100': true,
                'passed': this.status === 2,
                'not-paassed': this.status === 1,
                'locked': this.status === 0,
            }
        }
    },
    methods: {
        handleCardClick() {

            if (this.status === 0)
            {
                // Not clickable
                return;
            }

            // Toggle between passed and not-passed
            this.passed = !this.passed;

            let status = null;

            if (this.passed === false) {
                status = 1;
            }
            else if (this.passed === true) {
                status = 2;
            }

            this.$emit('sending-status', this.courseCode, status);
        }
    }
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
