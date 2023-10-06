<!-- Playground environment -->

<script>
import Year from '@/components/Year.vue'

// I don't know how to get the data so for now I'm just doing dummy data lmao :((( I wanna die I don't understand javascript fr fr
// Why is it called javascript? It doesn't have anything to do with java... I miss java :(

export default {
    components: {
        Year
    }
}

</script>

<template>
    
    <div class="container-fluid text-center">
        <h1>Hi there, you better work you fucking piece of shit</h1>
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
