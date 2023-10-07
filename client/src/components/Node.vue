<script>
export default {
    props: {
        nodeValue: String
    }
};
</script>

<template>
    <div class="node">{{ nodeValue }}</div>
</template>

<style scoped>
.node {
    width: 50px;
    height: 50px;
    background-color: #3498db;
    color: #ffffff;
    text-align: center;
    line-height: 50px;
    border-radius: 50%;
    position: absolute;
}
</style>