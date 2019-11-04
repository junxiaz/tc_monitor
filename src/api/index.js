import ajax from './ajax'
const BASE_URL = 'http://101.231.106.162:9105/jewelry/web'
//const BASE_URL = 'http://192.168.1.86:8090/jewelry/web'
// const BASE_URL = 'http://192.168.1.72:8090/jewelry/web'
export const reqUserLogin = ({ userCode, userPwd }) => ajax(BASE_URL + '/user/webUserLoginp', { userCode, userPwd }, 'POST') //用户名登录
export const reqShopInfo = (searchData) => ajax(BASE_URL + '/shop/listShopInfo', searchData, 'POST') //首页门店列表
export const reqLabelInfo = (searchData) => ajax(BASE_URL + '/tag/listTagInfo', searchData, 'POST') //标签管理--标签查询列表
export const reqProductOPT = (searchData) => ajax(BASE_URL + '/product/listProductOPT', searchData, 'POST') //标签管理--获取产品选项信息列表接口
export const reqShopOPT = (searchData) => ajax(BASE_URL + '/shop/listShopOPT', searchData, 'POST') //标签管理--获取门店选项信息列表接口

export const reqStatisticsInfo = (searchData) => ajax(BASE_URL + '/statistics/listHandoverStatistics', searchData, 'POST') //门店管理--统计信息、盘点信息
export const reqShopDetails = (datas) => ajax(BASE_URL + '/shop/getShopInfo', datas, 'POST') //门店管理--基础信息查看详情
export const updateShopDetails = (datas) => ajax(BASE_URL + '/shop/updateShopInfo', datas, 'POST') //门店管理--基础信息修改
export const updateShopPrewarning = (datas) => ajax(BASE_URL + '/shop/updateShopPrewarning', datas, 'POST') //门店管理--实时统计预警线修改
export const reqCheckTagStatistics = (searchData) => ajax(BASE_URL + '/statistics/listCheckTagStatistics', searchData, 'POST') //门店管理--盘点历史
export const reqRealTimeStatisticsInfo = (searchData) => ajax(BASE_URL + '/statistics/listRealTimeStatistics', searchData, 'POST') //门店管理--实时统计
export const reqGetShopInfoSpecialTime = (searchData) => ajax(BASE_URL + '/shop/getShopInfoSpecialTime', searchData, 'POST') //门店管理--检查日期是否重复



export const reqListProductInfo = (searchData) => ajax(BASE_URL + '/product/listProductInfo', searchData, 'POST') //产品信息--获取产品信息列表
export const reqAddProductInfo = (searchData) => ajax(BASE_URL + '/product/addProductInfo', searchData, 'POST') //产品信息--添加产品信息
export const reqUpdateProductInfo = (searchData) => ajax(BASE_URL + '/product/updateProductInfo', searchData, 'POST') //产品信息--更改产品信息


