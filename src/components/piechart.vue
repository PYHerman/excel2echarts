<template>
    <div class="">
        <div :id="id" class=chart-container :style="{height:height,width:width}" />
        <div class="app-container">
            <upload-excel-component :on-success="handleSuccess"  />
            <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
                <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
            </el-table>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    import UploadExcelComponent from './upload'
    //获取数据
    function updateChart(data) {
        var res = [];
        for(var key in data){
            //忽略总计格

                res.push({
                    name: data[key]['名称'],
                    value: data[key]['数据'],
                });
            }

        return res;
    }
    //获取名称
    function getName(tabledata) {

        var res=[];
        for(let key in tabledata)
        {
            res.push(tabledata[key]['名称'])
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

        methods: {
             //检测上传文件更新表格

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
                var that = this;
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
                                saveAsImage: {show: true},
                                myTool1: {
                                    show: true,
                                    title: '标签显示',
                                    icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
                                    onclick: function(a, obj) {
                                        var op = obj.getOption();

                                        var tmpSerise = [];
                                        for (var i = 0; i < op.series.length; i++) {
                                            op.series[i].label.show = !op.series[i].label.show;
                                            op.series[i].labelLine.show = !op.series[i].labelLine.show;
                                            tmpSerise.push(op.series[i]);
                                        }
                                        that.chart.setOption({
                                            series:tmpSerise
                                        });
                                    }

                                },
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
