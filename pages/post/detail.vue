<template>
  <div class="main">
    <el-row :gutter="10">
      <el-col :span="17">
        <!-- 面包屑 -->
        <div class="title">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }"
              >旅游攻略</el-breadcrumb-item
            >
            <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!-- 标题 -->
        <h2>{{ theArticleList.title }}</h2>
        <!-- 内容 -->
        <div class="post-info">
          <span
            >攻略：{{
              $moment(theArticleList.created_at).format("YYYY-MM-DD HH:mm:ss")
            }}</span
          >
          <span>阅读：{{ theArticleList.watch }}</span>
        </div>
        <div class="imges" v-html="theArticleList.content"></div>
        <div class="post-ctrl">
          <el-row type="flex" justify="center">
            <div class="ctrl-item">
              <i class="iconfont iconpinglun"></i>
              <p>评论({{ totalList }})</p>
            </div>
            <div class="ctrl-item" @click="handleCollection(theArticleList.id)">
              <i :class="isShow?iconobj[125]:iconobj[103]" ></i>
              <p>收藏</p>
            </div>
            <div class="ctrl-item">
              <i class="iconfont iconfenxiang"></i>
              <p>分享</p>
            </div>
            <div class="ctrl-item">
              <i class="iconfont iconding" ></i>
              <p>点赞</p>
            </div>
          </el-row>
        </div>
        <div class="commentsLive">
          <div class="commentsLeft">
            <img
              src="https://s3.bmp.ovh/imgs/2021/09/69a1e403fd1a9a54.webp"
              alt=""
            />
          </div>
          <div class="commentsRight">
            <el-input
              class="inputtexe"
              type="textarea"
              placeholder="发一条友善的评论"
            />
          </div>
          <el-button class="last" type="primary" size="small">发表</el-button>
        </div>
        <div class="updata">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog>
            <img width="100%" alt="" />
          </el-dialog>
        </div>
        <!-- 第一层评论数据 -->
        <div class="mainleft" v-for="(item,index) in saveData" :key="index">
          <el-row>
            <el-col :span="3" class="imglis">
              <img
                src="https://s3.bmp.ovh/imgs/2021/09/69a1e403fd1a9a54.webp"
                alt=""
              />
            </el-col>
            <el-col :span="21">
              <div class="mainlist">
                <span>{{item.account.nickname}}</span>
                <p>&nbsp;&nbsp;{{item.content}}</p>
              </div>
              <el-row class="timeover" :gutter="15">
                <el-col :span="6">{{$moment(item.created_at).format("YYYY-MM-DD HH:mm:ss")}}</el-col>
                <el-col :span="6" class="nikename">回复</el-col>
              </el-row>
            </el-col>
          </el-row>
          <Block
        v-if="item.parent"
        :data="item.parent"
        @handClick="changeItem"
        ></Block>
        </div>
        
      </el-col>

      <el-col :span="7">
        <h3>相关攻略</h3>

        <div
          class="nextlist"
          v-for="(item, index) in theThemelist"
          :key="index"
          @click="RecommendedFor(item.id)"
        >
          <div class="leftImg">
            <img :src="item.images[0]" alt="" />
          </div>

          <div class="rightlist">
            <nuxt-link :to="`/post/detail?id=${item.id}`" class="rightlist">
              <div class="theTheme">{{ item.title }}</div>
              <div>
                <span>{{ $moment(item.updated_at).format("YYYY-MM-DD") }}</span>
                <span>阅读</span>
                <span>{{ item.watch }}</span>
              </div>
            </nuxt-link>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Block from "../../components/post/block.vue";
export default {
  components: {
    Block
  },

  data() {
    return {
      isShow:false,
       iconobj: {
          
        '125': 'iconfont iconstar',
        '103': 'iconfont iconstar1',
      
      },
      //  文章详情数据
      theArticleList: {},
      // 推荐文章列表
      theThemelist: [],
      // 评论条数
      limit: 39,
      //  开始数据
      start: 0,
      //  总共多少条评论条数
      totalList: 0,
      // 评论数
      // 评论数据
    saveData:[],
    
    };
    
  },
  mounted() {
    this.getArticleList();
    this.getTheThemeList();
    this.getArticleReviews();
    
    // this.isShow=this.$store.state.post.isShow
   
  },
  // watch: {
  //   $route(){
  //      this.$store.state.post.isShow
  //   }
  // },
  methods: {
    //获取文章详情数据
    getArticleList() {
      this.$axios
        .get("/posts", { params: { id: this.$route.query.id } })
        .then(res => {
          console.log(res.data.data)
          this.theArticleList = res.data.data[0];
           /*第一种点赞方法 用localStorage 
          let collect =JSON.parse(localStorage.getItem('list')) || [] 
          // console.log(collect)
          let isCollect=collect.some(v=>v.id===this.theArticleList.id)
          this.isShow=isCollect
          */
       
         let collect=[...this.$store.state.post.thisList ]|| [] 
         let isCollect=collect.some(v=>v.id===this.theArticleList.id)
          this.isShow=isCollect
        });
    },
    // 获取推荐文章列表
    async getTheThemeList() {
      const { data: res } = await this.$axios.get("/posts/recommend", {
        params: { id: this.$route.query.id }
      });

      this.theThemelist = res.data;
      // console.log(res.data);
    },
    // 点击左边相关推荐
    RecommendedFor() {
      this.getArticleList();
    },
    // 获取文章评论
    async getArticleReviews() {
      const { data: res } = await this.$axios.get("/posts/comments", {
        params: {
          post: this.$route.query.id,
          _limit: this.limit,
          _start: this.start
        }
      });
      this.totalList = res.total;
      this.saveData=res.data
      console.log(res.data);
    },
    // 收藏
handleCollection(id){
  
// 第2中  使用vuex
  let collect = [...this.$store.state.post.thisList]||[] 
  
  
       let index =collect.findIndex(v => v.id === id);
       if(index===-1){
       
        collect.push(this.theArticleList)
       
         this.isShow=true
       }else{
         collect.splice(index, 1);
          this.isShow=false
       }
         console.log(collect)
       this.$store.commit('post/thingsList',collect)
         



  /*第一种点赞方法 用localStorage 
    let collect =JSON.parse(localStorage.getItem('list')) || [] 
  
       let index =collect.findIndex(v => v.id === id);
       if(index===-1){
       
        collect.push(this.theArticleList)
       
         this.isShow=true
       }else{
         collect.splice(index, 1);
          this.isShow=false
       }
         console.log(collect)
       
         localStorage.setItem('list',JSON.stringify(collect))
   */

      //  this.$store.commit('post/thingsList',collect)
//  this.$axios({
//         url: "/posts/star",
//         params: { id },
//         headers: {
//           Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
//         }
//       }).then(res=>{
                
//           if (res.status === 200) {
//                this.$message({
//             type: "success",
//             message: "收藏成功"
//           });
//         }
//  })
}
  }
};
</script>
<style scoped>
.timeover {
  color: #777;
  font-size: 14px;
  margin-left: 1.5px;
}
.imglis {
  height: 97px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.mainlist p {
  padding: 10px 0 10px 0;
  color: #000;
  
}
.mainlist span {
  margin-left: 9px;
}
.mainlist {
  margin-top: 20px;

  font-size: 14px;
  color: #777;
}

.nikename {
  cursor: pointer;
}
.imglis img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.leftImg img {
  width: 100%;
  height: 100%;
}
.post-info {
  margin: 20px 0;
  text-align: right;
}
.main {
  width: 1000px;
  margin: 20px auto;
}
.imges /deep/img {
  width: 100%;
}
h2 {
  margin: 40px 0;
}
.imges {
  border-top: 1px solid #ccc;
  padding-top: 40px;
}
.post-ctrl {
  padding: 50px 0;
}
.ctrl-item {
  margin: 0 20px;
  width: 60px;
  height: 55px;
  text-align: center;
  cursor: pointer;
}
.ctrl-item i {
  font-size: 28px;
  color: orange;
}
.ctrl-item p {
  font-size: 14px;
  color: #999;
  margin-top: 5px;
}
.nextlist {
  cursor: pointer;
  margin-top: 15px;
  display: flex;
  padding-top: 20px;
  border-top: 1px solid #ccc;
}
.leftImg {
  height: 100px;
  width: 80px;
}
.theTheme {
  font-size: 12px;
}
.nextlist .leftImg {
  flex: 2;
  background-color: #ccc;
}
.nextlist .rightlist {
  height: 100px;
  margin-left: 10px;
  flex: 3;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.commentsLive {
  display: flex;
  height: 70px;
}
.commentsLive .commentsLeft {
  flex: 1;
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.commentsLive .commentsLeft img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}
.commentsLive .commentsRight {
  flex: 5;
}
.commentsLive .commentsRight .inputtexe {
  height: 70%;
  width: 100%;
}
.commentsLive .last {
  height: 54px;
  width: 60px;
  margin-left: 5px;
}
.updata {
  height: 120px;
  width: 120px;
  margin-left: 104px;
}
/deep/.el-upload--picture-card {
  width: 100px;
  height: 100px;
  line-height: 100px;
}
</style>
