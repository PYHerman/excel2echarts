<template>
    <div>
    <div :id="id" class=chart-container :style="{height:height,width:width}" />
    <div class="app-container">
        <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
        <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px; background-color: #e9eef3">
            <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
        </el-table>
    </div>
    </div>

</template>
<script>
   import 'echarts/map/js/china'
    import echarts from 'echarts'
   import UploadExcelComponent from './upload'

   function UpdateEcharts(data) {
       var res = [];
       //转化数据格式，最终生成的newd为map结构
        var temp = JSON.stringify(data)
       var newd = JSON.parse(temp);
        console.log(newd);
        for(var key in newd){
            //作为测试只提取了省份名和应用锁两个数据，后期可以通过加series来增加显示数据
            if ( newd[key]['分支']){
                res.push({
                    name: newd[key]['分支'],
                    value: newd[key]['应用锁']
                });
            }
        }
        return res;
   }

    export default {
        name:"mapchart",
        components:{
            UploadExcelComponent,
        },
        props: {
            className: {
                type: String,
                default: 'chart'
            },
            id: {
                type: String,
                default: 'chart'
            },
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '500px'
            }
        },
        data() {
            return {
                chart: null,
                tableData: [],
                tableHeader: []
            }
        },
        //声明chart
        mounted() {
            this.initChart()
        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            this.chart.dispose()
            this.chart = null
        },
        methods:{
            //校验文件
            beforeUpload(file) {
                // const isLt1M = file.size / 1024 / 1024 < 1
                //
                // if (isLt1M) {
                //     return true
                // }
                //
                // this.$message({
                //     message: 'Please do not upload files larger than 1m in size.',
                //     type: 'warning'
                // })
                // return false
                return true
            },
            //上传文件成功
            handleSuccess({ results, header }) {
                this.tableData = results
                this.tableHeader = header

                //动态更新echarts数据
                var newdata=UpdateEcharts(this.tableData);
                newdata.sort(function (a, b) {
                    return b.value - a.value;
                });
                this.chart.setOption({
                    visualMap:{
                        min:newdata[newdata.length-1].value,
                        max:newdata[0].value,
                    },

                    series: [{
                        name:'应用锁',
                        data: newdata,
                    }],

                })
            },
            //---------------------echarts-----------------------------
            initChart(){
                this.chart = echarts.init(document.getElementById(this.id))

                //chart自适应变化
                window.onresize = this.chart.resize;

                this.chart.setOption({
                    tooltip:{},
                    title: {
                        text: '用户地区分布图',
                        left: 'center'
                    },
                    //侧边滑块配置
                    visualMap:{
                        min:0,
                        max:10000,
                        left:'left',
                        text:['高','低'],

                        inRange:{
                            color:['#fff585', 'rgb(199,54,67)']
                        },
                        realtime:false,
                        calculable:true,

                    },

                    toolbox: {
                        feature: {
                            dataView: {show: true, readOnly: false},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    series: [{
                        name:'数据1',
                        type: 'map',
                        map: 'china',
                        roam: true,
                        label:{
                            normal: {
                                show: true,//显示省份标签
                                formatter:'{b}',
                                position:'right',
                                textStyle:{color:"rgba(20,2,4,0.93)"}//省份标签字体颜色
                            },
                            emphasis: {//对应的鼠标悬浮效果
                                show: true,
                                textStyle:{color:"#800080"}
                            }
                        },

                        data:[],

                    }],

                })
            },
        }
    }
</script>

<style scoped>

</style>




