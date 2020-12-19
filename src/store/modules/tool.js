// import Vue from 'vue'
// import store from './../../store'
// import helpers from '../../helpers'

// import router from '../../router'

// initial state
const state = {
	activeTool: "brush",
	activeColor: {
		alpha: 1,
		blue: 0,
		green: 0,
		hue: 0,
		red: 0,
		saturation: 0,
		style: "rgba(0, 0, 0, 1)",
		value: 0
	},
	availableTool: {
		brush: {
			title: "Pinceau",
			icon: "images/pen.png"
		}
	}
}

// getters
const getters = {
	activeTool: function(state){
		return state.availableTool[state.activeTool];
	}
}

// actions
const actions = {
}

// mutations
const mutations = {
	updateActiveColor: function(state, payload){
		state.activeColor = payload.color
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
