// import Vue from 'vue'
// import router from '../../router'

// initial state
const state = {
	title: "My book",
	width: 210,
	height: 29.7,
	selectedPage: 0,
	pages: [
	],
}

// getters
const getters = {
	selectedPageObj: function(state){
		return state.pages[state.selectedPage];
	},
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
	},
	newPage: function(state){
		var grid = {};
		grid.width = 10
		grid.height = 10
		grid.cells = []
		
		var cellsLenght = grid.width * grid.height;

		for (let index = 0; index < cellsLenght; index++) {
			grid.cells.push(0);	
		}

		var page = {
			backgroundGrid: [],
			cellSize: 1,
			bgGridOption: false,
			grids: [
				grid
			]
		}


		var backgroundGridLength = (state.width * state.height) / page.cellSize;

		for (let index = 0; index < backgroundGridLength; index++) {
			page.backgroundGrid.push(0);	
		}
		
		state.pages.push(page)
	},
	selectPage: function(state, pageId){
		state.selectedPage = pageId;
	},
	updateActivePageCellSize: function(state, value){
		state.pages[state.selectedPage].cellSize = value;
	},
	toggleActivePageBgGridOption: function(state){
		state.pages[state.selectedPage].bgGridOption = !state.pages[state.selectedPage].bgGridOption;
	},
	updateBgGrid: function(){
		// var selectedPage = state.pages[state.selectedPage];
		console.log("selectedPage - ", state.pages)
		// console.log(document.querySelector(".page"));
		// console.log(document.querySelector(".page").offsetWidth);

			// var backgroundGridLength = (state.width * state.height) / selectedPage.cellSize;
			// var count = 0;

			// if(selectedPage.backgroundGrid.length > backgroundGridLength){
			// 	count = selectedPage.backgroundGrid.length - backgroundGridLength;
			// 	count = selectedPage.backgroundGrid.length - count;

			// 	for (let index = 0; index < count; index++) {
			// 		selectedPage.backgroundGrid.pop();	
			// 	}
			// }
			// else if(selectedPage.backgroundGrid.length < backgroundGridLength){
			// 	count = backgroundGridLength - selectedPage.backgroundGrid.length;

			// 	for (let index = 0; index < count; index++) {
			// 		selectedPage.backgroundGrid.push(0);	
			// 	}
			// }	
	},

	deleteSelectedPage: function(state){
		state.pages.splice(state.selectedPage, 1);
		if(state.pages.length){
			state.selectedPage = state.pages.length - 1
		}
		else{
			state.selectedPage = null
		}
	},
	
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
