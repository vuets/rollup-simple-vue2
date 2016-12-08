import Vue from 'vue'
import Router from 'vue-router'
import Home from './home/'
import Hello from './Hello'
import app from './App.vue'

Vue.use(Router)
const config = {
    linkActiveClass: 'active',
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: [
        { path: '/home', component: Home },
        { path: '/hello', component: Hello },
        { path: '*', redirect: '/home' }
    ]
}
app.router = new Router(config)
new Vue(app).$mount('#app')
