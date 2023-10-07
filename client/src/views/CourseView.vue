<script>
import Year from '@/components/Year.vue'

export default {
    props: {
        userType: String
    },
    components: {
        Year
    },
    methods: {
        userTypeText() {
            return this.userType === 'admin' ? 'an' : 'a';
        }
    }
}

</script>

<template>
    <div class="container-fluid text-center">
        <h2>You are logged in as {{ userTypeText() }} <strong>{{ userType }}</strong></h2>
        <div class="row">
            <div class="col">
                <Year :yearNumber="1"/>
            </div>
            <div class="col">
                <Year :yearNumber="2"/>
            </div>
        </div>
    </div>
    
    <!-- <div class="mainContainer"> -->
        <!-- <h1>Main course view test</h1> -->
        <!-- ============================== -->
        <!-- <div class="programStructure"> -->
            <!-- <Year :yearNumber="1"/> -->
            <!-- <Year :yearNumber="2"/> -->
        <!-- </div> -->
    <!-- </div> -->
</template>

<style scoped>

/* TODO: Get rid of these things here */
.mainContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.programStructure {
    display: flex;
    flex-direction: row;
    align-items: center;
}
</style>
