<script setup>

const props = defineProps({
    emailAddress: String,
    name: String,
    contactInfo: String
})

</script>


<template>
    <div>
        <p><b>POP-UP COMPONENT:</b></p>
        <p>{{ props.name }}</p>
        <p>Email: {{ props.emailAddress }}</p>
        <p>Contact: {{ props.contactInfo }}</p>
    </div>
</template>


<style>

</style>