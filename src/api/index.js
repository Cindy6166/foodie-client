import ajax from './ajax'

// const BASE_URL = 'http://localhost:4000'
const BASE_URL = '/api'

// get position by longitude and latitude
export const reqPosition = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)

// get catagory
export const reqCategory = () => ajax(BASE_URL + '/index_category')

export const reqShops = (latitude, longtitude) => ajax(BASE_URL + '/shops', { latitude, longtitude })
