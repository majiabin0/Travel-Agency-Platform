import request from '@/utils/request'

/**
 *分页字典数据
 *
 * @export
 * @param {*} query
 * @returns
 */
export function pageOfDic(query) {
  return request({
    url: '/common/dictionary/pageOfDic',
    method: 'get',
    params: query
  })
}

/**
 *保存字典数据
 *
 * @export
 * @param {*} form
 * @returns
 */
export function saveDic(form) {
  return request({
    url: '/admin/dictionary/saveDic',
    method: 'post',
    data: form
  })
}
