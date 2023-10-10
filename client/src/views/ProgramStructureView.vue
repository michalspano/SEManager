<script setup>
import SEMProgramGraph from '@/components/SEMProgramGraph.vue';

const props = defineProps({
    userType: String,
});

const userTypeText = () => {
    return this.userType === 'admin' ? 'an' : 'a';
}

// export default {
//     props: {
//         userType: String
//     },
//     components: {
//         SEMProgramGraph
// },
//     methods: {
//         userTypeText() {
//             return this.userType === 'admin' ? 'an' : 'a';
//         }
//     }
// }

</script>

<template>

    <SEMProgramGraph></SEMProgramGraph>
    
</template>
