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
    import echarts from 'echarts'
    import UploadExcelComponent from './upload'

    //修改表头
    function SetHeader(data) {
        var res = [];
        for(var key in data)
        {
            //待定方法，筛去多余表头元素
            if(data[key]==='名称')
                continue;
            res.push(data[key])
        }
        // console.log(res);
        return res;
    }

    //修改图表内容
    function SetTable(data) {
        var series = [];
        //转化数据格式，最终生成的newd为map结构

         var temp = JSON.stringify(data)
         var newd = JSON.parse(temp);
        //console.log(newd);
        for(var key in newd){
            let name=newd[key]['名称'];

            let array=Object.values(newd[key]);
            array.splice(0,1);
            series.push({
                name:name,
                data:array,
                type:'line',
            })
            console.log(array)
        }
        //console.log(res);
        return series;
    }

    export default {
        name:"linechart",
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

                //动态更新echarts数据
                //console.log(this.tableHeader);
                //console.log(this.tableData);

                this.chart.setOption({
                    //按日期设置x轴
                    xAxis:{
                        data:SetHeader(this.tableHeader)

                    },
                    series:SetTable(this.tableData)


                })
            },
            // ----------------echarts---------------
            initChart() {
                this.chart = echarts.init(document.getElementById(this.id))

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
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data: ['蒸发量', '降水量', '平均温度']
                    },
                    xAxis: [
                        {

                            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                            axisPointer: {
                                type: 'shadow'
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '水量',
                            min: 0,
                            max: 250,
                            interval: 50,
                            axisLabel: {
                                formatter: '{value} ml'
                            }
                        },
                        {
                            type: 'value',
                            name: '温度',
                            min: 0,
                            max: 25,
                            interval: 5,
                            axisLabel: {
                                formatter: '{value} °C'
                            }
                        }
                    ],
                    series: [
                        {
                            name: '蒸发量',
                            type: 'bar',
                            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                        },
                        {
                            name: '降水量',
                            type: 'bar',
                            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                        },
                        {
                            name: '平均温度',
                            type: 'line',
                            yAxisIndex: 1,
                            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                        }

                    ]
                })
            }
        }
    }
</script>



<style scoped>
    .chart-container{
        position: relative;
        width: 100%;
        height: calc(100vh - 84px);
    }
</style>
