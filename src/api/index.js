import ajax from './ajax'
// const BASE_URL = 'http://101.231.106.162:9105/jewelry/web'
//const BASE_URL = 'http://192.168.1.86:8090/jewelry/web'
const BASE_URL = 'http://192.168.1.81:8088'
export const reqUserLogin = ({ userName, userPwd }) => ajax(BASE_URL + '/web/user/userLogin', { userName, userPwd }, 'POST') //用户名登录

export const reqListUser = (data) => ajax(BASE_URL + '/web/user/listUser', data, 'POST') //用户信息列表
export const addUser = (data) => ajax(BASE_URL + '/web/user/addUser', data, 'POST') //增加用户信息
export const updateUser = (data) => ajax(BASE_URL + '/web/user/updateUser', data, 'POST') //修改用户信息
export const deleteUser = (data) => ajax(BASE_URL + '/web/user/delUser', data, 'POST') //删除用户信息

export const reqListGroupUser = (data) => ajax(BASE_URL + '/web/user/listGroupUser', data, 'POST') //用户信息列表
export const addGroupUser = (data) => ajax(BASE_URL + '/web/user/addGroupUser', data, 'POST') //增加用户信息
export const updateGroupUser = (data) => ajax(BASE_URL + '/web/user/updateGroupUser', data, 'POST') //修改用户信息
export const deleteGroupUser = (data) => ajax(BASE_URL + '/web/user/delGroupUser', data, 'POST') //删除用户信息

export const reqListSystemPage = (data) => ajax(BASE_URL + '/systemmonitor/systemInfo/listSystemPage', data, 'POST') //用户信息列表
export const addSystem = (data) => ajax(BASE_URL + '/systemmonitor/systemInfo/addSystem', data, 'POST') //增加用户信息
export const updateSystem = (data) => ajax(BASE_URL + '/systemmonitor/systemInfo/updateSystem', data, 'POST') //修改用户信息
export const deleteSystem = (data) => ajax(BASE_URL + '/systemmonitor/systemInfo/delSystem', data, 'POST') //删除用户信息

export const reqListTemplatePage = (data) => ajax(BASE_URL + '/systemmonitor/mailTemplate/listMailTemplatePage', data, 'POST') //用户信息列表
export const addTemplate = (data) => ajax(BASE_URL + '/systemmonitor/mailTemplate/addMailTemplate', data, 'POST') //增加用户信息
export const updateTemplate = (data) => ajax(BASE_URL + '/systemmonitor/mailTemplate/updateMailTemplate', data, 'POST') //修改用户信息
export const deleteTemplate = (data) => ajax(BASE_URL + '/systemmonitor/mailTemplate/delMailTemplate', data, 'POST') //删除用户信息

export const reqListApiInfo = (data) => ajax(BASE_URL + '/systemmonitor/apiInfo/listApiInfo', data, 'POST') //用户信息列表
export const addApiInfo = (data) => ajax(BASE_URL + '/systemmonitor/apiInfo/addApiInfo', data, 'POST') //增加用户信息
export const updateApiInfo = (data) => ajax(BASE_URL + '/systemmonitor/apiInfo/updateApiInfo', data, 'POST') //修改用户信息
export const deleteApiInfo = (data) => ajax(BASE_URL + '/systemmonitor/apiInfo/delApiInfo', data, 'POST') //删除用户信息
