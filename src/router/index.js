/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-15 13:17:23
 * @LastEditTime: 2019-08-15 13:39:08
 * @LastEditors: Please set LastEditors
 */
// {
//   path: '/Register',
//   component: () => import('@/views/login/Register'),
//   hidden: true
// },
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout/Layout'
// 公共路由
export const constantRoutes = [{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path*',
    component: () => import('@/views/redirect/index')
  }]
},
{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},
{
  path: '/applyJoin',
  component: () => import('@/views/login/applyJoin'),
  hidden: true
},
{
  path: '/evaluateList',
  component: () => import('@/views/evaluateList/index'),
  hidden: true
},
{
  path: '/financial',
  component: () => import('@/views/financial/index'),
  hidden: true
},
{
  path: '/withdrawDeposit',
  component: () => import('@/views/personalCenter/withdrawDeposit'),
  hidden: true
},
{
  path: '/withdrawDetails',
  component: () => import('@/views/personalCenter/withdrawDetails'),
  hidden: true
},
{
  path: '/detailAccount',
  component: () => import('@/views/personalCenter/detailAccount'),
  hidden: true
},
{
  path: '/orderDetails',
  component: () => import('@/views/personalCenter/orderDetails'),
  hidden: true
},
{
  path: '/spendingDetails',
  component: () => import('@/views/personalCenter/spendingDetails'),
  hidden: true
},
{
  path: '/bankCard',
  component: () => import('@/views/personalCenter/bankCard'),
  hidden: true
},
{
  path: '/priceSet',
  component: () => import('@/views/personalCenter/priceSet'),
  hidden: true
},
{
  path: '/onlinePay',
  component: () => import('@/views/personalCenter/onlinePay'),
  hidden: true
},
{
  path: '/historicalRecord',
  component: () => import('@/views/personalCenter/historicalRecord'),
  hidden: true
},
{
  path: '/accountSecurity',
  component: () => import('@/views/personalCenter/accountSecurity'),
  hidden: true
},
{
  path: '/evaluateDetails',
  component: () => import('@/views/evaluateList/evaluateDetails'),
  hidden: true
},
{
  path: '/personalCenter',
  component: () => import('@/views/personalCenter/index'),
  hidden: true
},
{
  path: '/guideList',
  component: () => import('@/views/login/guideList'),
  hidden: true
},
// 档期管理
{
  path: '/dateSet',
  component: () => import('@/views/login/dateSet'),
  hidden: true
},
// 档期设置
{
  path: '/dateChange',
  component: () => import('@/views/login/dateChange'),
  chooseDate: 'chooseDate',
  hidden: true
},
// 信息完善
{
  path: '/infoPerfection',
  component: () => import('@/views/login/infoPerfection'),
  imgUrl: 'imgUrl',
  headImageUrl: 'headImageUrl',
  liveImgUrl: 'liveImgUrl',
  hidden: true
  // meta: {
  //   keepAlive: false
  // }
  // beforeRouteLeave(to, from, next) {
  //   console.log(from.path)
  //   if (from.path === '/coverPhoto') {
  //     to.meta.keepAlive = true
  //   } else {
  //     to.meta.keepAlive = false
  //   }
  //   next()
  // }
},
// 上传封面照
{
  path: '/coverPhoto',
  component: () => import('@/views/login/coverPhoto'),
  hidden: true
},
// 上传头像
{
  path: '/headImage',
  component: () => import('@/views/login/headImage'),
  hidden: true
},
// 上传生活照
{
  path: '/liveImage',
  component: () => import('@/views/login/liveImage'),
  hidden: true
},
// 关于导游平台
{
  path: '/aboutGuide',
  component: () => import('@/views/personalCenter/aboutGuide'),
  hidden: true
},
// 用户服务条款
{
  path: '/serviceTerms',
  component: () => import('@/views/personalCenter/serviceTerms'),
  hidden: true
},
// 余额和提现规则
{
  path: '/withdrawalRules',
  component: () => import('@/views/personalCenter/withdrawalRules'),
  hidden: true
},
// 联系我们
{
  path: '/callUs',
  component: () => import('@/views/personalCenter/callUs'),
  hidden: true
},
// 多语言
{
  path: '/languageSet',
  component: () => import('@/views/personalCenter/languageSet'),
  hidden: true
},
{
  path: '/guideDetail',
  component: () => import('@/views/login/guideDetail'),
  hidden: true
},
{
  path: '/orderList',
  component: () => import('@/views/login/orderList'),
  hidden: true
},
{
  path: '/submitAudit',
  component: () => import('@/views/login/submitAudit'),
  hidden: true
},
{
  path: '/priceList',
  component: () => import('@/views/dashboard/priceList'),
  hidden: true
},
{
  path: '/student',
  component: () => import('@/views/dashboard/student'),
  hidden: true
},
{
  path: '/basicInformation',
  component: () => import('@/views/user/basicInformation'),
  hidden: true
},
{
  path: '/certificate',
  component: () => import('@/views/user/certificate'),
  hidden: true
},
{
  path: '/campus',
  component: () => import('@/views/dashboard/campus'),
  hidden: true
},
{
  path: '/campusCreate',
  component: () => import('@/views/dashboard/campusCreate'),
  hidden: true
},
{
  path: '/employees',
  component: () => import('@/views/dashboard/employees'),
  hidden: true
},
{
  path: '/studentList',
  component: () => import('@/views/dashboard/studentList'),
  hidden: true
},
{
  path: '/coursePrice',
  component: () => import('@/views/dashboard/coursePrice'),
  hidden: true
},
{
  path: '/labelList',
  component: () => import('@/views/dashboard/labelList'),
  hidden: true
},
{
  path: '/classList',
  component: () => import('@/views/dashboard/classList'),
  hidden: true
},
{
  path: '/positionList',
  component: () => import('@/views/dashboard/positionList'),
  hidden: true
},
{
  path: '/changeClass',
  component: () => import('@/views/dashboard/common/changeClass'),
  hidden: true
},

// {
//   path: '/ServiceForm',
//   component: () => import('@/views/dashboard/ServiceForm'),
//   hidden: true
// },
// {
//   path: '/orderRefund',
//   component: () => import('@/views/dashboard/orderRefund'),
//   hidden: true
// },
// {
//   path: '/feedback',
//   component: () => import('@/views/dashboard/feedback'),
//   hidden: true
// },
// {
//   path: '/test',
//   component: () => import('@/views/dashboard/test'),
//   hidden: true
// },
{
  path: '/test',
  component: () => import('@/views/login/test'),
  hidden: true
},
{
  path: '/auth-redirect',
  component: () => import('@/views/login/authredirect'),
  hidden: true
},
{
  path: '/passwordForgot',
  component: () => import('@/views/login/passwordForgot'),
  hidden: true
},
{
  path: '/information',
  component: () => import('@/views/login/information'),
  hidden: true
},
{
  path: '/review',
  component: () => import('@/views/login/review'),
  hidden: true
},
// 系统设置
{
  path: '/systemSet',
  component: () => import('@/views/personalCenter/systemSet'),
  hidden: true
},
// 隐私政策
{
  path: '/privacyPolicy',
  component: () => import('@/views/personalCenter/privacyPolicy'),
  hidden: true
},
{
  path: '/404',
  component: () => import('@/views/errorPage/404'),
  hidden: true
},
{
  path: '/401',
  component: () => import('@/views/errorPage/401'),
  hidden: true
},
{
  path: '/',
  component: Layout,
  redirect: 'dashboard',
  children: [{
    path: 'dashboard',
    component: () => import('@/views/dashboard/index'),
    name: 'Dashboard',
    meta: {
      title: '首页',
      icon: 'dashboard',
      noCache: true,
      affix: true
    }
  }]
}
]

// 系统业务菜单
export const permissionRouters = [{
  code: 'student-manager',
  path: '/student',
  component: Layout,
  alwaysShow: true, // will always show the root menu
  meta: {
    title: '一级菜单',
    icon: 'lock'
  },
  children: [{
    code: 'student-manager',
    path: 'student-manager',
    component: () => import('@/views/dashboard/studentList'),
    name: 'student-manager',
    meta: {
      title: '学生管理'
    }
  },
  {
    code: 'course-manager',
    path: 'coursePrice',
    component: () => import('@/views/dashboard/coursePrice'),
    name: 'course-manager',
    meta: {
      title: '课程管理'
    }
  },
  {
    code: 'class-manager',
    path: 'classList',
    component: () => import('@/views/dashboard/classList'),
    name: 'class-manager',
    meta: {
      title: '班级管理'
    }
  }

  ]

},
// {
//   code: 'course-manager',
//   path: '/course-manager',
//   component: Layout,
//   alwaysShow: true, // will always show the root menu
//   meta: {
//     title: '课程管理',
//     icon: 'lock'
//   }
// },
{
  code: 'user',
  path: '/user',
  component: Layout,
  alwaysShow: true,
  meta: {
    title: '用户管理',
    icon: 'lock'
  },
  children: [{
    code: 'register-user',
    path: 'register-user',
    component: () => import('@/views/user/registerUser'),
    name: 'register-user',
    meta: {
      title: '注册用户'
    }
  }]
},
{
  code: 'content',
  path: '/content',
  component: Layout,
  alwaysShow: true,
  meta: {
    title: '内容管理',
    icon: 'lock'
  },
  children: [{
    code: 'article-plate',
    path: 'articlePlate',
    component: () => import('@/views/content/articlePlate'),
    name: 'article-plate',
    meta: {
      title: '文章板块'
    }
  },
  {
    code: 'create-article',
    path: 'createArticle',
    component: () => import('@/views/content/createArticle'),
    name: 'create-article',
    meta: {
      title: '创建文章'
    }
  },
  {
    code: 'create-article',
    path: 'editArticle/:id',
    component: () => import('@/views/content/createArticle'),
    name: 'create-article',
    hidden: true,
    meta: {
      title: '编辑文章'
    }
  },
  {
    code: 'examine-details',
    path: 'examineDetails/:id',
    component: () => import('@/views/content/examineDetails'),
    name: 'examine-details',
    hidden: true,
    meta: {
      title: '审核详情'
    }
  },
  {
    code: 'article-list',
    path: 'article-list',
    component: () => import('@/views/content/article'),
    name: 'articleList',
    meta: {
      title: '我的文章'
    }
  },
  {
    code: 'article-examine',
    path: 'article-examine',
    component: () => import('@/views/content/examineArticle'),
    name: 'articleAxamine',
    meta: {
      title: '文章审核'
    }
  }
  ]
},
{
  code: 'banner-manager',
  path: '/banner',
  component: Layout,
  alwaysShow: true,
  meta: {
    title: '轮播管理',
    icon: 'lock'
  },
  children: [{
    code: 'banner-type',
    path: 'banner-type',
    component: () => import('@/views/content/bannerType'),
    name: 'bannerType',
    meta: {
      title: '轮播类型'
    }
  },
  {
    code: 'banner-images',
    path: 'banner-images',
    component: () => import('@/views/content/bannerImages'),
    name: 'bannerImages',
    meta: {
      title: '轮播图片'
    }
  }
  ]
},
{
  code: 'public-service',
  path: '/public',
  component: Layout,
  alwaysShow: true,
  meta: {
    title: '公共服务',
    icon: 'lock'
  },
  children: [{
    code: 'course-type',
    path: 'courseType',
    component: () => import('@/views/public/courseType'),
    name: 'course-type',
    meta: {
      title: '课程类型'
    }
  },
  {
    code: 'region',
    path: 'region',
    component: () => import('@/views/public/Region'),
    name: 'region',
    meta: {
      title: '行政区划'
    }
  },
  {
    code: 'system-icons',
    path: '/icons',
    component: () => import('@/views/svg-icons/index'),
    meta: {
      title: '系统图标',
      icon: 'icon',
      noCache: true
    },
    name: 'systemIcons'
  }
  ]
},
{
  code: 'system-config',
  path: '/systemConfig',
  component: Layout,
  alwaysShow: true, // will always show the root menu
  meta: {
    title: '系统配置',
    icon: 'lock'
  },
  children: [{
    code: 'protocol-config',
    path: 'page',
    component: () => import('@/views/config/protocol'),
    name: 'protocol-config',
    meta: {
      title: '协议须知'
    }
  },
  {
    code: 'dictionary',
    path: 'dictionary',
    component: () => import('@/views/config/dictionary'),
    name: 'dictionary',
    meta: {
      title: '字典管理'
    }
  }
  ]
}
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
