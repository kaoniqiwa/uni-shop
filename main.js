/**vue3 不支持导入默认 vue*/
import {
	createSSRApp
} from 'vue'

import App from './App.vue'
import {
	createPinia
} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


// import store from './store/vuex4/store.js'

uni.$showMsg = function(title = '数据加载失败', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none'

	})

}
export function createApp() {
	const app = createSSRApp(App)

	const pinia = createPinia()
	pinia.use(piniaPluginPersistedstate)
	app.use(pinia)

	app.config.globalProperties.$filter = function(val) {
		return Object.is(Number(val), NaN) ? val : Number(val).toFixed(2)
	}
	return {
		app
	}
}