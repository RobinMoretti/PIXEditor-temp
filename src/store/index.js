import Vue from 'vue'
import Vuex from 'vuex'

import book from './modules/book'
import layer from './modules/layer'
import page from './modules/page'
import grid from './modules/grid'
import tool from './modules/tool'

// import EventBus from './event-bus';

const debug = process.env.NODE_ENV !== 'production'

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		book,
		layer,
		grid,
		tool,
		page
	},
	strict: debug,
	state:{
		mousePosition: {
			x: 0,
			y:0
		},
		updateMousePos: false,
		displayCanvas: false,
	},
	actions: {
	},
	mutations: {
		updateMousePostion: function(state, position){
			state.mousePosition = position;
		},
		toggleMouseTracker: function(state, value = null){
			if(value != null)
				state.updateMousePos = value;
			else
				state.updateMousePos = !state.updateMousePos;
		},
	},
	plugins: [createPersistedState()]
})




