import request from '@/utils/request'

export function page(query) {
  return request({
    url: '/admin/adminElement/pageByMenuId',
    method: 'get',
    params: query
  })
}

/**
 *页面元素添加
 *
 * @export
 * @param {*} element
 * @returns
 */
export function addElement(element) {
  return request({
    url: '/admin/adminElement/addElement',
    method: 'post',
    data: element
  })
}

/**
 *页面元素修改
 *
 * @export
 * @param {*} element
 * @returns
 */
export function udateElement(element) {
  return request({
    url: '/admin/adminElement/updateElement',
    method: 'post',
    data: element
  })
}

/**
 *删除元素
 *
 * @export
 * @param {*} id
 * @returns
 */
export function removeElement(id) {
  return request({
    url: '/admin/adminElement/remove',
    method: 'get',
    params: { id: id }
  })
}
