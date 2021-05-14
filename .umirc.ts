import { defineConfig } from 'umi';

export default defineConfig({
    nodeModulesTransform: {
        type: 'none',
    },
    routes: [
        // { path: '/', component: '@/pages/index' },
        {   
            path: '/', 
            component: '@/layout/index',
            routes: [
                {
                    path: '/',
                    title: '首页',
                    component: './Home'
                }, {
                    path: '/users',
                    title: '用户',
                    component: './Users',
                    wrappers: [
                        '@/wrappers/auth',
                    ]
                }, {
                    path: '/login',
                    title: '登录',
                    component: './Login'
                }, {
                    path: '/report',
                    title: '周报',
                    component: './Report'
                }, {
                    path: '/report/write',
                    title: '写周报',
                    component: './Report/write'
                }, {
                    path: '/report/edit/:id',
                    title: '编辑周报',
                    component: './Report/write'
                }
            
            ]
        }
    ],
    sass: {
        implementation: require('node-sass'),
    },
    cssModulesTypescriptLoader: {
        mode: 'emit',
    },
    fastRefresh: {},
    proxy: {
        '/api': {
          target: 'https://cjy-react-interface.herokuapp.com/',
          changeOrigin: true,
        },
      },
});
