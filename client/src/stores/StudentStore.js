import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mande } from 'mande'


const studentAPI = mande('api/students')

// () => {} arrow notation for a function
export const useStudentStore = defineStore('students', () => {

        const sortedStudents = ref([])// Array not filled with example students

        const mostRecentStudent = ref( {} ) //empty Object

        const addNewStudentErrors = ref ([])


        function getAllStudents() {
            //make an api request to get all of the students and save in store - studentList ^
            studentAPI.get().then( students => {
                sortedStudents.value = students //students is the JSON response from the API
            }).catch( err => {
                console.log(err)
            })
        }

        function addNewStudent(student) {//This will turn into an api request
            // make api call to add new student
            // call getAllStudents to re-request list of students from APR server
            studentAPI.post(student).then( () => {
                getAllStudents()
            }).catch( err => {
                addNewStudentErrors.value = err.body
            })
        }

        function deleteStudent(studentToDelete) {//This will turn into an api request
            // Takes the unique key of the selected student to delete them
            const deleteStudentAPI = mande(`/api/students/${studentToDelete.id}`)
            deleteStudentAPI.delete().then( () => {
                getAllStudents()
            }).catch( err => {
                console.log(err)
            })
        }

        function arrivedOrLeft(student) {//This will turn into an api request
            // Takes the unique key of the selected student to alter their boolean
            const editStudentAPI = mande(`/api/students/${student.id}`)
            editStudentAPI.patch(student).then( () => {
                getAllStudents()
            }).catch( err => {
                console.log(err)
            })//always include a catch so #1 server doesn't crash and #2 it is helpful for developers.
        }
        
        const studentCount = computed( () => {
            return sortedStudents.value.length
        })//returns how many things are inside of StudentList

        return {
            //reactive data
            sortedStudents,
            mostRecentStudent,
            addNewStudentErrors,
            
            //functions
            getAllStudents,
            addNewStudent,
            deleteStudent,
            arrivedOrLeft,

            //computed properties
            studentCount,
            sortedStudents,
        }

})