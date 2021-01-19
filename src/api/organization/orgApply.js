import request from '@/utils/request'

/**
 * 机构入驻申请分页数据
 * @param {} query 查询参数
 */
export function page(query) {
  return request({
    url: '/admin/orgApply/pageOfApply',
    method: 'post',
    data: query
  })
}

/**
 * 申请详情
 * @param {*} 申请id
 */
export function get(applyId) {
  return request({
    url: '/admin/orgApply/getDetails',
    method: 'post',
    data: { applyId: applyId }
  })
}

/**
 *机构审核通过
 *
 * @export
 * @param {*} applyId
 * @returns
 */
export function adoptExamine(applyId) {
  return request({
    url: '/admin/orgApply/adoptExamine',
    method: 'post',
    data: { applyId: applyId }
  })
}

/**
 *机构审核未通过
 *
 * @export
 * @param {*} applyId 申请id
 * @param {*} resultType 结果类型
 * @param {*} resultMessage 类型描述
 * @returns
 */
export function failureExamine(refuseForm) {
  return request({
    url: '/admin/orgApply/failureExamine',
    method: 'post',
    data: refuseForm
  })
}
