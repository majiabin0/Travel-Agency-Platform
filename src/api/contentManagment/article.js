import request from '@/utils/request'

export function sceneCodes() {
  return request({
    url: '/admin/article/sceneCodes',
    method: 'get'
  })
}
/**
 * 获得指定菜单id的详细数据
 * @param {id} 菜单ID
 */
export function getArticle(id) {
  return request({
    url: '/admin/article/get',
    method: 'get',
    params: {
      articleId: id
    }
  })
}
/**
 * 保存文章
 * @param {*} 文章数据
 */
export function create(article) {
  return request({
    url: '/admin/article/saveArticle',
    method: 'post',
    params: article
  })
}

/**
 * 分页数据
 * @param {*}
 */
export function pages(query) {
  return request({
    url: '/admin/article/pages',
    method: 'post',
    params: {
      query: query
    }
  })
}
