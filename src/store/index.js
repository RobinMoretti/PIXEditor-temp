import Vue from 'vue'
import Vuex from 'vuex'

import book from './modules/book'
import layer from './modules/layer'
import page from './modules/page'
import grid from './modules/grid'
import tool from './modules/tool'


import VuexORM from '@vuex-orm/core'
// import VuexORMLocalForage from 'vuex-orm-localforage'
import Grid from './models/grid'
import Page from './models/page'

const debug = process.env.NODE_ENV !== 'production'

import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const database = new VuexORM.Database()

database.register(Grid)
database.register(Page)

// VuexORM.use(VuexORMLocalForage, {
// 	database
// })

const vuexLocal = new VuexPersistence({
	storage: window.localStorage
})

export default new Vuex.Store({
	namespace: true,
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
	plugins: [
		VuexORM.install(database),
		vuexLocal.plugin, 
	]
})





