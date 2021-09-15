<template>
  <div class="navs">
    <div class="top-val" @mouseleave="leave">
      <el-row type="flex">
        <el-col :span="24">
          <div
            class="hotcity"
            v-for="(item, index) in leftData"
            :key="index"
            @mouseenter="hovers(index)"
          >
            <span class="list">{{ item.type }}</span>
            <i class="el-icon-arrow-right"></i>
          </div>
        </el-col>
      </el-row>
      <div class="rowlist" v-if="isShow">
        <div class="row-right" v-for="(item, index) in rightData" :key="index">
          <nuxt-link :to="`/post?city=${item.city}`">
            <span class="num">{{ index + 1 }}</span>
            <span class="onecity">{{ item.city }}</span>
            <span class="lastcity">{{ item.desc }}</span>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="rightlist">
      <div class="moveCity">
        <span>推荐城市</span>
      </div>
    </div>
    <div class="rightlist">
      <div class="moveImg">
        <img
          class="imgs"
          src="https://i.loli.net/2021/08/18/py3vtOxTln5WdFI.jpg"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 显示与隐藏
      isShow: false,
      // 左边菜单数据
      leftData: [],
      // 右边菜单数据
      rightData: [],
      arr: []
    };
  },
  mounted() {
    this.getmeauLeft();
  },
  methods: {
    hovers(index) {
      this.isShow = true;
      this.rightData = this.arr[index];
    },
    leave() {
      this.isShow = false;
    },
    async getmeauLeft() {
      // 获取左边菜单栏数据
      const { data: res } = await this.$axios.get("/posts/cities");
      console.log(res);
      this.leftData = res.data;

      this.leftData.map(v => {
        this.arr.push(v.children);
      });
    }
  }
};
</script>
<style scoped>
.imgs {
  width: 250px;
  height: 160px;
}
.moveImg {
  /* margin-left: 141px; */
  border: 1px solid #ccc;
  height: 160px;
  width: 250px;
  margin-top: 10px;
}
.moveCity {
  /* margin-left: 141px; */

  height: 40px;
  margin-top: 15px;
  width: 250px;
  border-bottom: 1px solid #ccc;
}
.navs {
  margin: 15px 0;
}
.rightlist {
  display: flex;
  justify-content: flex-end;
}
.top-val {
  display: flex;
  justify-content: flex-end;
}

.hotcity {
  height: 40px;
  width: 250px;

  line-height: 40px;
  border-left: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  font-size: 14px;
}
.hotcity:hover {
  color: orange;
  border-right: none;
}
.hotcity .list {
  margin-left: 15px;
  cursor: pointer;
}
.el-icon-arrow-right {
  position: absolute;
  left: 230px;
  line-height: 40px;
}
.hotcity:first-child {
  border-top: 1px solid #ccc;
}
.rowlist {
  position: absolute;
  z-index: 1000;
  left: 29.1%;
  height: 36px;
  width: 350px;
}
.row-right {
  background-color: #fff;
  line-height: 37px;
  border-right: 1px solid #ccc;
}
.row-right .num {
  font-size: 25px;
  color: orange;
  font-style: italic;
  margin-left: 10px;
  cursor: pointer;
}
.row-right .onecity {
  cursor: pointer;
  color: orange;
  margin-left: 10px;
}
.row-right .onecity:hover {
  text-decoration: underline;
}
.row-right .lastcity:hover {
  text-decoration: underline;
}
.row-right .lastcity {
  margin-left: 10px;
  color: #999999;
  font-size: 14px;
}
.row-right:first-child {
  border-top: 1px solid #ccc;
}
.row-right:last-child {
  border-bottom: 1px solid #ccc;
  border-left: 1px solid #ccc;
}
</style>
