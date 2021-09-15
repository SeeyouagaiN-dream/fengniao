<template>
  <div class="headIput">
    <!-- 搜索框内容 -->
    <div class="inputMain">
      <el-row type="flex" justify="center">
        <el-col :span="20">
          <el-input
            placeholder="请输入你想去的地方，比如  '巴黎'"
            suffix-icon="el-icon-search"
            v-model="textList"
            @change="serchIput"
          >
          </el-input>
        </el-col>
      </el-row>
    </div>
    <!-- 推荐内容 -->
    <div class="recommended">
      <el-row  type="flex" justify="center">
        <el-col :span="20" >
         <span>推荐:</span>
         <a href="#" v-for="(item,index) in citys" :key="index" @click="handItem(item)">{{item}}</a>
        </el-col>
      </el-row>
    </div>
    <!-- 推荐 -->
    <div class="strategy">
     <el-row type="flex" justify="center">
        <el-col :span="20" >
           <div class="pri">
              <div class="pria">推荐攻略</div>
            <el-button type="primary" icon="el-icon-edit" @click="$router.push('/post/create')">写游记</el-button>
           </div>
         </el-col>
     </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      textList: "",
      citys:["广州", "上海", "北京",'全部']
    };
  },
  mounted () {
    
  },
  methods: {
    serchIput(){
      this.$emit('changeIput',this.textList)
    },
    handItem(val){
      this.$emit('chanItem',val)
    }
       
    
  }
};
</script>
<style scoped>

 .pri{
  display: flex;
  align-items:center;
  justify-content: space-between;

}
.pri .pria{
border-bottom: 2px solid orange;
color:orange ;
height: 40px;
line-height: 40px;
}
.headIput {
  margin: 15px 0;
}
/deep/.el-input__inner {
  border-color: orange ;
}
>>>.el-icon-search{
  color: orange ;
  cursor:pointer;
}
.recommended{
  margin: 10px 0;
}
.recommended span {
font-size: 13px;
color: #757575;
}
.recommended a{
  font-size: 13px;
  color: #757575;
  margin: 0 5px;
}
.recommended a:hover{
  color:orange ;
  text-decoration:underline;
  cursor:pointer;
}
  

</style>
