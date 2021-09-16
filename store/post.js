//数据存储
export const state =() => ({
  // 收藏状态
  isShow:false,

  // 收藏数据的数组
  thisList:[]
  
})
//数据处理函数
export const mutations = {
 setShow(state,info){
   state.isShow=info
 },

 thingsList(state,lists){

   state.thisList= [...lists]
  },
  clearAll(state){
     state.thisList=[]
  }
}
//异步执行请求
export const actions = {


}
// 计算属性
export const getters= {

}