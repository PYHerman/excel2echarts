<template>
    <div class="">
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
    import echarts from 'echarts'
    import UploadExcelComponent from './upload'
    //获取人数
    function updateChart(tabledata) {
        var data = [];
        //转化数据格式，最终生成的newd为map结构
        var temp = JSON.stringify(tabledata)
        var newd = JSON.parse(temp);
        for(var key in newd){
            //忽略总计格
            if ( newd[key]['头衔']!=='总计'){
                data.push({
                    name: newd[key]['头衔'],
                    value: newd[key]['人数'],
                });
            }
        }
        return data;
    }
    //获取名称
    function getName(tabledata) {
         console.log(tabledata);
        var res=[];
        for(let key in tabledata)
        {
            res.push(tabledata[key]['头衔'])
        }

        return res;
    }

    export default {
         name: "piechart",
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
        methods: {
             //检测上传文件更新表格
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
                this.tableData = results;
                this.tableHeader = header;
                //动态更新echarts数据
                this.chart.setOption({

                    title: {
                        text: '用户成长值',
                        left: 'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: " {b} : {c} ({d}%)"
                    },
                    legend: {
                        // orient: 'vertical',
                        // top: 'middle',
                        bottom: 10,
                        left: 'center',
                        data: getName(this.tableData),
                    },
                    series: {
                        data: updateChart(this.tableData),
                        type: 'pie',
                    }
                    })
            },

            //以下为echarts配置
            initChart() {
                this.chart = echarts.init(document.getElementById(this.id))

                //chart自适应变化
                window.onresize = this.chart.resize;

                this.chart.setOption({
                    title: {
                    text: '天气情况统计',
                        left: 'center'
                },
                tooltip : {
                    trigger: 'item',

                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },

                toolbox: {
                            feature: {
                                dataView: {show: true, readOnly: false},
                                restore: {show: true},
                                saveAsImage: {show: true}
                            }
                },

                legend: {
                    // orient: 'vertical',
                    // top: 'middle',
                    bottom: 10,
                        left: 'center',
                        data: ['西凉', '益州','兖州','荆州','幽州']
                },
                series : [
                    {
                        type: 'pie',
                        radius : '65%',
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data:[
                            {value:1548, name: '幽州'},
                            {value:535, name: '荆州'},
                            {value:510, name: '兖州'},
                            {value:634, name: '益州'},
                            {value:735, name: '西凉'}
                        ],
                        label:{
                            normal:{
                                show:true,
                                formatter:" {b}：{c} \n {d}% ",
                            }
                        },
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            })
        }
    }
    }
</script>

<style scoped>

</style>
