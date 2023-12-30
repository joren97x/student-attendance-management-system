<script setup>

    import {ref} from 'vue'
    import axios from 'axios'
    import router from '@/router';
    
    const showPassword = ref(false)
    const email = ref(null)
    const password = ref(null)
    const error = ref('')

    async function login() {
        try {
            const result = await axios.post("http://localhost:5000/login", {
                email: email.value,
                password: password.value
            })
            console.log(result.data[0])
            localStorage.setItem("auth", JSON.stringify(result.data[0]))
            if(result.data[0].role == 'admin') {
                router.push('/admin/students')
            }
            else {
                router.push('/')
            }
        }
        catch(err) {
            console.log(err)
            error.value = 'Invalid credentials'
        }
    }

</script>

<template>
    <v-card title="Login" color="grey-lighten-3">
        {{ user }}
        <v-form @submit.prevent>
            <v-card-item>
                <v-text-field label="Email" v-model="email" :error-messages="error" variant="solo"></v-text-field>
                <v-text-field label="Password" v-model="password" :type="showPassword ? '' : 'password'" variant="solo">
                    <template v-slot:append-inner>
                        <v-btn @click="showPassword = !showPassword" variant="text" :icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"></v-btn>
                    </template>
                </v-text-field>
            </v-card-item>
            <v-card-actions>
                <v-spacer/>
                <v-btn type="submit" @click="login">Login</v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>