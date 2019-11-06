import ajax from './ajax'
// const BASE_URL = 'http://101.231.106.162:9105/jewelry/web'
//const BASE_URL = 'http://192.168.1.86:8090/jewelry/web'
const BASE_URL = 'http://192.168.1.81:8088/web'
export const reqUserLogin = ({ userName, userPwd }) => ajax(BASE_URL + '/user/userLogin', { userName, userPwd }, 'POST') //用户名登录

export const reqListUser = (data) => ajax(BASE_URL + '/user/listUser', data, 'POST') //用户信息列表
export const addUser = (data) => ajax(BASE_URL + '/user/addUser', data, 'POST') //增加用户信息
export const updateUser = (data) => ajax(BASE_URL + '/user/updateUser', data, 'POST') //修改用户信息
export const deleteUser = (data) => ajax(BASE_URL + '/user/delUser', data, 'POST') //删除用户信息

export const reqListGroup = (data) => ajax(BASE_URL + '/user/listGroup', data, 'POST') //用户信息列表
export const reqListGroupUser = (data) => ajax(BASE_URL + '/user/listGroupUser', data, 'POST') //用户信息列表
export const addGroup = (data) => ajax(BASE_URL + '/user/addGroup', data, 'POST') //增加用户信息
export const addGroupUser = (data) => ajax(BASE_URL + '/user/addGroupUser', data, 'POST') //增加用户信息
export const updateGroup = (data) => ajax(BASE_URL + '/user/updateGroup', data, 'POST') //修改用户信息
export const updateGroupUser = (data) => ajax(BASE_URL + '/user/updateGroupUser', data, 'POST') //修改用户信息
export const deleteGroup = (data) => ajax(BASE_URL + '/user/delGroup', data, 'POST') //删除用户信息
export const deleteGroupUser = (data) => ajax(BASE_URL + '/user/delGroupUser', data, 'POST') //删除用户信息



