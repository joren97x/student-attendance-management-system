<script setup>
</script>

<template>
    <v-layout>
        <v-app-bar color="primary" prominent>
            <v-toolbar-title>System title</v-toolbar-title>

            <v-spacer></v-spacer>
            <router-link to="/login">
                <v-btn variant="text" color="red" prepend-icon="mdi-logout">Logout</v-btn>
            </router-link>
        </v-app-bar>

      <v-main>
          <v-container>
            <slot/>
          </v-container>
      </v-main>
    </v-layout>
    
</template>