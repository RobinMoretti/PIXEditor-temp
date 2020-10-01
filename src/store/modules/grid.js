import Vue from 'vue'
// import store from './../../store'
import helpers from './../../helpers'

// import router from '../../router'

// initial state
const state = {
}

// getters
const getters = {
	toolActiveColor: function(state, getters, rootState){
		return rootState.tool.activeColor;
	},
	allGrids: function(state, getters){
		var selectedPage = getters["selectedPage"];
		return helpers.cloneVar(selectedPage.grids)["background"] = selectedPage.background.grid
	},
	activeGrid: function(state, getters){
		var selectedPage = getters["selectedPage"];

		if(selectedPage.background.editable){
			return selectedPage.background.grid
		}

		for (let index = 0; index < selectedPage.grids.length; index++) {
			if(selectedPage.grids[index].editable){
				return selectedPage.grids[index]
			}
		}
	},
	activeGridIndex: function(state, getters){
		var selectedPage = getters["selectedPage"];
		
		if(selectedPage.background.editable){
			return "background"
		}

		for (let index = 0; index < selectedPage.grids.length; index++) {
			if(selectedPage.grids[index].editable){
				return index
			}
		}
	},
	selectedPage: function(state, getters, rootState){
		return rootState.book.pages[rootState.book.selectedPage];
	},
}

// actions
const actions = {
	clickedActiveGridCell: function({getters, commit}, payload){
		payload.grid = getters["activeGrid"];

		if(getters["activeGridIndex"] != 'background'){
			payload.grid = payload.grid.cells;
		}

		payload.toolActiveColor = getters["toolActiveColor"];

		commit('setCellContent', payload)
	},
	updateLayerSize: function({getters, commit}, payload){
		payload.grid = getters["activeGrid"];
		
		payload.size = {
			x: 0,
			y: 0
		}

		if(payload.state == "height"){
			payload.size.x = payload.value
			payload.size.y = payload.grid.height
		}
		else{
			payload.size.x = payload.grid.width
			payload.size.y = payload.value
		}



		commit("setLayerSize", payload)
	},
}

// mutations
const mutations = {
	setLayerSize: function(state, payload){
		Vue.set(payload.grid, "width", payload.size.x);
		Vue.set(payload.grid, "height", payload.size.y);
	},
	setCellContent: function(state, payload){
		if(payload.grid[payload.cellId] == payload.toolActiveColor.style){
			Vue.set(payload.grid, payload.cellId, null);
		}
		else
			Vue.set(payload.grid, payload.cellId, payload.toolActiveColor.style);
	},
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
