<script setup>

import { onMounted } from 'vue'
import NewStudentForm from './components/NewStudentForm.vue'
import StudentTable from './components/StudentTable.vue'
import StudentMessage from './components/StudentMessage.vue'

import { useStudentStore } from './stores/StudentStore'

const studentStore = useStudentStore()

onMounted( () => {
    // whatever is in here will run when the component is first displayed
    studentStore.getAllStudents()
})

</script>


<template>
<!--HTML Template-->

<NewStudentForm></NewStudentForm>
<StudentTable></StudentTable>
<StudentMessage></StudentMessage>

<!--Because they are self contained chunk of functionality they can be easily rearranged by moving the references to them above or below eachother-->
</template>

<style scoped>/*'scoped' in the context of style means to keep the style choices localized in this component */



</style>
