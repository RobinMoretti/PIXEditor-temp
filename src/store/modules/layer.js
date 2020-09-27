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
	updateLayerBorderWidth:  function({getters, commit}, payload){
		var layer =  getters["activeLayer"];
		commit('changeLayerProperty', {layer: layer, value: payload.borderWidth, elem: 'border', property: 'width'})
	},
	updateLayerBorderColor:  function({getters, commit}, payload){
		var layer =  getters["activeLayer"];
		commit('changeLayerProperty', {layer: layer, value: payload.color, elem: 'border', property: 'color'})
		// commit('changeLayerBorderColor', {layer: layer, value: payload.color, property: 'border'})
	},
	toggleLayerBorderVisible: function({getters, commit}){
		var layer =  getters["activeLayer"];
		commit('toggleLayerProperty', {layer: layer, elem: 'border', property: 'visible'})
	},
	changeLayerBackgroundColor:  function({getters, commit}, payload){
		var layer =  getters["activeLayer"];
		commit('changeLayerBackgroundColor', {layer: layer, color: payload.color})
		commit('changeLayerProperty', {layer: layer, value: payload.color, property: 'backgroundColor'})
	}
}

// mutations
const mutations = {
	changeLayerProperty:  function(state, payload){
		if(payload.elem){
			payload.layer[payload.elem][payload.property] = payload.value;
		}
		else{
			payload.layer[payload.property] = payload.value;
		}
	},
	toggleLayerProperty:  function(state, payload){
		payload.layer[payload.elem][payload.property] = payload.layer[payload.elem][payload.property] ? false : true;
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
