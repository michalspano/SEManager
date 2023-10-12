<script setup>

const props = defineProps({
    emailAddress: String,
    name: String,
    contactInfo: String
})

</script>


<template>
    <div class="employee-pop-up rounded-3 bg-light">
        <div class="staff-member row">
            <p id="staff-name" class="col-8 mt-2">{{ props.name }}</p>
            <div class="col-4">
                <button type="button" class="btn mt-2 px-2" id="close-button" @click="$emit('close')">Close</button>
            </div>
        </div>  
        <div id="staff-info">
            <div class="sub-heading">Email: </div>
            <p class="staff-info-item"><a :href="'mailto:' + props.emailAddress">{{ props.emailAddress }}</a></p>
            <div class="sub-heading">Contact: </div>
            <p class="staff-info-item">{{ props.contactInfo }}</p>
        </div>
    </div>
</template>


<style scoped>
@media screen and (min-width: 576px) {
    #staff-name {
        white-space: nowrap;
    }
}
.employee-pop-up {
    box-shadow: 2.5px 2.5px 5px rgba(0, 0, 0, 0.2);    
}
#staff-name {
    font-size: 140%;
    font-weight: bold;
}
#staff-info {
    font-size: 120%;
}
.sub-heading {
    font-weight: bold;
}
.staff-info-item {
    overflow-wrap: break-word;
}
.staff-info-item a {
    text-decoration: none;
    color: inherit;
}
#close-button {
    float: right;
}
</style>