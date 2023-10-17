<template>
    <div class="p-4 bg-body-tertiary rounded-4 subtle-shadow card-hoverable">
        <p class="fs-1 fw-bolder mx-2">Admin Manual</p>
        <div id="admin-manual-body">
            <p>
                The section on the left-hand side is used to <span class="fw-bold">update, edit</span> and <span
                    class="fw-bold">create</span>
                entities of the system. Use the button group atop to select the entity you wish to manage. In case you want
                create an entity,
                select the <span class="fw-bold">checkbox</span> at the bottom of the form.
                For an employee, click the <i>'Link with a course'</i> button to link the employee with a existing course.
            </p>
            <p>
                The section above (on the right-hand side) is used to <span class="fw-bold">delete</span> an entity or a
                collection of entities.
                Select the entity from the button group atop and click the <span class="fw-bold">Delete</span> button. In
                case you want to delete
                a collection of entities, select the <span class="fw-bold">checkbox</span> at the bottom of the form.
            </p>
        </div>
    </div>
</template>

<style scoped>
#admin-manual-body {
    font-size: 1.35rem;
    font-weight: 375;
}
</style>