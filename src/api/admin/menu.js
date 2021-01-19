import request from '@/utils/request'

export function menuTree(query) {
  return request({
    url: '/admin/adminMenu/menuTree',
    method: 'get',
    params: query
  })
}
/**
 * 获得指定菜单id的详细数据
 * @param {id} 菜单ID
 */
export function getMenu(id) {
  return request({
    url: '/admin/adminMenu/get',
    method: 'get',
    params: {
      id: id
    }
  })
}
/**
 * 添加菜单
 * @param {*} 菜单数据
 */
export function create(menu) {
  return request({
    url: '/admin/adminMenu/addMenu',
    method: 'post',
    params: menu
  })
}
export function update(id, menu) {
  menu.id = id
  return request({
    url: '/admin/adminMenu/update',
    method: 'post',
    params: menu
  })
}

/**
 * 菜单删除
 * @param {*} 菜单id
 */
export function remove(id) {
  return request({
    url: '/admin/adminMenu/delete',
    method: 'post',
    params: {
      id: id
    }
  })
}
