<template>
    <el-container>

<!--侧边导航栏-->
        <Aside/>
        <el-main>
<!--路由视图-->
            <el-row>
                <el-col><router-view></router-view></el-col>
            </el-row>
        </el-main>

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


  .el-main {

    color: #333;
      text-align: center;
    line-height: 30px;
  }


 .el-container {
     display: flex;
     justify-content: center;
     flex-wrap: wrap;
      margin-bottom: 40px;
      width:100%;
      height:100%;


  }


</style>
