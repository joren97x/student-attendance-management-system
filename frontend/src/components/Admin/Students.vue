<script setup>

    import {ref, reactive, onMounted} from 'vue'
    import axios from 'axios'

    const createStudentDialog = ref(false)
    const editStudentDialog = ref(false)
    const deleteStudentDialog = ref(false)
    const selectedStudent = ref(null)
    const loading = ref(false)
    const message = ref('')
    const snackbar = ref(false)
    const firstname = ref(null)
    const lastname = ref(null)
    const email = ref(null)
    const showPassword = ref(false)
    const password = ref(null)
    const students = ref(null)
    const headers = [
        {title: 'Id', key: 'Id', value: 'Id'},
        {title: 'Firstname', key: 'Firstname', value: 'firstname'},
        {title: 'Lastname', key: 'Lastname', value: 'lastname'},
        {title: 'Email', key: 'Email', value: 'email'},
        {title: 'Actions', key: 'Actions', value: 'Actions'},
    ]

    function showDeleteStudentDialog(student) {
        selectedStudent.value = student
        deleteStudentDialog.value = true
    }

    function showEditStudentDialog(student) {
        selectedStudent.value = student
        editStudentDialog.value = true
    }

    async function insertStudent() {
        loading.value = true
        try{
            await axios.post("http://localhost:5000/student", {
                firstname: firstname.value,
                lastname: lastname.value,
                email: email.value,
                password: password.value,
                role: 'student'
            })
            message.value = 'Successfully added student'
            createStudentDialog.value = false
            snackbar.value = true
        }
        catch(err) {
            console.log(err)
        }
        loading.value = false
    }

    async function updateStudent() {
        try {
            const res = await axios.put(`http://localhost:5000/student/${selectedStudent.value.id}`, {
                firstname: selectedStudent.value.firstname,
                lastname: selectedStudent.value.lastname,
                email: selectedStudent.value.email,
                password: selectedStudent.value.password,
                role: selectedStudent.value.role,
            })
            if(res.status == 200) {
                editStudentDialog.value = false
                message.value = 'Successfully updated student'
                snackbar.value = true
                getStudents()
            }
        }
        catch(error) {
            console.log(error)
        }
    }

    async function deleteStudent() {
        try {
            const res = await axios.delete(`http://localhost:5000/student/${selectedStudent.value.id}`)
            if(res.status == 200) {
                deleteStudentDialog.value = false
                message.value = 'Successfully deleted student'
                snackbar.value = true
                getStudents()
            }
        }
        catch(err) {
            console.log(err)
        }
    }

    async function getStudents() {
        try {
            const result = await axios.get("http://localhost:5000/students")
            students.value = result.data
        }
        catch(err) {
            console.log(err)
        }
    }

    onMounted(() => {
        getStudents()
    })

</script>

<template>
    <v-container>
        <v-card title="Students">
            <template v-slot:title>
                <v-row>
                    <v-col cols="2">
                        <p>Students</p>
                    </v-col>
                    <v-col col="2" class="justify-end d-flex">
                        <v-btn color="blue" @click="createStudentDialog = true">Add new student</v-btn>
                    </v-col>
                </v-row>
            </template>

            <v-card-item>
             
                <v-data-table :headers="headers" :items="students" v-if="students">
                    <template v-slot:item="{item}">
                        <tr>
                            <td>{{ item.id }}</td>
                            <td>{{ item.firstname }}</td>
                            <td>{{ item.lastname }}</td>
                            <td>{{ item.email }}</td>
                            <td>
                                <v-btn icon="mdi-square-edit-outline" @click="showEditStudentDialog(item)" variant="text" color="blue" size="small"></v-btn>
                                <v-btn icon="mdi-delete-empty-outline" @click="showDeleteStudentDialog(item)" variant="text" color="red" size="small"></v-btn>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-card-item>

        </v-card>

        <v-dialog v-model="createStudentDialog" width="80%">
            <v-card title="Add new student">
                <v-card-text>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field label="First name" v-model="firstname"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field label="Last name" v-model="lastname"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field label="Email" v-model="email"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field label="Password" :type="showPassword ? '' : 'password'" v-model="password">
                                <template v-slot:append-inner>
                                    <v-btn @click="showPassword = !showPassword" variant="text" :icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"></v-btn>
                                </template>
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn color="primary"  @click="createStudentDialog = false">Cancel</v-btn>
                    <v-btn color="primary"  @click="insertStudent" :loading="loading">Create</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="editStudentDialog" width="80%">
            <v-card title="Edit student">
                <v-card-text>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field label="First name" v-model="selectedStudent.firstname"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field label="Last name" v-model="selectedStudent.lastname"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field label="Email" v-model="selectedStudent.email"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field label="Password" :type="showPassword ? '' : 'password'" v-model="selectedStudent.password" >
                                <template v-slot:append-inner>
                                    <v-btn @click="showPassword = !showPassword" variant="text" :icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"></v-btn>
                                </template>
                            </v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-select label="Role" :items="['student', 'admin']" v-model="selectedStudent.role"></v-select>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn color="primary"  @click="editStudentDialog = false">Cancel</v-btn>
                    <v-btn color="primary"  @click="updateStudent" :loading="loading">Update</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="deleteStudentDialog" width="80%">
            <v-card title="Delete student">
                <v-card-text>
                    <v-alert icon="mdi-alert" color="red-lighten-4" elevation="2" class="text-start text-error">
                        After you delete a student, it's permanently deleted.
                    </v-alert>
                    <p class="ma-4  text-body-2 text-start">
                        Listing <br>
                         <strong class="text-h6"> {{ selectedStudent.firstname + ' ' + selectedStudent.lastname }} </strong>
                    </p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn color="primary"  @click="deleteStudentDialog = false">Cancel</v-btn>
                    <v-btn color="primary"  @click="deleteStudent" :loading="loading">Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbar">
            {{ message }}
        </v-snackbar>

    </v-container>

    

</template>