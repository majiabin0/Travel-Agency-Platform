import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect', '/passwordForgot', '/applyJoin', '/historicalRecord', '/onlinePay', '/test', '/guideList', '/guideDetail', '/orderList', '/priceSet', '/personalCenter', '/evaluateList', '/withdrawDeposit', '/withdrawDetails', '/detailAccount', '/bankCard', '/accountSecurity'] // no redirect whitelist
// const whiteList = ['/login', '/auth-redirect', '/passwordForgot', '/applyJoin', '/test', '/guideList', '/guideDetail', '/orderList', '/personalCenter', '/systemSet', '/privacyPolicy', '/dateSet', '/dateChange', '/infoPerfection', '/coverPhoto', '/headImage', '/liveImage', '/aboutGuide'] // no redirect whitelist
// const whiteList = ['/login', '/auth-redirect', '/passwordForgot', '/applyJoin', '/test', '/guideList', '/guideDetail', '/orderList', '/personalCenter', '/systemSet', '/privacyPolicy', '/dateSet', '/dateChange', '/infoPerfection', '/coverPhoto', '/headImage', '/liveImage'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      console.log('getInfo')
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
  // 判断信息完善画面是否需要刷新
  if (to.path === '/infoPerf' +
    'ection' && from.path === '/coverPhoto') {
    to.meta.keepAlive = true
    // 让列表页 缓存，即不刷新
    next()
  } else {
    to.meta.keepAlive = false
    // 让列表页 即不缓存，刷新
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})
