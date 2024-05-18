import {
	createStore
} from 'vuex'

import moduleCart from './cart.js'

const store = createStore({
	state() {
		return {}
	},
	modules: {
		m_cart: moduleCart
	}
})
export default store