import { createRouter, createWebHistory } from "vue-router"
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Students from '../components/Admin/Students.vue'
import Attendance from '../components/Admin/Attendance.vue'
import AdminLayout from '../components/Layout/AdminLayout.vue'
import StudentLayout from '../components/Layout/StudentLayout.vue'
import AuthLayout from '../components/Layout/AuthLayout.vue'

const router = createRouter({
    history: createWebHistory(null),
    routes: [
        {
            name: 'Home',
            path: '/',
            component: Home,
            meta: {layout: StudentLayout} 
        },
        {
            name: 'Login',
            path: '/login',
            component: Login,
            meta: {layout: AuthLayout} 
        },
        {
            name: 'Students',
            path: '/admin/students',
            component: Students,
            meta: {layout: AdminLayout} 
        },
        {
            name: 'Attendance',
            path: '/admin/attendance',
            component: Attendance,
            meta: {layout: AdminLayout} 
        },
        {
            name: 'Logout',
            path: '/logout',
            component: Login,
        },
    ]
})

export default router