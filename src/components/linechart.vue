<template>
    <div>
        <div :id="id" class=chart-container :style="{height:height,width:width}"/>
        <div class="app-container">
            <upload-excel-component :on-success="handleSuccess"/>
            <el-table :data="tableData" border highlight-current-row
                      style="width: 100%;margin-top:20px; background-color: #e9eef3">
                <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item"/>
            </el-table>

        </div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    import UploadExcelComponent from './upload'


    //修改表头
    function SetHeader(data) {
        var res = [];
        for (var key in data) {
            //待定方法，筛去多余表头元素
            if (data[key] === '名称')
                continue;
            res.push(data[key])
        }


        return res;
    }


    //修改图表内容
    function SetTable(data) {
        var series = [];
        //转化数据格式，最终生成的newd为map结构

        var temp = JSON.stringify(data)
        var newd = JSON.parse(temp);
        //console.log(newd);
        for (var key in newd) {
            //数据名称
            let name = newd[key]['名称'];
            //数据值数组
            let array = Object.values(newd[key]);
            array.splice(0, 1);
            if (name === '崩溃率') {
                for (let i = 0; i < array.length; i++) {
                    //百分数乘100并取两位
                    array[i] *= 100;
                    array[i] = array[i].toFixed(2);

                }
            }
            series.push({
                name: name,
                data: array,
                type: 'line',
                //如果是崩溃率就选择左边的y轴
                yAxisIndex: name === '崩溃率' ? 0 : 1,
                label: {
                    normal: {
                        show: true,
                        formatter: "{c}",
                    }
                },
            })
        }

        return series;
    }

    export default {
        name: "linechart",
        components: {
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
            this.initChart();

        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            this.chart.dispose();
            this.chart = null
        },
        methods: {
            handleSuccess({results, header}) {
                this.tableData = results;
                this.tableHeader = header;

                //动态更新echarts数据
                this.chart.setOption({

                    //按日期设置x轴
                    xAxis: {
                        data: SetHeader(this.tableHeader),
                        categories: 'category',
                    },
                    series: SetTable(this.tableData)


                })
            },


            // ----------------echarts---------------
            initChart() {
                this.chart = echarts.init(document.getElementById(this.id));
                //chart自适应变化
                var that = this;
                window.onresize = this.chart.resize;


                this.chart.setOption({


                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        }
                    },
                    toolbox: {
                        feature: {
                            dataZoom: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true},
                            //-------------------------------------------------------------------------------------------------
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
                    legend: {
                        data: ['日活', '月活', '崩溃率', '用户档案数']
                    },
                    xAxis: {

                        data: ['2019/01', '2019/02', '2019/03', '2019/04', '2019/05', '2019/06']
                    },
                    yAxis: [
                        {
                            type: 'value',
                            name: '崩溃率',
                            min: 0.00,
                            max: 3.00,
                            interval: 0.25,
                            axisLabel: {
                                formatter: '{value} %'
                            }
                        },
                        {
                            type: 'value',
                            name: '活跃用户数',
                            min: 0,
                            max: 600000,
                            interval: 50000,
                            axisLabel: {
                                formatter: '{value}'
                            }
                        },
                    ],
                    series: [
                        {
                            name: '崩溃率',
                            data: ["0.67", "1.34", "1.12", "2.54", "1.45", "0.75"],
                            type: 'line',
                            yAxisIndex: 0,

                        }
                    ]
                })
            }
        }
    }
</script>


<style scoped>
    .chart-container {
        position: relative;
        width: 100%;
        height: calc(100vh - 84px);
    }
</style>
