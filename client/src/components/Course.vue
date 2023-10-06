<script>
export default {
    data() {
        return {
            active: false,
        }
    },
    props: {
        courseCode: String,
        courseName: String,
        courseStaff: Array
    },
    methods: {
        handleCardClick() {
            this.active = !this.active;
            console.log(this.active);
        }
    }

}
</script>

<template>
    <div class="card" :class="active ? 'enabled' : 'disabled'" @click="handleCardClick">
        <div class="card-header">{{ courseCode }}</div>
        <div class="card-body">
            {{ courseName }}
        </div>
        <div class="card-footer"></div>
    </div>
    <!-- <div>
        <div class="square">
            <div class="rectangle">
                <p class="rectangle-text">{{ courseCode }}<br></p>
            </div>
            <p>{{ courseName }}<br></p>

            <div class="rectangle">
            </div>
        </div>
    </div> -->
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

.square {
    width: 200px;
    height: 200px;
    background-color: black;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.rectangle {
    width: 100%;
    height: 15%;
    background-color: grey;
    display: flex;
    justify-content: center;
    align-items: center;
}

.rectangle-text {
    font-size: 100%;
    color: white;
    font-weight: 200;
}
</style>
