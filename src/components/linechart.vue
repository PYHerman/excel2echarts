<template>
    <div>
        <div :id="id" class=chart-container :style="{height:height,width:width}"/>
        <div class="app-container">
            <upload-excel-component :on-success="handleSuccess"/>
            <el-table :data="tableData" border highlight-current-row
                      style="width: 100%;margin-top:20px;">
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
        //转化数据格式，最终生成的newd为map结构

        for (var key in data) {
            //待定方法，筛去多余表头元素
            if (key === '0'||data[key] === 'Y'||data[key] === 'y'||data[key] === 'TYPE'||data[key] === 'type')
                continue;
            res.push(data[key])
        }
        return res;
    }


    //修改表内数据
    function SetTable(data) {
        var series = [];
        for (var key in data) {
            //数据名称
            var name = data[key]['名称'];
            //类型
            var TYPE = 'line';
            //Y轴
            var Y = '0';
            //数据值数组
            var array = Object.values(data[key]);
            //筛出配置项
            for(let i=0; i<array.length; i++)
            {
                if(array[i]==='左'||array[i]==='右')
                    Y=array[i]==='左'?0:1
                else if(array[i]==='line'||array[i]==='bar')
                    TYPE=array[i]==='line'?'line':'bar'
                else
                    continue;
                array.splice(i,1);
                i--;
            }
            array.splice(0, 1);
            if (name.indexOf('率')!==-1) {
                for (let i = 0; i < array.length; i++) {
                    //百分数乘100并取两位
                    array[i] *= 100;
                    array[i] = array[i].toFixed(2);
                }
                Y=1;
            }
            series.push({
                name: name,
                data: array,
                type: TYPE,

                yAxisIndex: Y,
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

    function SetLegend(data){
        var legend = {
            data:[]
        };
        for (var key in data) {
            var name = data[key]['名称'];
            legend.data.push(name)
        }
        return legend;
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
        methods: {
            handleSuccess({results, header, }) {
                this.tableData = results;
                this.tableHeader = header;

                //动态更新echarts数据
                this.chart.setOption({

                    //按日期设置x轴
                    xAxis: {
                        data: SetHeader(this.tableHeader),
                        categories: 'category',
                        axisTick:{
                            interval:0
                        },
                    },
                    //设置数据
                    series: SetTable(this.tableData),
                    //设置legend
                    legend:SetLegend(this.tableData),

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
                            myTool1: {
                                show: true,
                                title: '标签显示',
                                icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
                                onclick: function(a, obj) {
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
                            name: '数量',
                            axisLabel: {
                                formatter: '{value}'
                            }
                        },
                        {
                            type: 'value',
                            name: '百分率',
                            axisLabel: {
                                formatter: '{value} %'
                            }
                        },

                    ],
                    series: [
                        {
                            name: '崩溃率',
                            data: ["0.67", "1.34", "1.12", "2.54", "1.45", "0.75"],
                            type: 'line',
                            yAxisIndex: 1,
                            label:{
                                show:true
                            }

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
        height: calc(100vh - 84px);
    }
</style>
