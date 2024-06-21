import httpInstance from '../utils/http.js';

/*创建订单 */
export function createOrderAPI(data) {
  return httpInstance.post('/api/public/v1/my/orders/create', data);
}
/**订单预支付 */
export function prePayOrderAPI(data) {
  return httpInstance.post('/api/public/v1/my/orders/req_unifiedorder', data);
}
/**订单支付状态 */
export function checkOrderAPI(data) {
  return httpInstance.post('/api/public/v1/my/orders/chkOrder', data);
}
