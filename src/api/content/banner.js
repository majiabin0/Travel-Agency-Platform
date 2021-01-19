import request from '@/utils/request'
/**
 *系统名称集合
 *
 * @export
 * @returns
 */
export function systemNames() {
  return request({
    url: '/content/banner/systemNames',
    method: 'get'
  })
}

/**
 *全部轮播类型列表
 *
 * @export
 * @returns
 */
export function allTypes(systemName) {
  return request({
    url: '/content/banner/allTypes',
    method: 'get',
    params: { systemName: systemName }
  })
}

/**
 *保存轮播类型
 *
 * @export
 * @param {*} bannelType
 * @returns
 */
export function saveType(bannelType) {
  return request({
    url: '/admin/banner/addType',
    method: 'post',
    data: bannelType
  })
}

/**
 *分页查询轮播图片数据
 *
 * @export
 * @param {*} page
 * @returns
 */
export function imgPage(page) {
  return request({
    url: '/admin/banner/imgPage',
    method: 'get',
    params: page
  })
}

/**
 *保存轮播图片
 *
 * @export
 * @param {*} bannelImg
 * @returns
 */
export function saveImg(bannelImg) {
  return request({
    url: '/admin/banner/saveImg',
    method: 'post',
    data: bannelImg
  })
}

/**
 *轮播图片修改
 *
 * @export
 * @param {*} bannelImg
 * @returns
 */
export function updateImg(bannelImg) {
  return request({
    url: '/admin/banner/updateImg',
    method: 'post',
    data: bannelImg
  })
}

/**
 *上线图片
 *
 * @export
 * @param {*} id 图片id
 * @param {*} expireTime 到期时间
 * @param {*} imgOrder 展示顺序
 * @returns
 */
export function imgOnline(id, expireTime, imgOrder) {
  return request({
    url: '/admin/banner/imgOnline',
    method: 'get',
    params: { id: id, expireTime: expireTime, imgOrder: imgOrder }
  })
}

/**
 *调整已上线轮播图片顺序
 *
 * @export
 * @param {*} id
 * @param {*} order
 * @returns
 */
export function updateImgOrder(id, order) {
  return request({
    url: '/admin/banner/updateImgOrder',
    method: 'get',
    params: { id: id, order: order }
  })
}

/**
 *已上线轮播图片下线
 *
 * @export
 * @param {*} id
 * @returns
 */
export function offline(id) {
  return request({
    url: '/admin/banner/offline',
    method: 'get',
    params: { id: id }
  })
}

/**
 *删除轮播图片
 *
 * @export
 * @param {*} id
 * @returns
 */
export function removeImg(id) {
  return request({
    url: '/admin/banner/removeImg',
    method: 'get',
    params: { id: id }
  })
}
