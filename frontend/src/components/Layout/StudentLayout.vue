<script setup>

    import router from '../../router/index.js'

    function logout() {
        localStorage.removeItem('auth')
        router.push('/login')
    }

</script>

<template>
    <v-layout>
        <v-app-bar color="primary" prominent>
            <v-toolbar-title>AMS - student</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-btn variant="text" color="red" @click="logout" prepend-icon="mdi-logout">Logout</v-btn>
        </v-app-bar>

      <v-main>
          <v-container>
            <slot/>
          </v-container>
      </v-main>
    </v-layout>
    
</template>