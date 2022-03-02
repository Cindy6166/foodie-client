import ajax from './ajax'

// const BASE_URL = 'http://localhost:4000'
const BASE_URL = '/api'

// get position by longitude and latitude
export const reqPosition = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)

// get catagory
export const reqCategory = () => ajax(BASE_URL + '/index_category')

// get shops by longitude and latitude
export const reqShops = (latitude, longtitude) => ajax(BASE_URL + '/shops', { latitude, longtitude })

// request search result with geohash and keyword
export const reqSearchShop = (geohash, keyword) => ajax(BASE_URL + '/search_shops')

// request login with user's name and password
export const reqPwdLogin = (name, pwd, captcha) => ajax(BASE_URL + '/login_pwd', { name, pwd, captcha }, 'POST')

// request send code with phone number
export const reqSendCode = (phone) => ajax(BASE_URL + '/sendcode', { phone })

// request login with phone number and code
export const reqSmsLogin = (phone, code) => ajax(BASE_URL + '/login_sms', { phone, code }, 'POST')

// get user info
export const reqUserInfo = () => ajax(BASE_URL + '/userinfo')

// user logout
export const reqLogout = () => ajax(BASE_URL + 'logout')
