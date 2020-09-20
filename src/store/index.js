import Vue from 'vue'
import Vuex from 'vuex'

import book from './modules/book'

const debug = process.env.NODE_ENV !== 'production'

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		book,
	},
	strict: debug,
	state:{
	},
	actions: {
		// init: ({ dispatch, commit })=>{
		// },
	},
	mutations: {
	},
	plugins: [createPersistedState()]
})