import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },


  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/index',
    component: Layout,
    redirect: '/index/index',
    name: 'CMS管理',
    meta: { title: 'CMS管理', icon: 'cms' },
    children: [
      {
      path: 'index',
      name: 'index',
      component: () => import('@/views/index/index'),
      meta: { title: '拼团主题', icon: 'zhuti' }
      },
      {
        path: 'createIndex',
        name: 'createIndex',
        component: () => import('@/views/index/createIndex'),
        meta: { title: '首页内容编辑', icon: 'edit' },
        hidden: true
      },
      {
        path: 'classify',
        name: 'classify',
        component: () => import('@/views/index/classify'),
        meta: { title: '文章分类', icon: 'articleClass' },
      },
      {
        path: 'helpArticle',
        name: 'helpArticle',
        component: () => import('@/views/index/helpArticle'),
        meta: { title: '文章管理', icon: 'article' },
      },
      {
        path: 'createHelp',
        name: 'createHelp',
        component: () => import('@/views/index/createHelp'),
        meta: { title: '帮助内容编辑', icon: 'edit' },
        hidden: true
      },
    ]

  },

  {
    path: '/banner',
    component: Layout,
    redirect: '/banner/index',
    name: '广告管理',
    meta: { title: '广告管理', icon: 'ad' },
    children: [
      {
        path: 'banner',
        name: 'banner',
        component: () => import('@/views/banner/index'),
        meta: { title: '广告管理', icon: 'ad' }
      },
      {
        path: 'createBanner',
        name: 'createBanner',
        component: () => import('@/views/banner/createBanner'),
        meta: { title: '创建banner', icon: 'zhuti' },
        hidden: true
      },

    ]

  },

  {
    path: '/studio',
    component: Layout,
    redirect: '/studio/index',
    name: '机构管理',
    meta: { title: '机构管理', icon: 'cms' },
    children: [
      {
        path: 'studio',
        name: 'studio',
        component: () => import('@/views/studio/index'),
        meta: { title: '机构管理', icon: 'xq' }
      },
      {
        path: 'createStudio',
        name: 'createStudio',
        component: () => import('@/views/studio/createStudio'),
        meta: { title: '创建机构', icon: 'zhuti' },
        hidden: true
      }
    ]

  },




//  创建课程
  {
    path: '/course',
    component: Layout,
    redirect: '/course/course',
    name: '课程信息',
    meta: { title: '课程信息', icon: 'kc' },
    children: [
      {
        path: 'course',
        name: 'course',
        component: () => import('@/views/course/createcoursecat/index'),
        meta: { title: '课程分类', icon: 'kcfl' }
      },
      {
        path: 'reEdit/:id(\\d+)',
        component: () => import('@/views/course/createcoursecat/reEdit'),
        name: 'reEdit',
        meta: { title: '编辑',  activeMenu: '/course/createcoursecat/index' },
        hidden: true
      },

      {
        path: 'editgoods',
        name: 'editgoods',
        component: () => import('@/views/course/createcoursecat/editgoods'),
        meta: { title: '添加分类', icon: 'form' },
        hidden: true
      },
      {
        path: 'addcoursebook',
        name: 'addcoursebook',
        component: () => import('@/views/course/addcoursebook/index'),
        meta: { title: '添加书籍', icon: 'tjsj' }
      }
    ]
  },

  {
    path: '/userOrder',
    component: Layout,
    redirect: '/userOrder/orderList',
    name: '报名管理',
    meta: { title: '报名管理', icon: 'dd' },
    children: [
      {
        path: 'orderList',
        name: 'orderList',
        component: () => import('@/views/userOrder/orderList/index'),
        meta: { title: '待处理', icon: 'dfh' }
      },
      {
        path: 'sendList',
        name: 'sendList',
        component: () => import('@/views/userOrder/sendList/index'),
        meta: { title: '已处理', icon: 'yfh' }
      },
      {
        path: 'searchOrder',
        name: 'searchOrder',
        component: () => import('@/views/userOrder/searchOrder/index'),
        meta: { title: '报名搜索', icon: 'search' }
      }
    ]
  },

  {
    path: '/userManger',
    component: Layout,
    redirect: '/userManger/userAddress',
    name: '用户管理',
    meta: { title: '用户管理', icon: 'user' },
    children: [
      {
        path: 'users',
        name: 'users',
        component: () => import('@/views/userManger/users/index'),
        meta: { title: '学员档案', icon: 'user' }
      },
      {
        path: 'userAddress',
        name: 'userAddress',
        component: () => import('@/views/userManger/userAddress/index'),
        meta: { title: '课程排行榜', icon: 'phb' }
      },
    ]

  },

  {
    path: '/live',
    component: Layout,
    redirect: '/live/livehome',
    name: '直播列表',
    meta: { title: '直播', icon: 'video' },
    children: [
      {
        path: 'live',
        name: 'live',
        component: () => import('@/views/live/livehome'),
        meta: { title: '直播列表', icon: 'star' }
      },

    ]
  },


/*
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },
 */



  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },


  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
