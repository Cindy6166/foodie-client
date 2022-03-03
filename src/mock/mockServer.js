/*
Provide mock data by mockjs
*/
import Mock from 'mockjs'
import data from './data.json'

// 返回goods的接口
Mock.mock('/goods', { code: 0, data: data.goods })

// 返回rating的接口
Mock.mock('/ratings', { code: 0, data: data.ratings })

// 返回info的接口
Mock.mock('/info', { code: 0, data: data.info })

// export default ??? --> 此處不需向外輸出任何數據，只需要保存能執行即可。
