<template>
  <div>
    <Head @changeIput="handleChange" @chanItem="handleItem"></Head>
    <div class="main" v-for="(item, index) in articleList" :key="index">
      <nuxt-link :to="`/post/detail?id=${item.id}`" v-if="item.images.length > 1">
        <el-row type="flex" justify="center">
          <el-col :span="20" class="mainnuxt">
            <h4>{{ item.title }}</h4>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="20" class="here">
            <p>
              {{ item.summary }}
            </p>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="20">
            <div class="imgss">
              <img
                v-for="(item1, index1) in item.images"
                :key="index1"
                :src="item1"
                :style="{ width: 100 / item.images.length + '%' }"
                alt=""
              />
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" class="footimg">
          <el-col :span="20">
            <div class="footall">
              <div>
                <span class="el-icon-location-outline"></span>
                <span>{{ item.cityName }}</span>
                <span>by</span>
                <img
                  src="https://i.loli.net/2021/08/17/xUe1LmhS9OGZ3u8.jpg"
                  alt=""
                />
                <span>{{ item.account.nickname }}</span>
                <span class="el-icon-view"></span>
                <span>{{ item.watch }}</span>
              </div>
              <div>
                <span>{{ item.like }}</span>
                <span>赞</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </nuxt-link>
      <div class="anther" v-else>
        <nuxt-link :to="`/post/detail?id=${item.id}`">
          <el-row type="flex" justify="center">
            <el-col :span="20" class="three">
              <el-row>
                <el-col :span="7">
                  <img :src="item.images" />
                </el-col>
                <el-col :span="17" class="oner">
                  <el-row>
                    <h4>{{ item.title }}</h4>
                  </el-row>
                  <el-row class="twoe">
                    <p>
                      {{ item.summary }}
                    </p>
                  </el-row>
                  <el-row type="flex" justify="center" class="footimg">
                    <el-col :span="24">
                      <div class="footall">
                        <div>
                          <span class="el-icon-location-outline"></span>
                          <span>{{ item.cityName }}</span>
                          <span>by</span>
                          <img
                            src="https://i.loli.net/2021/08/17/xUe1LmhS9OGZ3u8.jpg"
                            alt=""
                          />
                          <span>{{ item.account.nickname }}</span>
                          <span class="el-icon-view"></span>
                          <span>{{ item.watch }}</span>
                        </div>
                        <div>
                          <span>{{ item.like }}</span>
                          <span>赞</span>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </nuxt-link>
      </div>
    </div>

    <!-- 分页部分 -->
    <el-row type="flex" justify="center">
      <el-col :span="20" class="yejiao">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="usersobj.pagenum"
          :page-sizes="[1, 2, 3, 4]"
          :page-size="usersobj.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Head from "./head";
export default {
  data() {
    return {
      //  文章列表数据
      articleList: [],
      // 文章列表总数

      total: 0,
      usersobj: {
        //  搜索关键字

        // 当前页码
        pagenum: 1,
        // 每页显示条数
        pagesize: 4
      },
      // 接收子组件传过来的城市名
      city: ""
    };
  },
  // 监听路由变化获取参数城市
  watch: {
    $route({ query }) {
      this.city = query.city;
      this.initList(this.city);
    }
  },
 
  mounted() {
    this.getarticleList(0,4,this.$route.query.city);
    

  },
  methods: {
    // 封装接收参数请求数据
    initList(city) {
      const start = (this.usersobj.pagenum - 1) * this.usersobj.pagesize;
      const end = this.usersobj.pagesize;
      this.getarticleList(start, end, city);
    },
    // 接收子组件搜索框传过来的方法
    handleChange(val) {
      this.initList(val);
    },
    // 接收子组件传过来的城市
    handleItem(items) {
      if(items==='全部'){
       
        
         this.getarticleList();
      }
      this.initList(items);
    },
    // 获取文章数据
    getarticleList(_start, _limit, city) {
      this.$axios
        .get("posts", {
          params: {
            _start,
            _limit,
            city
          }
        })
        .then(res => {
          if (res.data.data.length === 0) {
            this.$message.warning(
              "该城市还没开通攻略，请确认输入的城市名无误！"
            );
          }
          this.total = res.data.total;
          this.articleList = res.data.data;
          // console.log(res.data.data);
        });
    },

    //  切换每页显示多少条
    handleSizeChange(size) {
      this.usersobj.pagesize = size;

      const start = (this.usersobj.pagenum - 1) * this.usersobj.pagesize;
      this.getarticleList(start, this.usersobj.pagesize);
    },
    // 改变页码数
    handleCurrentChange(num) {
      this.usersobj.pagenum = num;
      const start = (this.usersobj.pagenum - 1) * this.usersobj.pagesize;
      this.getarticleList(start, this.usersobj.pagesize);
    }
  },

  components: {
    Head
  }
};
</script>
<style scoped>
.twoe {
  padding: 10px 0;
}
.twoe p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
}
.oner {
  padding: 10px;
  color: #777;
}
.oner h4:hover {
  color: orange;
}
.three {
  border-top: 1px solid #ccc;
  padding: 15px 0;
}
.anther img {
  width: 100%;
  height: 165px;
}
.yejiao {
  padding: 10px 0;
  border-top: 1px solid #ccc;
}
.mainnuxt h4:hover {
  color: orange;
}
* {
  margin: 0;
  padding: 0;
}
.here {
  margin-bottom: 15px;
  color: #777;
}
.here p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
}
.footall {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footall span {
  line-height: 35px;
  font-size: 12px;
  color: #777;
}
.footall img {
  vertical-align: middle;
}
.imgss {
  display: flex;
  flex-direction: row !important;
  flex-wrap: wrap;
}
.imgss img {
  /* width: 25%; */
  height: 165px;
}
.footimg img {
  width: 21px;
  height: 21px;
  border-radius: 50px;
  border: 3px #ccc solid;
}
.mainnuxt {
  border-top: 1px #ccc solid;
  padding: 20px 0;
}
</style>
