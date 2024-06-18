const homePageRoutes = [
    {
        path: '/home',
        name: 'home',
        component: () => import('../components/home/page.vue'),
        redirect: '/home/default',
        children: [
            {
                path: '/home/default',
                name: 'homeDefault',
                component: () => import('../components/home/children/default.vue')
            },
            {
                path: '/home/publicSupervision',
                name: 'publicSupervision',
                component: () => import('../components/home/children/publicSupervision.vue')
            },
            {
                path: '/home/confirmAQI',
                name: 'confirmAQI',
                component: () => import('../components/home/children/confirmAQI.vue')
            },
            {
                path: '/home/provincialGroup',
                name: 'provincialGroup',
                component: () => import('../components/home/children/provincialGroup.vue')
            },
            {
                path: '/home/AqiDistribution',
                name: 'AqiDistribution',
                component: () => import('../components/home/children/AqiDistribution.vue')
            },
            {
                path: '/home/AqiTrend',
                name: 'AqiTrend',
                component: () => import('../components/home/children/AqiTrend.vue')
            },
            {
                path: '/home/otherData',
                name: 'otherData',
                component: () => import('../components/home/children/otherData.vue')
            }
        ]
    },
]

const defaultPageRoutes = [
    {
        path: '/',
        redirect: '/home',
    }
]

const loginPageRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../components/login/page.vue'),
    }
]


export const route = Array.prototype.concat(homePageRoutes, defaultPageRoutes, loginPageRoutes)