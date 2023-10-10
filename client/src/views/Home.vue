<!-- TODO: fix formatting -->
<template>
    <div class="container py-4">
        <div class="p-5 mb-4 bg-body-tertiary rounded-3">
            <p class="fs-1">Welcome to <strong>SEManager</strong> (TODO: make formatting proper)</p>
            <p class="fs-4"><i>&#8208; for the "real" SEM experience</i></p>
            <div class="row">
                <div class="col-md-6">
                    <p>
                        Welcome to our innovative solution tailored for <b>SEM</b> (Software Engineering and Management)
                        students!
                        Our mission is to enhance your academic journey by offering a comprehensive tool that simplifies the
                        <b>visualization</b> of your program's structure.
                    </p>
                    <p>
                        With our platform, you can effortlessly plan your
                        studies, monitor your progress, and gain insights into course prerequisites. Experience a <b>new
                            level
                            of control</b> and efficiency in your academic pursuits
                        with <strong>SEManager</strong>.
                    </p>
                    <p>
                        Your academic success starts here!
                    </p>
                </div>
                <div class="col-md-6">
                    <!-- TODO: update with the modified logo -->
                    <img src="@/assets/logo.gif" width=300px alt="SEManager logo" class="img-fluid rounded logotype" />
                </div>
            </div>
        </div>
        <div class="p-3">
            <div class="row">
                <div class="col-md-6 mt-3 order-md-1">
                    <ApiInfo />
                </div>
                <div class="col-md-6 order-md-2 d-flex justify-content-center align-items-center">
                    <router-link to="/courses" class="btn btn-primary btn-lg router-link-class">
                        Explore Courses
                    </router-link>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { ref } from 'vue';
import { getApi } from '@/api/v1/Api';
import ApiInfo from '@/components/ApiInfo.vue';

export default {
    name: 'Home',
    setup() {
        const message = ref('none');

        return { message };
    },
    methods: {
        async updateMessage() {
            const response = await getApi();
            this.message = response.api_info.description;
        }
    },
    components: { ApiInfo }
};
</script>

<style scoped>
/* make the button appear bigger */
.btn-lg {
    padding: 1rem 2rem;
    font-size: 1.5rem;
    font-weight: 700;
}

@media (max-width: 768px) {
    .btn-lg {
        font-size: 1.2rem;
        padding: 0.75rem 1rem;
    }

    .router-link-class {
        margin-top: 30px;
    }

    .logotype {
        width: 350px;
        height: auto;
    }
}
</style>
