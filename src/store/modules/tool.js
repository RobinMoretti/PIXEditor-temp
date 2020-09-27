// import Vue from 'vue'
// import store from './../../store'
// import helpers from '../../helpers'

// import router from '../../router'

// initial state
const state = {
	activeTool: "brush",
	activeColor: {
		red: 0,
		green: 0,
		blue: 0,
		alpha: 1
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
