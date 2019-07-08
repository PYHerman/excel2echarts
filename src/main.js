import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui';
import echarts from 'echarts'
import PieChart from './components/piechart'
import LineChart from './components/linechart'
import MapChart from './components/mapchart'

//全局引用
Vue.use(ElementUI);
Vue.use(Element, { size: 'small', zIndex: 3000 });

Vue.config.productionTip = false;

Vue.use(VueRouter);

Vue.component('echarts',echarts);


const routes = [
  // {path:'/'},//首页，待完成
  { path: '/piechart',name:'piechart',component:PieChart},
  { path: '/linechart',name:'linechart',component:LineChart},
  { path: '/mapchart',name:'mapchart',component:MapChart},


]


const router = new VueRouter({
  routes
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
