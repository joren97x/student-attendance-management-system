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
            meta: {layout: StudentLayout, requiresAuth: true} 
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
            meta: {layout: AdminLayout, requiresAuth: true} 
        },
        {
            name: 'Attendance',
            path: '/admin/attendance',
            component: Attendance,
            meta: {layout: AdminLayout, requiresAuth: true} 
        },
    ]
})

function isLoggedIn() {
    const authValue = localStorage.getItem('auth');
    console.log("Value in local storage:", authValue);

    if (localStorage.getItem('auth')) {
        return true;
    }
    console.log("It has a value");
    return false;
}

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if(isLoggedIn()) {
            next()
        }
        else {
            next({name: 'Login'})
        }
    }
    else {
        next()
    }
})

export default router