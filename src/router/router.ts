declare global {
    interface System {
      import (request: string): Promise<any>
    }
    var System: System
}
import login from '../views/login.vue'
import home from '../views/home/home.vue'
import main from '../views/main.vue'
export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('../components/lockscreen/components/locking-page.vue')
};
export const loginRouter = {
    path: '/',
    name: 'login',
    meta: {
        title: 'LogIn'
    },
    component:()=>import('../views/login.vue')
};
export const otherRouters={
    path:'/main',
    name:'main',
    permission:'',
    meta:{title:'ManageMenu'},
    component:main,
    children:[
        {path: 'home', meta:{title:'HomePage'}, name: 'home', component:()=>import('../views/home/home.vue')}
    ]
}
export const appRouters=[{
    path:'/setting',
    name:'setting',
    permission:'',
    meta:{title:'ManageMenu'},
    icon:'&#xe68a;',
    component:main,
    children:[
        {path: 'user',permission:'Pages.Users', meta:{title:'Users'},icon:'&#xe720;', name: 'user', component:()=>import('../views/setting/user/user.vue')},
        {path: 'role',permission:'Pages.Roles', meta:{title:'Roles'},icon:'&#xe63e;', name: 'role', component:()=>import('../views/setting/role/role.vue')},
        {path: 'tenant',permission:'Pages.Tenants', meta:{title:'Tenants'},icon:'&#xe62e;', name: 'tenant', component:()=>import('../views/setting/tenant/tenant.vue')},
        {path: 'Menu',permission:'Pages.Menus', meta:{title:'Menus'},icon:'&#xe66d;', name: 'menu', component:()=>import('../views/setting/menu/menu.vue')}
    ]
},{
    path:'/trades',
    name:'trades',
    permission:'',
    meta:{title:'tradesMenu'},
    icon:'&#xe68a;',
    component:main,
    children:[
        {path: 'Orders',permission:'Pages.Trades', meta:{title:'Orders'},icon:'&#xe720;', name: 'Orders', component:()=>import('../views/trades/Trades.vue')},
         ]
}]
export const tt=[{
    path:'/trades',
    name:'trades',
    permission:'',
    meta:{title:'tradesMenu'},
    icon:'&#xe68a;',
    component:main,
    children:[
        {path: 'trades',permission:'Pages.Trades', meta:{title:'Trade'},icon:'&#xe720;', name: 'trade', component:()=>import('../views/trades/Trades.vue')},
         ]
}]
export const routers = [
    loginRouter,
    locking,
    ...appRouters,
    otherRouters
];
