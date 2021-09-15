<template>
  <div class="contanner">
    <!-- 左边部分 -->
    <el-row>
      <el-col :span="17" class="left">
        <el-row class="leftTitle">
          <h2>发表新攻略</h2>
        </el-row>
        <el-row class="leftShare">
          <p>分享你的个人游记，让更多人看到哦！</p>
        </el-row>
        <el-row>
          <el-input
            v-model="form.inputmeau"
            placeholder="请输入标题"
          ></el-input>
        </el-row>
        <div class="editos">
          <client-only>
            <VueEditor
              :config="config"
              ref="vueEditor"
              class="main-fu-c"
              v-model="form.richtext"
            ></VueEditor
          ></client-only>
        </div>
        <div class="citys">
          <span class="cityname">选择城市</span>
          <el-autocomplete
            class="inline-input"
            v-model="form.serchCity"
            :fetch-suggestions="querySearch"
            placeholder="请输入城市"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
        </div>
        <div class="footers">
          <el-button type="primary" @click="release">发布</el-button>
          <p>或者</p>
          <span @click="saveDrafts">保存到草稿</span>
        </div>
      </el-col>
      <el-col :span="7" class="right">
        <el-row type="flex" justify="center">
          <el-col :span="17" class="mainright">
            <h5>草稿箱({{draftBox.length || 0}})</h5>
            <div class="over" v-for="(item,index) in draftBox" :key="index" >
              <p>{{item.inputmeau}}<span class="el-icon-edit"
              
              @click="assignment(item)"></span></p>
              <p>{{item.nowTime}}</p>
            </div>
        
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>

// 引入富文本框
import "quill/dist/quill.snow.css";
let VueEditor;

if (process.browser) {
  VueEditor = require("vue-word-editor").default;
}

export default {
  components: {
    VueEditor
  },
 mounted () {
     setTimeout(() => {
  
      // 把以前存在vuex的草稿拿出来
       this.draftBox=[...this.$store.state.user.savelist]
      // 如果草稿条数大于五条，规定只显示五条
      if (this.draftBox.length > 5) {
        this.draftBox.length = 5;
      }
    }, 1000);
  
  },
  data() {
    return {
      // 草稿箱
      draftBox:[],
      // 提交数据
      form: {
        // 标题
        inputmeau: "",
        //  富文本内容
        richtext: "",
        //  选择城市
        serchCity: "",
        //  时间
        nowTime: ""
      },
      config: {
        modules: {
          // 工具栏
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"],
            ["image", "video"],

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }] // text direction
          ]
        },
        // 主题
        theme: "snow",
        uploadImage: {
          // url: "http://localhost:1337/upload",
          url: "http://157.122.54.189:9095/upload",
          name: "files",
          uploadBefore(file) {
            return true;
          },
          uploadProgress(res) {},
          uploadSuccess(res, insert) {
            insert("http://157.122.54.189:9095" + res.data[0].url);
          },
          uploadError() {},
          showProgress: true
        },

        uploadVideo: {
          url: "http://157.122.54.189:9095/upload",
          // url: "http://localhost:1337/upload",
          name: "files",
          uploadBefore(file) {
            return true;
          },
          uploadProgress(res) {},
          uploadSuccess(res, insert) {
            insert("http://localhost:1337" + res.data[0].url);
          },
          uploadError() {}
        }
      }
    };
  },
 
  methods: {
    // 选择城市
    handleSelect(city) {
      // console.log(city);
      this.form.serchCity = city.value;
    },
    // 获取选择的城市
    async querySearch(queryString, cb) {
      const res = await this.getCityList(queryString);
      // console.log(res);
      cb(res);
    },
    // 获取城市列表
    getCityList(city) {
      return new Promise((revoled, reject) => {
        if (city.length === 0) {
          revoled([]);
          return;
        }
        this.$axios
          .get("/cities", {
            params: {
              name: city
            }
          })
          .then(res => {
            const newArr = res.data.data.map(v => {
              v.value = v.name.replace("市", "");
              return v;
            });

            revoled(newArr);
          });
      });
    },
    // 点击发布
    release(){
        const token= this.$store.state.user.userInfo.token
        this.form.richtext=this.$refs.vueEditor.editor.root.innerHTML
        // 获取当前时间
        const time=new Date()
        // this.form.nowTime=moment(time).format("YYYY-MM-DD");
           if(this.form.richtext === '<p><br></p>') {
        this.$message.warning('请输入内容!')
        return
      }
         const rules = [
             {
               message:'请输入标题',
               rule:this.form.inputmeau
             },
             {
               message:'请输入文本框内容',
               rule:this.form.richtext
             },{
               message:'请输入搜索游玩城市',
               rule:this.form.serchCity
             }
           ]
           let  volid=true
          rules.map(v =>{
            if(v.rule.length == 0){
              volid = false;
              return setTimeout(()=>{
                this.$message.warning(v.message)
              },100)
            }
           })
           if(!volid) return
          let newForm={
             content:this.form.richtext,
              title:this.form.inputmeau,
              city:this.form.serchCity
          }
      this.$axios({
             
             url:'/posts',
             method:'POST',
             data:newForm,
             headers:{
               Authorization: `Bearer ${token || `NO TOKEN`}`
             }
      }).then(res=>{
       if(res.status===200){
         this.$message.success('发布成功')
       }
         this.$router.push({
                  path:'/post/detail'
                })
      })
    
      
              
        
     
    },
    // 点击保存到草稿
   saveDrafts(){
      this.form.richtext=this.$refs.vueEditor.editor.root.innerHTML
        // 获取当前时间
      const time=new Date()
      this.form.nowTime=this.$moment(time).format("YYYY-MM-DD");
       let obj = {...this.form}
      //  console.log(obj)
      this.draftBox.unshift(obj)
      //  将数据保存到vuex
      // console.log( this.draftBox)
      this.$store.commit('user/saveDrafts',this.draftBox)
      if(this.draftBox.length>5){
        this.draftBox.length=5
      }
        // 清空输入框
       this.form= {
        inputmeau: "",
        richtext: "",
        nowTime: ""
       }
      //  清空 富文本框
       this.$refs.vueEditor.editor.root.innerHTML = ''
   },
        assignment(value){
          this.form = { ...value };
         let { richtext } = { ...value };
         this.$refs.vueEditor.editor.root.innerHTML = richtext;
        }
  }
};
</script>
<style scoped>
.contanner {
  width: 1000px;
  margin: 20px auto;

  height: 1000px;
}
.left {
  height: 1000px;
  background-color: #fff;
}
.leftTitle h2 {
  font-weight: 400;
}
.leftShare p {
  color: #ccc;
  font-size: 14px;
}
.leftShare {
  margin: 8px 0;
}
/deep/.el-input__inner:focus {
  border: 2px solid #000;
}
/deep/.ql-editor {
  height: 400px;
}
.editos {
  margin-top: 20px;
}
.citys {
  margin-top: 20px;
}
.cityname {
  font-size: 14px;
  color: #777;
}
.footers {
  display: flex;
  margin-top: 20px;
  align-items: center;
}
.footers p {
  display: inline-block;
  margin: 0 10px;
}
.footers span {
  color: orange;
  cursor: pointer;
}
.mainright {
  border: 1px solid #ccc;
 
}
.mainright h5 {
  font-size: 16px;
  margin: 10px 0 10px 10px;
}
.over {
  font-size: 14px;
  color: #777;

  margin: 10px 0 10px 10px;
}
.over p:first-child {
  cursor: pointer;
}
.over p:first-child:hover {
  color: orange;
}
</style>
