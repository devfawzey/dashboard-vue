import {
    createRouter,
    createWebHistory,
    type RouteRecordRaw,
} from "vue-router"

export const routes: RouteRecordRaw[] = [
    {
        name: "home",
        path: "/",
        component: () => import("@/views/HomeView.vue")
    },
    {
        name: "about",
        path: "/about",
        component: () => import("@/views/AboutView.vue")
    },
    {
        name: "inbox",
        path: "/inbox",
        component: () => import("@/views/InboxView.vue")
    },
    {
        name: "customers",
        path: "/customers",
        component: () => import("@/views/CustomersView.vue")
    },
    {
        name: "settings",
        path: "/settings",
        component: () => import("@/views/SettingsView.vue"),
        children: [
            {
                name: "members",
                path: "members",
                component: () => import("@/views/CustomersView.vue")
            },{
                name: "notifications",
                path: "notifications",
                component: () => import("@/views/CustomersView.vue")
            },{
                name: "security",
                path: "security",
                component: () => import("@/views/CustomersView.vue")
            },

        ]
    },

]

export const routeWithoutComponents = (): Pick<RouteRecordRaw, "name" | "path">[] =>
    routes.map(({component, ...route}) => route)

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router;
