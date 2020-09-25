// import Vue from 'vue'
// import store from './../../store'
// import helpers from './../../helpers'

// import router from '../../router'

// initial state
const state = {
}

// getters
const getters = {
	activeLayer: function(state, getters){
		var selectedPage = getters["selectedPage"];
		
		for (let index = 0; index < selectedPage.grids.length; index++) {
			if(selectedPage.grids[index].editable){
				return selectedPage.grids[index]
			}
		}

		if(selectedPage.background.editable ){
			return selectedPage.background
		}
	},
	activeLayerIndex: function(state, getters){
		var selectedPage = getters["selectedPage"];
		
		for (let index = 0; index < selectedPage.grids.length; index++) {
			if(selectedPage.grids[index].editable){
				return index
			}
		}

		if(selectedPage.background.editable ){
			return 'background'
		}
	},
	selectedPage: function(state, getters, rootState){
		return rootState.book.pages[rootState.book.selectedPage];
	},
}

// actions
const actions = {
	updateLayerBorderColor:  function({getters, commit}, payload){
		var layer =  getters["activeLayer"];
		commit('changeLayerBorderColor', {layer: layer, color: payload.color})
	},
	toggleLayerBorderVisible: function({getters, commit}, payload){
		var layer =  getters["activeLayer"];
		commit('toggleLayerBorderVisible', {layer: layer, color: payload.color})
	},
	changeLayerBackgroundColor:  function({getters, commit}, payload){
		var layer =  getters["activeLayer"];
		commit('changeLayerBackgroundColor', {layer: layer, color: payload.color})
	}
}

// mutations
const mutations = {
	changeLayerBorderColor:  function(state, payload){
		payload.layer.border.color = payload.color;
	},
	toggleLayerBorderVisible: function(state, payload){
		payload.layer.border.visible = payload.layer.border.visible ? false : true
	},
	changeLayerBackgroundColor:  function(state, payload){
		payload.layer.backgroundColor =  payload.color
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
