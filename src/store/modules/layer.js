import Vue from 'vue'
// import store from './../../store'
import helpers from './../../helpers'

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
	activeLayerColors: function(state, getters){
		var layer =  getters["activeLayer"];
		
		if(layer){
			var colors = layer.cells.filter(helpers.onlyUnique)
			colors = colors.filter(color => color)
			return colors;
		}
		else{

			return {}
		}
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
		commit('changeLayerProperty', {layer: layer, value: payload.color, property: 'backgroundColor'})
	},
	changeLayerCellsCounterColor:  function({getters, commit}, payload){
		var layer =  getters["activeLayer"];
		commit('changeLayerProperty', {layer: layer, value: payload.color, elem: 'cellsCounter', property: 'color'})
	}
}

// mutations
const mutations = {
	changeLayerProperty:  function(state, payload){
		if(payload.elem){
			Vue.set(payload.layer[payload.elem], payload.property, payload.value)
		}
		else{
			Vue.set(payload.layer, payload.property, payload.value)
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
