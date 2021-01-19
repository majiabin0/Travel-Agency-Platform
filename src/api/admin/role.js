import request from '@/utils/request'

/**
 *分页查询角色列表
 *
 * @export
 * @param {*} query
 * @returns
 */
export function page(query) {
  return request({
    url: '/admin/adminRole/pages',
    method: 'post',
    params: query
  })
}

/**
 *角色添加
 *
 * @export
 * @param {*} form
 * @returns
 */
export function addRole(form) {
  return request({
    url: '/admin/adminRole/addRole',
    method: 'post',
    params: form
  })
}
/**
 *角色修改
 *
 * @export
 * @param {*} form
 * @returns
 */
export function updateRole(form) {
  return request({
    url: '/admin/adminRole/modifyRole',
    method: 'post',
    params: form
  })
}

/**
 *角色删除
 *
 * @export
 * @param {*} roleId
 * @returns
 */
export function removRole(roleId) {
  return request({
    url: '/admin/adminRole/removeRole',
    method: 'get',
    params: { roleId: roleId }
  })
}

/**
 *分页角色用户
 *
 * @export
 * @param {*} query
 * @returns
 */
export function roleUser(query) {
  return request({
    url: '/admin/adminRole/pageUserByRole',
    method: 'post',
    params: query
  })
}

/**
 *指定用户的角色列表
 * 会有2组数据，
 * userRole:用户的角色；
 * allRoles：全部角色数据
 *
 * @export
 * @param {*} query
 * @returns
 */
export function userRoles(userId) {
  return request({
    url: '/admin/adminRole/userRoles',
    method: 'post',
    params: { userId: userId }
  })
}

/**
 *为用户授权
 *
 * @export
 * @param {*} userId
 * @param {*} roleIds
 * @returns
 */
export function grant(userId, roleIds) {
  return request({
    url: '/admin/adminRole/grant',
    method: 'post',
    params: { userId: userId, roleIds: roleIds }
  })
}

/**
 *为用户撤权
 *
 * @export
 * @param {*} userId
 * @param {*} roleIds
 * @returns
 */
export function revoke(userId, roleIds) {
  return request({
    url: '/admin/adminRole/revoke',
    method: 'post',
    params: { userId: userId, roleIds: roleIds }
  })
}

/**
 * 角色资源数据
 * @param {*} roleId 角色id
 */
export function roleResource(roleId) {
  return request({
    url: '/admin/adminRole/getRoleResources',
    method: 'get',
    params: { roleId: roleId }
  })
}

/**
 *
 * 角色资源数据保存
 * @export
 * @param {*} roleId 角色id
 * @param {*} resourceIds 资源id
 * @returns
 */
export function updateRoleResource(roleId, resourceIds) {
  return request({
    url: '/admin/adminRole/updateRoleResource',
    method: 'post',
    params: { roleId: roleId, resourceIds: resourceIds }
  })
}
