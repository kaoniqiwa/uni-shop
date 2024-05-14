import {
	createSSRApp
} from 'vue'
import App from './App.vue'


uni.$showMsg = function(title = '数据加载失败', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none'

	})

}
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}