<template>
    <div>
    <div :id="id" class=chart-container :style="{height:height,width:width}" />
    <div class="app-container">
        <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
        <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
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
        var temp = JSON.stringify(data)//提取省份和应用锁数据
       var newd = JSON.parse(temp);
        console.log(newd);
        for(var key in newd){
            //console.log("key名称是："+key+",key的值是："+newd[key]['分支']+newd[key]['应用锁'])


            if ( newd[key]['分支']) {
                res.push({
                    name: newd[key]['分支'],
                    value: newd[key]['应用锁']
                });

            }
            //console.log(newdata);//////////////////////////////////////////////////////待解决
        }

       console.log(res);
        return res;


   };

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
                default: '50%'
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
            beforeUpload(file) {
                const isLt1M = file.size / 1024 / 1024 < 1

                if (isLt1M) {
                    return true
                }

                this.$message({
                    message: 'Please do not upload files larger than 1m in size.',
                    type: 'warning'
                })
                return false
            },
            handleSuccess({ results, header }) {
                this.tableData = results
                this.tableHeader = header
                this.chart.setOption({
                    series: [{
                        data: UpdateEcharts(this.tableData)
                    }]
                })
            },
            //---------------------echarts-----------------------------
            initChart(){
                this.chart = echarts.init(document.getElementById(this.id))

                this.chart.setOption({
                    tooltip:{},
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
                    series: [{
                        name:'数据1',
                        type: 'map',
                        map: 'china',
                        roam: true,
                        label:{
                            normal: {
                                show: false,//显示省份标签
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




