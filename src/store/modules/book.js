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
	initDragPos: {x:0,y:0},
	initGridPos: {x:0,y:0},
	tempDragPos: {x:0,y:0}
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
	toggleGrabbingOnGrid: function({rootState, commit}, gridIndex){
		commit('toggleGrabbingOnGrid', gridIndex)
		commit('initDragPos', rootState.mousePosition)
	},
}

// mutations
const mutations = {
	updateTitle: function(state, value){
		state.title = value;
	},
	newPage: function(state){
		var grid = {};

		grid.position = {
			x: 5,
			y: 5
		}

		grid.width = 10
		grid.height = 10
		grid.grabbing = false
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
		var selectedPage = state.pages[state.selectedPage];
		selectedPage.cellSize = value;

		// snapPos of all grids

		for (let index = 0; index < selectedPage.grids.length; index++) {
			const grid = selectedPage.grids[index];
			
			grid.position.x = Math.ceil( grid.position.x / selectedPage.cellSize ) * selectedPage.cellSize
			grid.position.y =  Math.ceil( grid.position.y / selectedPage.cellSize ) * selectedPage.cellSize
		}
	},
	toggleActivePageBgGridOption: function(state){
		state.pages[state.selectedPage].bgGridOption = !state.pages[state.selectedPage].bgGridOption;
	},
	updateBgGrid: function(state){
		var selectedPage = state.pages[state.selectedPage];

		var backgroundGridLength = (state.width * state.height) / selectedPage.cellSize;
		var count = 0;

		if(selectedPage.backgroundGrid.length > backgroundGridLength){
			count = selectedPage.backgroundGrid.length - backgroundGridLength;
			count = selectedPage.backgroundGrid.length - count;

			for (let index = 0; index < count; index++) {
				selectedPage.backgroundGrid.pop();	
			}
		}
		else if(selectedPage.backgroundGrid.length < backgroundGridLength){
			count = backgroundGridLength - selectedPage.backgroundGrid.length;

			for (let index = 0; index < count; index++) {
				selectedPage.backgroundGrid.push(0);	
			}
		}	
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
	toggleGrabbingOnGrid: function(state, gridIndex){
		var selectedPage = state.pages[state.selectedPage];
		selectedPage.grids[gridIndex].grabbing = !selectedPage.grids[gridIndex].grabbing;
		if(selectedPage.grids[gridIndex].grabbing){
			state.initGridPos = {...selectedPage.grids[gridIndex].position};
		}

	},
	initDragPos: function(state, mousePos){
		state.initDragPos = {...mousePos};
	},
	updateGridPos: function(state, payload){
		var selectedPage = state.pages[state.selectedPage]
		var grid = selectedPage.grids[payload.grid]

		var initPosX = (state.initDragPos.x * 0.026458333) 
		var initPosY = (state.initDragPos.y * 0.026458333) 

		var mousePosX = (payload.mousePos.x * 0.026458333)
		var mousePosY = (payload.mousePos.y * 0.026458333)
		
		var newPos = {
			x: Math.ceil((mousePosX - initPosX) / selectedPage.cellSize ) * selectedPage.cellSize,  
			y: Math.ceil((mousePosY - initPosY) / selectedPage.cellSize ) * selectedPage.cellSize
		}
		if(state.tempDragPos.x != newPos.x || state.tempDragPos.y != newPos.y){
			state.tempDragPos.x = newPos.x;  
			state.tempDragPos.y = newPos.y; 

			grid.position.x = state.initGridPos.x + newPos.x;  
			grid.position.y = state.initGridPos.y + newPos.y; 
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
