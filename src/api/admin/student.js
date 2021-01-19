import request from '@/utils/request'

export function page(query) {
  return request({
    url: '/organization/student/getStudents',
    method: 'post',
    data: query
  })
}

export function updateName(data) {
  return request({
    url: '/organization/student/updateStudent',
    method: 'post',
    data: data
  })
}
export function updateRole(form) {
  return request({
    url: '/organization/student/updateStudent',
    method: 'post',
    params: form
  })
}
export function addStudent(form) {
  return request({
    url: '/organization/student/addStudent',
    method: 'post',
    params: form
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
// export function getByResourceId(resourceId, systemName) {
//   return request({
//     url: '/admin/permission/getByResourceId',
//     method: 'post',
//     data: {
//       resourceId: resourceId,
//       systemName: systemName
//     }
//   })
// }
//
// export function grantByResourceId(resourceId, systemName, url) {
//   return request({
//     url: '/admin/permission/grantByResourceId',
//     method: 'post',
//     data: {
//       resourceId: resourceId,
//       systemName: systemName,
//       url: url
//     }
//   })
// }
//
// /**
//  *资源分配权限
//  *
//  * @export
//  * @param {*} resourceId
//  * @param {*} permissionId
//  * @returns
//  */
// export function grantPermission(resourceId, permissionId) {
//   return request({
//     url: '/admin/permission/grantPermission',
//     method: 'post',
//     data: {
//       resourceId: resourceId,
//       permissionId: permissionId
//     }
//   })
// }
//
// /**
//  *资源分配权限解除
//  *
//  * @export
//  * @param {*} resourceId
//  * @param {*} permissionId
//  * @returns
//  */
// export function relievePermission(resourceId, permissionId) {
//   return request({
//     url: '/admin/permission/relievePermission',
//     method: 'post',
//     data: {
//       resourceId: resourceId,
//       permissionId: permissionId
//     }
//   })
// }
