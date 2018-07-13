// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
require('./common/scss/icon.scss') /* 在入口文件引入iconfont 解决组件中引入路径报错 */

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
/* 导航式编程，向hisory添加一条记录 */
router.push('/goods')
