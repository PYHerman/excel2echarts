<template>
<el-aside width="200px">
 <el-menu default-active="this.$route.path"  router class="el-menu-vertical-demo" >
  <el-menu-item index="/piechart" >
   <i class="el-icon-orange"></i>
   <span slot="title">饼图</span>
  </el-menu-item>
  <el-menu-item index="/linechart">
   <i class="el-icon-s-marketing"></i>
   <span slot="title">线图</span>
  </el-menu-item>
  <el-menu-item index="/mapchart" >
   <i class="el-icon-map-location"></i>
   <span slot="title">地图</span>
  </el-menu-item>
 </el-menu>
</el-aside>
</template>

<script>
 export default {
  methods: {}
 }

</script>
<style scoped>
 .el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
 }
 .el-menu {
  background-color: #D3DCE6;
  color: #333;
  active-text-color: #ffd04b;

 }
</style>
