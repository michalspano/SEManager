<script>
export default {
    props: {
        courseCode: String,
        courseName: String,
        courseStaff: Array
    }

}
</script>

<template>
    <div>
        <div class="square">
            <div class="rectangle">
                <p class="rectangle-text">{{ courseCode }}<br></p>
            </div>
            <p>{{ courseName }}<br></p>

            <div class="rectangle">
            </div>
        </div>
    </div>
</template>

<style scoped>
p {
    color: white;
    font-family: 'Courier New', Courier, monospace;
    margin: 0;
    font-size: 130%;
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
