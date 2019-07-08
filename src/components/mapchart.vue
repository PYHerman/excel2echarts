<template>
    <div :id="id" class=chart-container :style="{height:height,width:width}" />
</template>
<script>
   import 'echarts/map/js/china'
    import echarts from 'echarts'
    export default {
        name:"mapchart",
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
                chart: null
            }
        },
        mounted() {
            let myChart = echarts.init(document.getElementById(this.id));

            /**
             * 中国地图
             * 必须引入china.js
             * https://www.cnblogs.com/ldlx-mars/p/9242250.html
             * map配置
             * https://echarts.baidu.com/option.html#series-map.map
             * 高亮颜色
             * https://www.cnblogs.com/xianwen/p/6045454.html
             */
            let option = {
                series: [{
                    type: 'map',
                    // mapType: 'china'// mapType或者map都可以
                    map: 'china',
                }]
            };
            myChart.setOption(option);
        }
    }
</script>

<style scoped>

</style>




