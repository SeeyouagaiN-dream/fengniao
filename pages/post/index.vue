<template>
  <div class="post">
    <el-row class="post-content" type="flex" justify="space-between">
      <el-col :span="7" class="post-left">
        <!-- 左边菜单栏 -->
        <Aside></Aside>
      </el-col>
      <el-col :span="17" class="post-right">
        <Main></Main>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Aside from "@/components/post/aside";
import Main from "@/components/post/main";
export default {
  components: {
    Aside,
    Main
  }
};
</script>

<style>
.post_content {
  width: 1000px;
  margin: 0 auto;
}
</style>
