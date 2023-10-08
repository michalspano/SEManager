<script>
export default {
    data() {
        return {
            active: false,
        }
    },
    emits: {
        'sending-status': null
    },
    props: {
        courseCode: String,
        courseName: String,
    },
    methods: {
        handleCardClick() {
            this.active = !this.active;

            let status = 0;

            if (this.active === false) {
                status = 0;
            }
            else if (this.active === true) {
                status = 1;
            }

            this.$emit('sending-status', this.courseCode, status);
        }
    }
}
</script>

<template>
    <div class="card w-100" :class="active ? 'enabled' : 'disabled'" @click="handleCardClick">
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

.enabled {
    color: black;
}

.disabled {
    color: white;
}
</style>
