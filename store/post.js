//数据存储
export const state =() => ({
  // 点赞状态
  isShow:false,
  thisList:{}
  
})
//数据处理函数
export const mutations = {
 setShow(state,info){
   state.isShow=info
 },
 
 thingsList(state,list){
   state.thisList={...list}
 }

}
//异步执行请求
export const actions = {


}
// 计算属性
export const getters= {

}