<template>
    <el-container>
        <el-collapse v-model="activeNames" style="width: 100%;" accordion>
            <el-collapse-item title="百分比饼图 Pie" name="1">
                <div><h2>数据格式</h2></div>
                <div><img src="../assets/pie.png"></div>
                <div><span>第一列为数据名，第二列为数据（表头除外）</span></div>
            </el-collapse-item>
            <el-collapse-item title="线柱图 Line/Bar" name="2">
                <div><h2>数据格式</h2></div>
                <div><img src="../assets/line.png"></div>
                <div>
                    <span>第一列为数据名，第一行为生成表的X轴节点</span><br>
                    <span>数据行数内不要有空缺，否则生成的图表节点会前移自动填补空缺</span><br>
                    <span>数据行数不限定，但数据相差过大可能影响生成的表的美观度</span><br>

                    <img src="../assets/line2.png"><br>
                    <span><b>配置项：</b><br>1.表项“Y”，值为“左”或“右”代表左y轴或右y轴，目前默认左为百分率右为数量</span><br>
                    <span>2.表项“TYPE”，值为“bar”或“line”代表生成柱状图或折线图（默认为折线图）</span>

                </div>
            </el-collapse-item>
            <el-collapse-item title="地图 Map" name="3">
                <div><h2>数据格式</h2></div>
                <div><img src="../assets/map.png"> </div>
                <span>第一列为省份名称，第一行为数据名</span><br>
                <span>生成的图表的颜色调整范围根据最大值和最小值设定</span><br>
            </el-collapse-item>
        </el-collapse>

    </el-container>
</template>

<script>

    export default {
        data() {
            return {
                activeNames: ['1']
            };
        },
        methods: {

        }
    }
</script>

<style scoped>
span{
    line-height: 40px;
    font-size: medium;
}

</style>
