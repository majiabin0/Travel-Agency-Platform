/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-15 13:36:27
 * @LastEditTime: 2019-08-15 14:20:54
 * @LastEditors: Please set LastEditors
 */
import request from '@/utils/request'

/**
 * 订单列表分页数据
 * @param {} query 查询参数
 */
export function orderPages(query) {
  return request({
    url: '/admin/order/orderPages',
    method: 'get',
    params: query
  })
}

/**
 * 订单详情
 * @param {} 查询参数
 */
export function coursePage(query) {
  return request({
    url: '/admin/order/getOrder',
    method: 'get',
    params: query
  })
}
