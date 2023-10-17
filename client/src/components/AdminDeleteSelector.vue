<script setup>
import { ref } from 'vue';
import router from '@/router';
import { deleteUser, deleteUsers } from '@/api/v1/userApi'
import { deleteCourse, deleteCourses } from '@/api/v1/courseApi'
import { deleteEmployee, deleteEmployees } from '@/api/v1/employeeApi'

const formType = ref('course'); // auto-select 'course' by default
const answer = ref('')
const errorMsg = ref('')
const toDropCollection = ref(false)

// Possible entities to mutate
const ENTITIES = ['course', 'user', 'employee']

const onDelete = async () => {
    try {
        switch (formType.value) {
            case "course":
                toDropCollection.value ? await deleteCourses() : await deleteCourse(answer.value)
                break
            case "user":
                toDropCollection.value ? await deleteUsers() : await deleteUser(answer.value)
                break
            case "employee":
                toDropCollection.value ? await deleteEmployees() : await deleteEmployee(answer.value)
                break
            default:
                errorMsg.value = 'Invalid entity type'
                return
        }

        // Success!
        errorMsg.value = ''
        alert('Success!')
    } catch (error) {
        if (error.response) {
            if (error.response.status === 500) {
                errorMsg.value = 'Error: server malfunction.'
            }
            else if (error.response.data.message === 'TokenExpiredError' && error.response.status === 401) {
                handleExpiredToken()
            } else {
                errorMsg.value = `${error.response.status}: ${error.response.data.message}`;
            }
        } else {
            errorMsg.value = 'Problem with API or network.'
        }
    }
}

/**
 * The function that changes the entity type
 * @param {String} type - The type of entity to change to
 */
const changeEntity = (type) => {
    answer.value = '';
    formType.value = type;
}

/**
 * Toggles the checkbox
 */
const toggleCheckbox = () => {
    toDropCollection.value = !toDropCollection.value
}

/**
 * A function that is called when the token is expired.
 * Note: it would be desirable to make this function reusable, because it is repeated in the
 * AdminCreateSelector.vue component, but since it uses a ref, it may introduce some problems.
 */
const handleExpiredToken = () => {
    errorMsg.value = 'Your session has expired. Please log in again.'
    setTimeout(() => {
        localStorage.removeItem('token')
        router.push('/login')
    }, 2000);
}

</script>

<template>
    <div class="p-4 bg-body-tertiary rounded-4 subtle-shadow card-hoverable">
        <p class="fs-1 fw-bolder mx-2">Add/Update</p>
        <div class="btn-group d-md-block mb-3">
            <button class="btn" :style="{ backgroundColor: formType === entity ? 'var(--highlight-color)' : '' }"
                v-for="(entity, index) in ENTITIES" :key="index" @click="changeEntity(entity)">
                {{ entity }}
            </button>
        </div>
        <form v-if="formType === 'course'" @submit.prevent="onDelete">
            <div class="mb-3">
                <label>Course code:</label>
                <input type="text" id="entity-identifier" v-model="answer" class="form-control"
                    v-bind:disabled="toDropCollection" v-bind:required="toDropCollection">
            </div>
        </form>
        <form v-else-if="formType === 'user'" @submit.prevent="onDelete">
            <div class="mb-3">
                <label>Email address:</label>
                <input type="text" id="entity-identifier" v-model="answer" class="form-control"
                    v-bind:disabled="toDropCollection" v-bind:required="toDropCollection">
            </div>
        </form>
        <form v-else-if="formType === 'employee'" @submit.prevent="onDelete">
            <div class="mb-3">
                <label>Email address:</label>
                <input type="text" id="entity-identifier" v-model="answer" class="form-control"
                    v-bind:disabled="toDropCollection" v-bind:required="toDropCollection">
            </div>
        </form>

        <div class="row">
            <div class="col-xl-2 col-4">
                <button class="btn btn-primary" :class="{ disabled: !answer && !toDropCollection }"
                    @click="onDelete">Delete</button>
            </div>
            <div class="col-xl-10 col-8">
                <div class="form-check">
                    <input class="form-check-input mt-2" type="checkbox" id="exampleCheckbox" v-model="toDropCollection"
                        @click="toggleCheckbox">
                    <label class="form-check-label fs-5" for="exampleCheckbox">Drop collection</label>
                    <p class="text-danger mt-2">{{ errorMsg }}</p>
                </div>
            </div>
        </div>
    </div>
</template>