import request from '@/utils/request'

/**
 * 省数据集合
 */
export function provinces() {
  return request({
    url: '/admin/region/provinces',
    method: 'get'
  })
}

/**
 * 根据编码获取
 * @param {*} 地区编码
 */
export function getByCode(code) {
  return request({
    url: '/admin/region/getByCode',
    method: 'get',
    params: { code: code }
  })
}

/**
 *下级地区列表
 *
 * @export
 * @param {*} parentCode 上级地区编码
 * @returns
 */
export function subRegion(parentCode) {
  return request({
    url: '/admin/region/subRegion',
    method: 'get',
    params: { parentCode: parentCode }
  })
}

/**
 *地区修改
 *
 * @export
 * @param {*}
 * @returns
 */
export function update(region) {
  return request({
    url: '/admin/region/update',
    method: 'post',
    data: region
  })
}

