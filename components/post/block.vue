<template>
  <div class="comment">
    <el-row class="mainlist">
      <el-col :span="4"> &nbsp;</el-col>
      <el-col :span="20">
        <div class="main">
          <img src="https://s3.bmp.ovh/imgs/2021/09/69a1e403fd1a9a54.webp" alt="" />
          <span>{{data.account.nickname}}</span>
          <p>:&nbsp;&nbsp;{{data.content}}</p>
        </div>
        <el-row class="timeover" :gutter="15">
        <el-col :span="6">{{$moment(data.created_at).format("YYYY-MM-DD HH:mm:ss")}}</el-col>
        <el-col :span="6" class="nikename">回复</el-col>
        </el-row> 
      </el-col>
    </el-row>
    <!-- <div >
     <el-row class="mainlist" v-if="data.parent">
      <el-col :span="4">&nbsp; </el-col>
      <el-col :span="20" >
        <div class="main">
          <img src="https://s3.bmp.ovh/imgs/2021/09/69a1e403fd1a9a54.webp" alt="" />
          <span>{{data.account.nickname}}</span>
           <em>回复&nbsp;&nbsp;逍遥子</em>
          <p>&nbsp;&nbsp;{{data.content}}</p>
        </div>
        <el-row class="timeover" :gutter="15">
        <el-col :span="6">{{$moment(data.created_at).format("YYYY-MM-DD HH:mm:ss")}}</el-col>
        <el-col :span="6" class="nikename">回复</el-col>
        </el-row> 
      </el-col>
    </el-row>
    </div> -->
    <div>
    <Item :data="data.parent" v-if="data.parent"> </Item>

    </div>
  </div>
</template>
<script>
export default {
  name:"Item",
  props: ["data"]
};
</script>
<style scoped>

.main {
  display: flex;
  font-size: 14px;
  color: #777;
flex-wrap: wrap;
}
.main p{
  word-break: break-all;
color: black;
}
.main img{
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
.main span{
margin: 0 10px 0 10px;
}
.timeover{
  margin:10px 0 0 20px ;
  color: #777;
  font-size: 14px;
}
.mainlist{
  margin-top: 15px;
  
}
.nikename{
 cursor: pointer;
}
</style>
