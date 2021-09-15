//数据存储
export const state =() => ({
    // 登录信息
    userInfo:{
      user:{},
      token:''
    },
    // 草稿箱数据
    savelist:[]
  
  
})
//数据处理函数
export const mutations = {
  // 草稿箱数据
  saveDrafts(state,list){
    console.log(list)
state.savelist=[...list]
  },
  // 登录数据存储
  setUserInfo(state,obj){
    state.userInfo=obj
    localStorage.setItem("stateInfo", JSON.stringify(obj));
    
  },
  // 清除本地存储
 clearItems(state){
  localStorage.removeItem('stateInfo')
   state.userInfo={}
 }

}
//异步执行请求
export const actions = {
 //发送登录请求
async login({commit},dataobj){
 const {data}=await this.$axios.post('/accounts/login',dataobj)
//  console.log(data)
 commit('setUserInfo',data)

}
}
// 计算属性
export const getters= {
  
}