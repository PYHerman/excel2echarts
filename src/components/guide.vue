<template>
    <el-container>
        <el-collapse v-model="activeNames" style="width: 100%;" accordion>
            <el-collapse-item title="百分比饼图 Pie" name="1">
                <div><h2>数据格式</h2></div>
                <div><img src="../assets/pie.png"></div>
                <div><span>表头固定，为“名称”和“数据”，第一列为数据名，第二列为数据</span></div>
                <div><span>名称不能为空，否则这一项无法生成</span></div>
                <a href="./static/xlsx/piecharts成长值.xlsx" download="pie.xlsx">Download file</a>
            </el-collapse-item>
            <el-collapse-item title="线柱图 Line/Bar" name="2">
                <div><h2>数据格式</h2></div>
                <div><img src="../assets/line2.png"></div>
                <div>
                    <span>第一列为数据名，第一行为生成表的X轴节点，内容均不限</span><br>
                    <span>数据行数内不要有空缺，否则生成的图表节点会前移自动填补空缺</span><br>
                    <span>数据行数不限定，但数据相差过大可能影响生成的表的美观度</span><br>

                    <img src="../assets/line.png"><br>
                    <span><b>可增加配置项：</b><br>1.表头“Y”，值为“左”或“右”代表左y轴（数量）或右y轴（百分率）</span><br>
                    <span>2.表头“TYPE”，值为“bar”或“line”代表生成柱状图或折线图（默认为折线图）</span>
                    <a href="./static/xlsx/linecharts日活月活崩溃率.xlsx" download="line.xlsx">Download file</a>
                    <br>
                    <div><img src="../assets/guide.png"></div>
                    <span>此外所有图表右上角还有工具栏可对图表进行一些操作如显示局部区域，修改数据，下载原图或者显示/隐藏标签</span>
                </div>
            </el-collapse-item>
            <el-collapse-item title="地图 Map" name="3">
                <div><h2>数据格式</h2></div>
                <div><img src="../assets/map.png"> </div>
                <span>表头固定，为“名称”和“数据”，第一列为省份名称，第二列为数据</span><br>
                <span>生成的图表的颜色调整范围根据最大值和最小值设定</span><br>
                <a href="./static/xlsx/mapchart用户活跃度分布.xlsx" download="map.xlsx">Download file</a>
            </el-collapse-item>
        </el-collapse>

    </el-container>
</template>

<script>

    export default {
        data() {
            return {
                activeNames: ['2']
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
a{
    color: #333333;
    display:block;
}

</style>
