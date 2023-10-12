<script setup>
import { ref } from 'vue'
import { performRequest } from '@/api/v1/Api';
import { getCourse, postCourse } from '@/api/v1/courseApi'
import { getUser, postUser } from '@/api/v1/userApi'
import { getEmployee, postEmployee } from '@/api/v1/employeeApi'

/**
 * @typedef {Object} Links
 * @property {string} update
 * @property {string} edit
 * Our current API promotes HATEOAS, so when a GET request is made to an entity,
 * the response will contain links to update and edit the entity. This is a
 * convenience object to store those links.
 * Note: doing this may be a bit redundant, but we want to structure our client
 * that it can just simply receive links. Suppose the location of PUT changes
 * to another domain - we can just apply the link the same way. Furthermore,
 * we have wanted to demonstrate that we can use HATEOAS.
 */
const links = ref({
    'course': {
        'put': '',
        'patch': ''
    },
    'user': {
        'put': '',
        'patch': ''
    },
    'employee': {
        'put': '',
        'patch': ''
    }
})

/**
 * Function to reset the answer state.
 * @returns {Object} An object with default keys and value (i.e., {}).
 */
const resetAnswerState = () => {
    return {
        'course': {},
        'user': {},
        'employee': {}
    }
}

const formType = ref('course'); // auto-select 'course' by default
const entityId = ref('')
const errorMsg = ref('')
const toCreate = ref(false)    // creation defaults to false
const answer = ref(resetAnswerState())

/**
 * @typedef {Object} ExpectedNumFields
 * @property {number} course
 * @property {number} user
 * @property {number} employee
 * The number of fields expected for each entity type.
 */
const EXPECTED_NUM_FIELDS = {
    'course': 6,
    'user': 5,
    'employee': 2
}

// Possible entities to mutate
const ENTITIES = ['course', 'user', 'employee']

/**
 * Some fields are passed in as String, but they should be stored as Array.
 * These are the fields that should be converted to Array.
 */
const ARRAY_ANSWER_TYPES = [
    'courseStaff',
    'dependencies',
    'courses',
    // ... add more here
]

/**
 * Helper function to convert a String to an Array.
 * Basically, split the String by comma and remove any redundant spaces.
 * @param {string} buffer The String to convert.
 * @returns {Array} The converted Array.
 */
const convertStringToArray = (buffer) => {
    return buffer.split(',').map(item => item.trim())
}

/**
 * Helper function to determine the HTTP method to use.
 * If all fields are filled in, then use PUT.
 * If only some fields are filled in, then use PATCH.
 * FIXME: the numbers of required fields are hardcoded.
 * @returns {string} Either 'put', 'patch' or 'post'.
 */
const determineHTTPMethod = () => {
    if (toCreate.value) return 'post'

    const numFields = Object.keys(answer.value[formType.value]).length
    if (numFields === EXPECTED_NUM_FIELDS[formType.value]) {
        return 'put'
    } else if (numFields > 0) {
        return 'patch'
    } else {
        throw new Error('Some required fields are empty.')
    }
}

/**
 * A helper function to extract the links from the API response
 * in the desired format.
 * @param {Object} links - raw Object from the API response
 */
const extractLinks = (links) => {
    return {
        'put': links.find(link => link.rel === 'update').href,
        'patch': links.find(link => link.rel === 'edit').href
    }
}

/**
 * Function to handle posting an entity.
 */
const postEntity = async () => {
    let response;

    // Make sure that all fields are converted to Array (if necessary)
    for (const key of ARRAY_ANSWER_TYPES) {
        const answerValue = answer.value[formType.value][key]
        if (answerValue) {
            answer.value[formType.value][key] = convertStringToArray(String(answerValue))
        }
    }
    try {
        switch (formType.value) {
            case 'user':
                // Add the email address to the body
                answer.value[formType.value].emailAddress = entityId.value
                response = await postUser(answer.value[formType.value]);
                break
            case 'course':
                // Add the course code to the body
                answer.value[formType.value].courseCode = entityId.value
                response = await postCourse(answer.value[formType.value]);
                break
            case 'employee':
                // Add the email address to the body
                answer.value[formType.value].emailAddress = entityId.value
                response = await postEmployee(answer.value[formType.value]);
                break
            default:
                errorMsg.value = 'Unrecognized type';
                break
        }
    } catch (error) {
        if (error.response) {
            errorMsg.value = `${error.response.status}: ${error.response.data.message}`;
        } else {
            errorMsg.value = 'Problem with API or network.'
        }
        return
    }

    // Success!
    errorMsg.value = ''
    alert('Success!')
}

// TODO: extract the functionality to more granular functions
const onClick = async () => {
    let method, response;
    try {
        method = determineHTTPMethod()
    } catch (error) {
        errorMsg.value = error.message
        return
    }

    if (method === 'post') {
        await postEntity()
        return
    }

    // If the links are not yet fetched, then fetch them
    const url = links.value[formType.value][method]
    if (!url) {
        try {
            switch (formType.value) {
                case 'course':
                    response = await getCourse(entityId.value, true);
                    break;
                case 'user':
                    response = await getUser(entityId.value, true);
                    break;
                case 'employee':
                    response = await getEmployee(entityId.value, true);
                    break;
                default:
                    errorMsg.value = 'Unrecognized type';
                    return;
            }
        } catch (error) {
            if (error.response) {
                errorMsg.value = `${error.response.status}: ${error.response.data.message}`;
            } else {
                errorMsg.value = 'Problem with API or network.'
            }
            return
        }
    }

    // Attempt to process the response and the links
    if (response && response.links) {
        links.value[formType.value] = extractLinks(response.links);
    } else {
        errorMsg.value = `API Error: No links found for ${formType.value}`;
        return
    }

    // Make sure that all fields are converted to Array if necessary
    // ARRAY_ANSWER_TYPES defines which fields should be converted
    for (const key of ARRAY_ANSWER_TYPES) {
        const answerValue = answer.value[formType.value][key]
        if (answerValue) {
            answer.value[formType.value][key] = convertStringToArray(answerValue)
        }
    }

    const newLink = links.value[formType.value][method]
    const updatedBody = answer.value[formType.value]

    try {
        // The response is not used, but we want to make sure that the request
        // is successful.
        await performRequest(method, newLink, updatedBody)
        errorMsg.value = ''
        alert('Success!') // TODO: perhaps show a success message in the UI
    } catch (error) {
        try {
            errorMsg.value = error.response.status + ": " + error.response.data.message
        } catch {
            errorMsg.value = 'Problem with API or network.'
        }
    }
}

/**
 * Helper function to change the entity type.
 * @param {String} type - the type of entity to change to 
 */
const changeEntity = (type) => {
    entityId.value = '';
    errorMsg.value = '';
    answer.value = resetAnswerState();
    formType.value = type;
}

/**
 * Function to toggle the checkbox.
 */
const toggleCheckbox = () => {
    toCreate.value = !toCreate.value
}

</script>

<template>
    <div class="container">
        <div class="btn-group d-md-block mb-3">
            <button class="btn" :style="{ backgroundColor: formType === entity ? 'var(--highlight-color)' : '' }"
                v-for="(entity, index) in ENTITIES" :key="index" @click="changeEntity(entity)">
                {{ entity }}
            </button>
        </div>
        <form v-if="formType === 'course'" @submit.prevent="onClick">
            <div class="mb-3">
                <label class="fw-bolder">Course code:</label>
                <input type="text" id="entity-identifier" v-model="entityId" class="form-control"
                    v-bind:required="toCreate">
            </div>
            <br>
            <div class="mb-3">
                <label>Course Name:</label>
                <input type="text" id="courseName" v-model="answer.course.courseName" class="form-control"
                    v-bind:required="toCreate">
            </div>
            <div class="mb-3">
                <label>Credits:</label>
                <input type="number" step="0.5" min="0.5" max="180" id="credits" v-model="answer.course.credits"
                    class="form-control" v-bind:required="toCreate">
            </div>
            <div class="mb-3">
                <label>Term:</label>
                <input type="number" min="1" max="6" id="term" v-model="answer.course.term" class="form-control"
                    v-bind:required="toCreate">
            </div>
            <div class="mb-3">
                <label>Study Period:</label>
                <input type="number" min="1" max="4" id="credits" v-model="answer.course.studyPeriod" class="form-control"
                    v-bind:required="toCreate">
            </div>
            <div class="mb-3">
                <label>Course Staff:</label>
                <input type="text" id="staff" v-model="answer.course.courseStaff" class="form-control"
                    v-bind:required="toCreate">
                <div id="dlHelp" class="form-text">E-mails, comma separated.</div>
            </div>
            <div class="mb-3">
                <label>Dependencies:</label>
                <input type="text" id="dependencies" v-model="answer.course.dependencies" class="form-control">
                <div id="dlHelp" class="form-text">Course codes, comma separated.</div>
            </div>
        </form>
        <form v-else-if="formType === 'user'" @submit.prevent="onClick">
            <div class="mb-3">
                <label class="fw-bolder">Email address:</label>
                <input type="text" id="entity-identifier" v-model="entityId" class="form-control"
                    v-bind:required="toCreate">
            </div>
            <br>
            <div class="mb-3">
                <label>Password:</label>
                <input type="password" id="userPassword" v-model="answer.user.password" class="form-control"
                    v-bind:required="toCreate">
            </div>
            <div class="mb-3">
                <label>Type:</label>
                <input type="text" id="userType" placeholder="Options: student, admin" v-model="answer.user.type"
                    class="form-control" v-bind:required="toCreate">
            </div>
            <div class="mb-3">
                <label>First Name:</label>
                <input type="text" id="userFirstName" v-model="answer.user.firstName" class="form-control"
                    v-bind:required="toCreate">
            </div>
            <div class="mb-3">
                <label>Last Name:</label>
                <input type="text" id="userLastName" v-model="answer.user.lastName" class="form-control"
                    v-bind:required="toCreate">
            </div>
            <div class="mb-3">
                <label>Courses:</label>
                <input type="text" id="userCourses" v-model="answer.user.courses" class="form-control">
                <div id="dlHelp" class="form-text">Course codes, comma separated.</div>
            </div>
        </form>
        <form v-else-if="formType === 'employee'" @submit.prevent="onClick">
            <div class="mb-3">
                <label class="fw-bolder">Email address:</label>
                <input type="text" id="entity-identifier" v-model="entityId" class="form-control"
                    v-bind:required="toCreate">
            </div>
            <br>
            <div class="mb-3">
                <label>Name:</label>
                <input type="text" id="employeeName" v-model="answer.employee.name" class="form-control"
                    v-bind:required="toCreate">
            </div>
            <div class="mb-3">
                <label>Contact info:</label>
                <input type="text" id="employeeContactInfo" v-model="answer.employee.contactInfo" class="form-control">
            </div>
        </form>

        <div class="row">
            <div class="col-xl-2 col-4">
                <button class="btn btn-primary btn-lg" :class="{ disabled: !entityId || !answer }"
                    @click="onClick">Send</button>
            </div>
            <div class="col-xl-10 col-8">
                <div class="form-check">
                    <input class="form-check-input mt-2" type="checkbox" id="binaryCheckbox" v-model="toCreate"
                        @click="toggleCheckbox">
                    <label class="form-check-label fs-4">Create entity</label>
                    <p class="text-danger mt-2">{{ errorMsg }}</p>
                </div>
            </div>
        </div>
    </div>
</template>