<template>
 <el-header>
  <el-menu :default-active="activeIndex"  router class="el-menu-demo" mode="horizontal" >
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
  </el-menu>
 </el-header>
</template>

<script>
 export default {
  methods: {}
 }

</script>
<style scoped>
 .el-header{

  color: #333;
  text-align: center;
  line-height: 60px;

 }

</style>
