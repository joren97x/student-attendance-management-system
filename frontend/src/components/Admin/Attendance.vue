<script setup>

    import {ref, onMounted} from 'vue'
    import {format} from 'date-fns'
    import axios from 'axios'

    const time_in = ref(format(new Date(), 'Y-MM-dd p'))
    const time_out = ref(format(new Date(), 'Y-MM-dd p'))
    const createAttendanceDialog = ref(false)
    const deleteAttendanceDialog = ref(false)
    const snackbar = ref(false)
    const message = ref('')
    const is_scheduled = ref(null)
    const attendances = ref(null)
    const selectedAttendance = ref(null)
    const headers = [
        {title: 'Student'},
        {title: 'Email'},
        {title: 'Date'},
        {title: 'Time in'},
        {title: 'Time out'},
        {title: 'Actions'},
    ]

    function showDeleteAttendanceDialog(attendance) {
        deleteAttendanceDialog.value = true
        selectedAttendance.value = attendance
    }

    async function createSchedule() {
        try {
            const result = await axios.post('http://localhost:5000/schedule', {
                time_in: time_in.value,
                time_out: time_out.value,
                date: new Date()
            })
            createAttendanceDialog.value = false
            message.value = "Successfully added new schedule"
            snackbar.value = true
            getSchedule()
        }
        catch(err) {
            console.log(err)
        }
    }

    async function deleteAttendance() {
        try {
            await axios.delete(`http://localhost:5000/attendance/${selectedAttendance.value.id}`)
            deleteAttendanceDialog.value = false
            message.value = "Attendance successfully deleted"
            snackbar.value = true
            getAttendance()

        }
        catch(err) {
            console.log(err)
        }
    }

    async function getAttendance() {
        try {
            const result = await axios.get('http://localhost:5000/attendance')
            console.log(result)
            attendances.value = result.data
        }
        catch(err) {
            console.log(err)
        }
    }

    async function getSchedule() {
        const result = await axios.get("http://localhost:5000/schedule")
        is_scheduled.value = result.data
    }

    onMounted(() => {
        getAttendance()
        getSchedule()
    })


</script>

<template>
    <v-container>
        
        <v-card>
            <template v-slot:title>
                <v-row>
                    <v-col cols="2">
                        <p>Attendance</p>
                    </v-col>
                    <v-col col="2" class="justify-end d-flex">
                        <v-btn color="blue" @click="createAttendanceDialog = true" :disabled="is_scheduled?.length > 0 ? true : false">New attendance</v-btn>
                    </v-col>
                </v-row>
            </template>
            <v-card-item>
                <v-data-table :headers="headers" :items="attendances" v-if="attendances">
                    <template v-slot:item="{item}">
                        <tr>
                            <td> {{ item.student[0]?.firstname + ' ' + item.student[0]?.lastname}} </td>
                            <td> {{ item.student[0]?.email }} </td>
                            <td> {{ format(new Date(item.date), 'PP') }} </td>
                            <td> {{ format(new Date(item.time_in), 'p') }} </td>
                            <!-- <td> {{ format(new Date(item.time_out), 'p') }} </td> -->
                            <td> {{ item.time_out ? format(new Date(item.time_out), 'p') : '' }} </td>
                            <td> 
                                <v-btn icon="mdi-delete-empty-outline" color="red" variant="text" size="small" @click="showDeleteAttendanceDialog(item)"></v-btn>    
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-card-item>
        </v-card>

        <v-dialog v-model="createAttendanceDialog" width="50%">
            <v-card title="New attendance" height="400">
                <v-card-text>
                    <v-alert icon="mdi-calendar-range" color="blue-lighten-4" elevation="2" class="text-start mb-5">
                        This will create a new attendance for the date <strong>{{ format(new Date(), 'PPPP') }}</strong>
                    </v-alert>
                    <v-row>
                        <v-col cols="6">
                            <MazPicker v-model="time_in" format="YYYY-MM-DD HH:mm a" label="Time in" color="secondary" only-time />
                        </v-col>
                        <v-col cols="6">
                            <MazPicker v-model="time_out" format="YYYY-MM-DD HH:mm a" label="Time out" color="secondary" only-time />
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn @click="createAttendanceDialog = false">Close</v-btn>
                    <v-btn @click="createSchedule">Create</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="deleteAttendanceDialog" width="80%">
            <v-card title="Delete attendance">
                <v-card-text>
                    <v-alert icon="mdi-alert" color="red-lighten-4" elevation="2" class="text-start text-error">
                        After you delete a attendance, it's permanently deleted.
                    </v-alert>
                    <p class="ma-4  text-body-2 text-start">
                        Student <br>
                        <strong class="text-h6"> {{ selectedAttendance.student[0]?.firstname + ' ' + selectedAttendance.student[0]?.lastname }} </strong>
                    </p>
                    <v-row>
                        <v-col cols="6">
                            <p class="ma-4  text-body-2 text-start">
                                Time in <br>
                                <strong class="text-h6"> {{ format(new Date(selectedAttendance.time_in), 'PPp') }} </strong>
                            </p>
                        </v-col>
                        <v-col cols="6"> 
                            <p class="ma-4  text-body-2 text-start">
                                Time out <br>
                                <strong class="text-h6"> {{ format(new Date(selectedAttendance.time_out), 'PPp') }} </strong>
                            </p>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn color="primary"  @click="deleteAttendanceDialog = false">Cancel</v-btn>
                    <v-btn color="primary"  @click="deleteAttendance" :loading="loading">Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbar">
            {{ message }}
        </v-snackbar>

    </v-container>

    

</template>