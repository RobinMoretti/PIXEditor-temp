// import Vue from 'vue'
// import router from '../../router'

// initial state
const state = {
	title: "My book",
	width: 210,
	height: 29.7,
	pages: [
		{
			grids: [
				{
					width: 20,
					height: 20,
					cellSize: 16
				}
			]
			
		}
	],
}

// getters
const getters = {
// selectedArticle: function(state){
//   return article;
// },
}

// actions
const actions = {
	// init: ({dispatch, commit})=>{
	// }
}

// mutations
const mutations = {
	updateTitle: function(state, value){
		state.title = value;
		console.log("title", state.title)
	},
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
