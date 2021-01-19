import request from '@/utils/request'

/**
 *系统名称
 *
 * @export
 * @returns
 */
export function systemName() {
  return request({
    url: '/common/general/systemName',
    method: 'get'
  })
}
