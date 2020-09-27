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
		if(selectedPage.background.grid.editable){
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
		
		if(selectedPage.background.grid.editable){
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
		payload.toolActiveColor = getters["toolActiveColor"];
		commit('setCellContent', payload)
	},
	// updateLayerBorderWidth:  function({getters, commit}, payload){
	// 	var layer =  getters["activeLayer"];
	// 	commit('changeLayerProperty', {layer: layer, value: payload.borderWidth, elem: 'border', property: 'width'})
	// },
}

// mutations
const mutations = {
	setCellContent:  function(state, payload){
		console.log(payload.toolActiveColor.style)
		Vue.set(payload.grid.cells, payload.cellId, payload.toolActiveColor.style);
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
