<template>
    <div class="">
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
    import echarts from 'echarts'
    import UploadExcelComponent from './upload'
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
                default: '300px'
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
                this.tableData = results
                this.tableHeader = header
            },
            //以下为echarts配置
            initChart() {
                this.chart = echarts.init(document.getElementById(this.id))

                this.chart.setOption(
                {
                    backgroundColor: '#2c343c',

                        title: {
                    text: 'Customized Pie',
                        left: 'center',
                        top: 20,
                        textStyle: {
                        color: '#ccc'
                    }
                },

                    tooltip : {
                        trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },

                    visualMap: {
                        show: false,
                            min: 80,
                            max: 600,
                            inRange: {
                            colorLightness: [0, 1]
                        }
                    },
                    series : [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius : '55%',
                            center: ['50%', '50%'],
                            data:[
                                {value:335, name:'直接访问'},
                                {value:310, name:'邮件营销'},
                                {value:274, name:'联盟广告'},
                                {value:235, name:'视频广告'},
                                {value:400, name:'搜索引擎'}
                            ].sort(function (a, b) { return a.value - b.value; }),
                            roseType: 'radius',
                            label: {
                                normal: {
                                    textStyle: {
                                        color: 'rgba(255, 255, 255, 0.3)'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.3)'
                                    },
                                    smooth: 0.2,
                                    length: 10,
                                    length2: 20
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#c23531',
                                    shadowBlur: 200,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },

                            animationType: 'scale',
                            animationEasing: 'elasticOut',
                            animationDelay: function () {
                                return Math.random() * 200;
                            }
                        }
                    ],
            })
        }
    }
    }
</script>

<style scoped>

</style>
