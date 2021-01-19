import { asyncRoutes, constantRoutes, permissionRouters } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}
/**
 * 基于后台菜单数据生成 roure
 * @param menu  后台菜单对象数据
 */
export function generateRoute(menus) {
  const accessedRoutes = permissionRouters.filter(permissionRouter => {
    /* return menus.forEach(menu => {
      if (menu.code === permissionRouter.code) {
        return true
      }
    }) */
    return checkPermission(permissionRouter, menus)
  })
  return accessedRoutes
}

/**
 * 检查一次权限菜单数据
 * @param permissionRouter 一级权限菜单
 * @param {*} menus
 */
export function checkPermission(permissionRouter, menus) {
  let has = false
  menus.forEach(menu => {
    if (permissionRouter.hidden) {
      // 隐藏菜单不做权限判定
      has = true
    }
    if (permissionRouter.code === menu.resourceCode) {
      has = true
      if (menu.subResource && menu.subResource.length > 0) {
        if (permissionRouter.children && permissionRouter.children.length > 0) {
          permissionRouter.children = permissionRouter.children.filter(sub => {
            return checkPermission(sub, menu.subResource)
          })
        }
      }
    }
  })
  return has
}
const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  generateRoutesFromMenus({ commit }, menus) {
    return new Promise(resolve => {
      const accessedRoutes = generateRoute(menus)
      console.log(accessedRoutes,'accessedRoutes')
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
