<script setup>

    import {ref, onMounted} from 'vue'
    import {format} from 'date-fns'
    import axios from 'axios'

    const editProfileDialog = ref(false)
    const snackbar = ref(false)
    const message = ref('')
    const viewAttendanceRecordDialog = ref(false)
    const user = ref(JSON.parse(localStorage.getItem('auth')))
    const schedules = ref(null)
    const isTimedIn = ref(null)
    const showPassword = ref(false)

    async function updateProfile() {
        try{
            const result = await axios.put(`http://localhost:5000/student/${user.value.id}`, {
                firstname: user.value.firstname,
                lastname: user.value.lastname,
                email: user.value.email,
                password: user.value.password,
                role: user.value.role
            })
            if(result.status == 200) {
                const updatedUser = await axios.get(`http://localhost:5000/student/${user.value.id}`)
                console.log(updatedUser.data[0])
                localStorage.removeItem('auth')
                localStorage.setItem('auth', JSON.stringify(updatedUser.data[0]))
            }
            message.value = 'Profile updated successfully'
            snackbar.value = true
            editProfileDialog.value = false
        }
        catch(err) {
            console.log(err)
        }
    }

    async function timeIn(id) {
        try {
            const result = await axios.post(`http://localhost:5000/attendance/time-in`, {
                schedule_id: id,
                student_id: user.value.id,
                time_in: new Date(),
                time_out: null,
                date: new Date()
            })
            message.value = 'Successfully timed in'
            snackbar.value = true
            getAttendanceToday()
        }
        catch(err) {
            console.log(err)
        }
    }

    async function timeOut(id) {
        console.log(isTimedIn.value.id)
        try {
            const result = await axios.put(`http://localhost:5000/attendance/time-out/${isTimedIn.value.id}`, {
                time_out: new Date()
            })
            message.value = 'Successfully timed out'
            snackbar.value = true
            getAttendanceToday()
        }
        catch(err) {
            console.log(err)
        }
    }

    async function getAttendanceToday() {
        try{
            const result = await axios.get(`http://localhost:5000/attendance/today/${user.value.id}`)
            isTimedIn.value = result.data[0]
            console.log(isTimedIn.value)
            console.log(result.data[0])
        }
        catch(err) {
            console.log(err)
        }
    }

    async function getSchedule() {
        const result = await axios.get("http://localhost:5000/schedule")
        schedules.value = result.data
    }

    onMounted(() => {
        getSchedule()
        getAttendanceToday()
    })

</script>

<template>
    
    <div>
        <v-row>
            <v-col cols="4">
                <v-card elevation="5">
                    <v-card-title class="text-center">
                        Student profile
                    </v-card-title>
                    <v-card-item>
                        <v-row>
                            <v-col cols="12" class="justify-center d-flex">
                                <v-avatar size="150">
                                    <v-img cover src="https://6.soompi.io/wp-content/uploads/image/06c12cab1784463b827d418d8d0a64dd.jpeg?s=900x600&e=t"></v-img>
                                </v-avatar>
                            </v-col>
                        </v-row>
                        <v-divider class="my-3" />
                        <v-row>
                            <v-col cols="6" class="text-end">
                                First name
                            </v-col>
                            <v-col cols="6" class="text-start">
                                {{ user.firstname }}
                            </v-col>
                            <v-col cols="6" class="text-end">
                                Last name
                            </v-col>
                            <v-col cols="6" class="text-start">
                                {{ user.lastname }}
                            </v-col>
                            <v-col cols="6" class="text-end">
                                Email
                            </v-col>
                            <v-col cols="6" class="text-start">
                                {{ user.email }}
                            </v-col>
                        </v-row>
                    </v-card-item>
                    <v-card-actions class="justify-center d-flex">
                        <v-btn variant="flat" color="blue" @click="editProfileDialog = true">Edit profile</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="8">
                <v-card elevation="5">
                    <v-card-title class="text-center">
                        Attendance
                    </v-card-title>
                    <v-table class="text-center">
                        <thead>
                            <tr>
                                <th class="text-center" colspan="2"> Time in schedule</th>
                                <th class="text-center" colspan="2"> Time out schedule</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="schedule in schedules" :key="schedule.id">
                                <td class="text-center"> {{ format(schedule.time_in, 'PPp') }} </td>
                                <td>
                                    <v-btn color="green" :prepend-icon="isTimedIn?.time_in ? 'mdi-check' : ''" :disabled="isTimedIn?.time_in" @click="timeIn(schedule.id)">Time in</v-btn>
                                </td>
                                <td class="text-center"> {{ format(schedule.time_out, 'PPp') }} </td>
                                <td>
                                    <v-btn color="green" :prepend-icon="isTimedIn?.time_out ? 'mdi-check' : ''" :disabled="new Date(schedule.time_out) > new Date() || isTimedIn?.time_out" @click="timeOut(schedule.id)">Time out</v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                    <v-card-actions>
                        <v-btn block @click="viewAttendanceRecordDialog = true">View attendance record</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-dialog v-model="editProfileDialog">
            <v-card title="Edit profile">
                <v-card-item>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field label="First name" v-model="user.firstname"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field label="Last name" v-model="user.lastname"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field label="Email" v-model="user.email"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field label="Password" v-model="user.password" :type="showPassword ? '' : 'password'">
                                <template v-slot:append-inner>
                                    <v-btn @click="showPassword = !showPassword" variant="text" :icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"></v-btn>
                                </template>
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-card-item>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn @click="editProfileDialog = false">Cancel</v-btn>
                    <v-btn @click="updateProfile">Update</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="viewAttendanceRecordDialog">
            <v-card title="Attendace report">
                <v-card-item>
                </v-card-item>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn @click="viewAttendanceRecordDialog = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar">
            {{ message }}
        </v-snackbar>
    </div>
</template>