<script>
export default {
    props: {
        startX: Number,
        startY: Number,
        endX: Number,
        endY: Number
    },
    computed: {
        edgeStyle() {
            const angle = Math.atan2(this.endY - this.startY, this.endX - this.startX);
            const length = Math.sqrt(Math.pow(this.endY - this.startY, 2) + Math.pow(this.endX - this.startX, 2));
            return {
                width: length + 'px',
                transform: `rotate(${angle}rad)`,
                position: 'absolute',
                top: this.startY + 'px',
                left: this.startX + 'px',
                borderBottom: '2px solide #4598db'
            };
        }
    }
};
</script>

<template>
    <div class="edge" :style="edgeStyle"></div>
</template>

<style scoped>
.edge {
    height: 2px;
}
</style>