import request from '@/utils/request'
import axios from 'axios'
/**
 *文章板块列表
 *
 * @export
 * @returns
 */
export function allPlate() {
  return request({
    url: '/admin/article/allPlate',
    method: 'get'
  })
}

/**
 * 文章板块添加
 *
 * @export
 * @param {*} plate
 * @returns
 */
export function savePlate(plate) {
  return request({
    url: '/admin/article/savePlate',
    method: 'post',
    data: plate
  })
}

/**
 * 文章板块修改
 *
 * @export
 * @param {*} plate
 * @returns
 */
export function updatePlate(plate) {
  return request({
    url: '/admin/article/updatePlate',
    method: 'post',
    data: plate
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data: data
  })
}

/**
 *我的文章列表
 *
 * @export
 * @param {*} query
 * @returns
 */
export function myArticle(query) {
  return request({
    url: '/admin/article/myArticle',
    method: 'post',
    data: query
  })
}

/**
 *创建文章
 *
 * @export
 * @param {*} article
 * @returns
 */
export function createArticle(article) {
  return request({
    url: '/admin/article/saveArticle',
    method: 'post',
    data: article
  })
}

/**
 *文章详情
 *
 * @export
 * @param {*} id 文章id
 * @returns
 */
export function get(id) {
  return request({
    url: '/admin/article/getById',
    method: 'get',
    params: { id: id }
  })
}

/**
 *文章编辑保存
 *
 * @export
 * @param {*} article
 * @returns
 */
export function upadteArticle(article) {
  return request({
    url: '/admin/article/updateArticle',
    method: 'post',
    data: article
  })
}

/**
 *文章审核列表
 *
 * @export
 * @param {*} query
 * @returns
 */
export function examineArticle(query) {
  return request({
    url: '/admin/article/examineArticle',
    method: 'get',
    params: query
  })
}

/**
 *文章最新审核数据
 *
 * @export
 * @param {*} articleId
 * @returns
 */
export function newestExamine(articleId) {
  return request({
    url: '/admin/article/newestExamine',
    method: 'get',
    params: { articleId: articleId }
  })
}

/**
 *文章审核历史记录
 *
 * @export
 * @param {*} articleId
 * @returns
 */
export function examineHistory(articleId) {
  return request({
    url: '/admin/article/examineHistory',
    method: 'get',
    params: { articleId: articleId }
  })
}

/**
 *文章审核结果
 *
 * @export
 * @param {*} examine
 * @returns
 */
export function examineResult(examine) {
  return request({
    url: '/admin/article/examineResult',
    method: 'post',
    data: examine
  })
}

/**
 * 图片文件上传
 *
 * @export
 * @param {*} formData
 * @returns
 */
export function uploadFile(formData) {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  return axios.post('/api/oss/file/uploadFile', formData, config)
}

