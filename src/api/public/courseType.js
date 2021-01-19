import request from '@/utils/request'

/**
 * 一级和二级类型集合
 */
export function firstCourseTypes() {
  return request({
    url: '/admin/courseType/firstCourseTypes',
    method: 'get'
  })
}

/**
 * 三级类型集合
 * @param {*} 二级类型id
 */
export function getLeafType(parentId) {
  return request({
    url: '/admin/courseType/getLeafType',
    method: 'get',
    params: { parentId: parentId }
  })
}

/**
 *根据编码获取类型数据
 *
 * @export
 * @param {*} code
 * @returns
 */
export function getByCode(code) {
  return request({
    url: '/admin/courseType/getByCode',
    method: 'post',
    params: { code: code }
  })
}

/**
 *类型修改
 *
 * @export
 * @param {*} courseType
 * @returns
 */
export function update(courseType) {
  return request({
    url: '/admin/courseType/update',
    method: 'post',
    params: courseType
  })
}

export function save(courseType) {
  return request({
    url: '/admin/courseType/saveCourseType',
    method: 'post',
    params: courseType
  })
}

export function remove(courseTypeId) {
  return request({
    url: '/admin/courseType/remove',
    method: 'get',
    params: { courseTypeId: courseTypeId }
  })
}

export function allTypes() {
  return request({
    url: '/common/courseType/all',
    method: 'get'
  })
}
