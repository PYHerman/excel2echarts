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
                var that = this;
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
                            saveAsImage: {show: true},
                            myTool1: {
                                show: true,
                                title: '标签显示',
                                icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
                                onclick: function(a, obj, c, d) {
                                    var op = obj.getOption();

                                    var tmpSerise = [];
                                    for (var i = 0; i < op.series.length; i++) {
                                        op.series[i].label.show = !op.series[i].label.show;
                                        tmpSerise.push(op.series[i]);
                                    }
                                    that.chart.setOption({
                                        series:tmpSerise
                                    });
                                }

                            },
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




