import request from '@/utils/request'

export function page(query) {
  return request({
    url: '/admin/permission/pageOfPermission',
    method: 'post',
    data: query
  })
}

export function updateName(id, name) {
  return request({
    url: '/admin/permission/updateName',
    method: 'post',
    data: {
      id: id,
      permissionName: name
    }
  })
}

/**
 *资源已授权权限列表
 *
 * @export
 * @param {*} resourceId
 * @param {*} systemName
 * @returns
 */
export function getByResourceId(resourceId, systemName) {
  return request({
    url: '/admin/permission/getByResourceId',
    method: 'post',
    data: {
      resourceId: resourceId,
      systemName: systemName
    }
  })
}

export function grantByResourceId(resourceId, systemName, url) {
  return request({
    url: '/admin/permission/grantByResourceId',
    method: 'post',
    data: {
      resourceId: resourceId,
      systemName: systemName,
      url: url
    }
  })
}

/**
 *资源分配权限
 *
 * @export
 * @param {*} resourceId
 * @param {*} permissionId
 * @returns
 */
export function grantPermission(resourceId, permissionId) {
  return request({
    url: '/admin/permission/grantPermission',
    method: 'post',
    data: {
      resourceId: resourceId,
      permissionId: permissionId
    }
  })
}

/**
 *资源分配权限解除
 *
 * @export
 * @param {*} resourceId
 * @param {*} permissionId
 * @returns
 */
export function relievePermission(resourceId, permissionId) {
  return request({
    url: '/admin/permission/relievePermission',
    method: 'post',
    data: {
      resourceId: resourceId,
      permissionId: permissionId
    }
  })
}
