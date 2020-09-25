import Vue from 'vue'
import Vuex from 'vuex'

import book from './modules/book'
import layer from './modules/layer'

// import EventBus from './event-bus';

const debug = process.env.NODE_ENV !== 'production'

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		book,
		layer
	},
	strict: debug,
	state:{
		mousePosition: {
			x: 0,
			y:0
		},
		displayCanvas: false,
	},
	actions: {
	},
	mutations: {
		updateMousePostion: function(state, position){
			state.mousePosition = position;
		},
	},
	plugins: [createPersistedState()]
})




