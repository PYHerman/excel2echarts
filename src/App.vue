<template>
    <el-container>
      <el-header>excel to echarts</el-header>
      <el-container>
<!--侧边导航栏-->
        <Aside/>
        <el-main>
<!--路由视图-->
            <el-row>
                <el-col :span="24"><router-view></router-view></el-col>
            </el-row>
        </el-main>
      </el-container>
    </el-container>

</template>

<script>

import Aside from "./components/aside"

export default {
  name: 'app',
  props: {

  },
  components:{

        Aside,



  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

 .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;

  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
      text-align: center;
    line-height: 30px;
  }


  body > .el-container {
    margin-bottom: 40px;
  }


</style>
