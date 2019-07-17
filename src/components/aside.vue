<template>

  <el-menu  router class="el-menu-demo" mode="horizontal" >
   <el-menu-item index="/piechart" >
    <i class="el-icon-orange"></i>
    百分比饼图
   </el-menu-item>
   <el-menu-item index="/linechart">
    <i class="el-icon-s-marketing"></i>
    折线、柱状图
   </el-menu-item>
   <el-menu-item index="/mapchart" >
    <i class="el-icon-map-location"></i>
    地理分布图
   </el-menu-item>
   <el-menu-item index="/" style="margin-left: auto">
    <i class="el-icon-s-promotion"></i>
    引导
   </el-menu-item>

  </el-menu>

</template>

<script>
 export default {
  methods: {}
 }

</script>
<style scoped>
 .el-menu{

  display: flex;
  justify-content: space-between;
  color: #333;
  line-height: 60px;

 }

</style>
