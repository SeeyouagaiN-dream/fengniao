<template >
  <header class="header">
    <el-row class="main" type="flex" justify="space-between">
      <!-- logo -->
      <div class="logo">
        <nuxt-link to="/">
          <img src="https://i.loli.net/2021/08/17/UNejRCmKLYlJrI3.jpg" alt="" />
        </nuxt-link>
      </div>
      <!-- 菜单栏 -->
      <el-row class="nav" type="flex">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">机票</nuxt-link>
      </el-row>
      <!-- 登录用户信息 -->
      <el-dropdown v-if="username.token">
        <el-row type="flex" align="middle" class="el-dropdown-link">
          <nuxt-link to="#">
            <img
              src="https://i.loli.net/2021/08/17/xUe1LmhS9OGZ3u8.jpg"
              
            />
          {{username.user.nickname}}
          </nuxt-link>
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </el-row>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <nuxt-link to="#">个人中心</nuxt-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <div @click="handleLogout">退出</div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 不存在用户信息展示登录注册链接 -->
      <nuxt-link to="/user/login" class="account-link" v-if="!username.token"> 登录 / 注册 </nuxt-link>
    </el-row>
  </header>
</template>
<script>
import { mapState ,mapMutations} from 'vuex'
export default {
  data () {
    return {
    
    }
  },
  
computed: {
  ...mapState('user',{username:state=>state.userInfo}),

},
    methods:{
      // mapMutations辅助函数 第一种清除本地存储方法
       ...mapMutations({click:'user/clearItems'}),
       ...mapMutations({clear:'post/clearAll'}),
        handleLogout(){
         this.click()
         this.clear()
         this.$router.push('/')
        },
    // 第二种
  //  this.$store.commit('user/clearItems')

    }
};
</script>
<style scoped lang="less">
.header{
    height: 60px;
    line-height: 60px;
    background:#fff;
     border-bottom: 1px #ddd solid;
       box-sizing: border-box;
       box-shadow:0 3px 0 #f5f5f5;
        .main{
            width:1000px;
            margin:0 auto;
        .logo{
            width: 156px;
            padding-top: 8px;
            img{
                display: block;
                width:100%;
            }
        }
        .nav{
           margin: 0 20px; 
           flex: 1;
           a{
               display: block;
               padding: 0 20px;
               height: 60px;
               box-sizing: border-box;
               
               &:hover,&focus,&active{
                    border-bottom:5px #409eff solid;
                    color:#409eff;
                   
                   
               }
           }
            /deep/ .nuxt-link-exact-active{
                background:#409eff;
                color:#fff!important;
            }
        }
        .el-dropdown-link{
       
            &:hover{
                img{
                    border-color: pink;
                }
            }
           a{
               display: block;
           }
           img{
              width:32px;
              height:32px;
              vertical-align: middle;
              border:3px #fff solid;
              border-radius:50px;
           }
        }
        .account-link{
            font-size: 14px;
            color:#666;
            &:hover{
                color: #409eff;
                text-decoration:underline ;
            }
        }
        }
}
</style>