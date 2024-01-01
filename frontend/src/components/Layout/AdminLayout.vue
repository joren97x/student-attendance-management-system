<script setup>

    import router from '../../router/index.js'

    function logout() {
        localStorage.removeItem('auth')
        router.push('/')
    }

</script>

<template>
    <v-layout>
        <v-app-bar color="primary" prominent>
            <v-toolbar-title>System title</v-toolbar-title>

            <v-spacer></v-spacer>
            <router-link to="/admin/students">
                <v-btn variant="text" color="white" prepend-icon="mdi-account">Students</v-btn>
            </router-link>
            <router-link to="/admin/attendance">
                <v-btn variant="text" color="white" prepend-icon="mdi-calendar-range">Attendance</v-btn>
            </router-link>
            <v-btn variant="text" @click="logout" color="red" prepend-icon="mdi-logout">Logout</v-btn>
        </v-app-bar>

        <v-main class="bg-grey-lighten-3" style="height: 100vh">
            <slot/>
        </v-main>

    </v-layout>
    
</template>