<script setup>
import ApiInfo from '@/components/ApiInfo.vue';
</script>

<template>
    <div class="container py-4">
        <div class="p-5 mb-4 bg-body-tertiary rounded-3 subtle-shadow">
            <div class="row">
                <div class="col-lg-8">
                    <div class="container">
                        <p class="fs-1">
                            <span class="fw-bolder">Welcome to</span> <span id="heading">SEManager</span>
                        </p>
                        <p class="fs-4 fw-light fst-italic">&#8208; for the "real" SEM experience</p>
                    </div>
                    <!-- Body with text about SEManager -->
                    <div class="mt-2 body-text">
                        <p>
                            Welcome to our innovative solution tailored for <b>SEM</b> (Software Engineering and Management)
                            students!
                            Our mission is to enhance your academic journey by offering a comprehensive tool that simplifies
                            the <b>visualization</b> of your program's structure.
                        </p>
                        <p>
                            With our platform, you can effortlessly plan your
                            studies, monitor your progress, and gain insights into course prerequisites. Experience a <b>new
                            level of control</b> and efficiency in your academic pursuits with <strong>SEManager</strong>.
                        </p>
                        <p>Your academic success starts here!</p>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="d-flex items-center justify-content-center">
                        <img src="@/assets/logo.gif" width=325px alt="SEManager logo" class="img-fluid rounded logotype" />
                    </div>
                </div>
            </div>
        </div>
        <div class="container mt-2">
            <div class="row">
                <div class="col-md-6">
                    <ApiInfo />
                </div>
                <div class="col-md-6 mb-2">
                    <div class="d-flex items-center justify-content-center mt-4">
                        <router-link to="/courses" class="btn btn-primary btn-lg router-link-class">
                            Explore Courses
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* make the button appear bigger */
.btn-lg {
    padding: 1.25rem 2.25rem;
    font-size: 1.75rem;
    font-weight: 800;
}

/* Make the router button more apparent to the user */
.router-link-class {
    border-radius: 15px;
}

.body-text {
    font-size: 1.35rem;
}

#heading {
    color: var(--highlight-color);
    font-weight: 825;
    font-size: 3.25rem;
}

/* Additional styling for smaller devices */
@media (max-width: 768px) {
    .btn-lg {
        font-size: 1.2rem;
        padding: 0.75rem 1rem;
    }

    .router-link-class {
        border-radius: 10px;
    }

    .body-text {
        font-size: 1.0rem;
    }

    .logotype {
        width: 250px;
        height: auto;
    }
}
</style>
