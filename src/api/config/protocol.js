import request from '@/utils/request'

/**
 *协议列表
 *
 * @export
 * @param {*} sceneCode
 * @returns
 */
export function search(sceneCode) {
  return request({
    url: '/admin/protocol/search',
    method: 'post',
    params: { sceneCode: sceneCode }
  })
}

/**
 *场景编码列表
 *
 * @export
 * @returns
 */
export function allScenes() {
  return request({
    url: '/admin/protocol/allScenes',
    method: 'get'
  })
}

/**
 *添加协议
 *
 * @export
 * @returns
 */
export function save(protocol) {
  return request({
    url: '/admin/protocol/save',
    method: 'post',
    data: protocol
  })
}

/**
 *协议修改
 *
 * @export
 * @param {*} protocol
 * @returns
 */
export function update(protocol) {
  return request({
    url: '/admin/protocol/update',
    method: 'post',
    data: protocol
  })
}

