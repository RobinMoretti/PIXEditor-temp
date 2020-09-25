// import Vue from 'vue'
import store from './../../store'
import helpers from './../../helpers'

// import router from '../../router'

// initial state
const state = {
	title: "My book",
	width: 21.0,
	height: 29.7,
	selectedPage: 0,
	pages: [
	],
	initDragPos: {x:0,y:0},
	initGridPos: {x:0,y:0},
	tempDragPos: {x:0,y:0},
	defaultGrid: {
		position: {
			x: 5,
			y: 5
		},
		width: 10,
		height: 10,
		grabbing: false,
		editable: false,
		cells: [],
		visibility: true,
	}
}

// getters
const getters = {
	selectedPageObj: function(state){
		return state.pages[state.selectedPage];
	},
	activeLayer: function(state){
		var selectedPage = state.pages[state.selectedPage];
		
		for (let index = 0; index < selectedPage.grids.length; index++) {
			if(selectedPage.grids[index].editable){
				return selectedPage.grids[index]
			}
		}

		if(selectedPage.background.editable ){
			return selectedPage.background
		}
	},
	activeLayerIndex: function(state){
		var selectedPage = state.pages[state.selectedPage];
		
		for (let index = 0; index < selectedPage.grids.length; index++) {
			if(selectedPage.grids[index].editable){
				return index
			}
		}

		if(selectedPage.background.editable ){
			return 'background'
		}
	},
	selectedPageHaveEditableLayer: function(state){
		var selectedPage = state.pages[state.selectedPage];
		
		for (let index = 0; index < selectedPage.grids.length; index++) {
			if(selectedPage.grids[index].editable){
				return true
			}
		}
		if(selectedPage.background.editable ){
			return true
		}

		return false;
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
	deleteGridOnSelectedPage: function(state, gridId){
		var selectedPage = state.pages[state.selectedPage];
		selectedPage.grids.splice(gridId, 1);
	},
	updateCellGrid: function(state, payload){
		var selectedPage = state.pages[state.selectedPage];

		if(payload.gridId != 'background'){
			console.log("payload.cellsId", selectedPage.grids[payload.gridId].cells)
			selectedPage.grids[payload.gridId].cells[payload.cellId] = payload.value
		}
		else{
			//background grid
		}
				// this.cells[key] == 0 ? this.$set(this.cells, key, 1) : this.$set(this.cells, key, 0);
	},
	disableAllEditable: function(state){
		var selectedPage = state.pages[state.selectedPage];

		if(selectedPage.background.editable){
			selectedPage.background.editable = false
		}

		for (let index = 0; index < selectedPage.grids.length; index++) {
			if(selectedPage.grids[index].editable){
				selectedPage.grids[index].editable = false;	
			}
			
		}
	},
	updateTitle: function(state, value){
		state.title = value;
	},
	newPage: function(state){
		var grid = helpers.cloneVar(state.defaultGrid);
		grid.editable = true

		var cellsLenght = grid.width * grid.height;

		for (let index = 0; index < cellsLenght; index++) {
			grid.cells.push(0);	
		}

		var page = {
			background: {
				grid:[],
				visible: false,
				editable: false,
			},
			cellSize: 1,
			grids: [
				grid
			]
		}

		var backgroundGridLength = (state.width * state.height) / page.cellSize;

		for (let index = 0; index < backgroundGridLength; index++) {
			page.background.grid.push(0);	
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
	toggleActivePageBgGridVisibility: function(state){
		state.pages[state.selectedPage].background.visible = !state.pages[state.selectedPage].background.visible;
	},
	toggleActivePageBgGridEditable: function(state){
		state.pages[state.selectedPage].background.editable = !state.pages[state.selectedPage].background.editable;
	},
	toggleGridVisibility: function(state, gridId){
		var grid = state.pages[state.selectedPage].grids[gridId];
		grid.visibility = !grid.visibility;
	},
	toggleGridEditable: function(state, gridId){
		var grid = state.pages[state.selectedPage].grids[gridId];
		grid.editable = !grid.editable;
		console.log(grid.editable )
	},
	updateBgGrid: function(state){
		var selectedPage = state.pages[state.selectedPage];

		//snap width and height to page cell size
		var backgroundGridLength = Math.ceil((snapTo(state.width) * snapTo(state.height)) / (selectedPage.cellSize * selectedPage.cellSize))

		var count = 0;

		if(selectedPage.background.grid.length > backgroundGridLength){
			count = selectedPage.background.grid.length - backgroundGridLength;
			count = selectedPage.background.grid.length - count;

			console.log(count)

			for (let index = 0; index < count; index++) {
				selectedPage.background.grid.pop();	
			}
		}
		else if(selectedPage.background.grid.length < backgroundGridLength){
			count = backgroundGridLength - selectedPage.background.grid.length;

			console.log(count)
			for (let index = 0; index < count; index++) {
				selectedPage.background.grid.push(0);	
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
			state.initGridPos = helpers.cloneVar(selectedPage.grids[gridIndex].position);
		}

	},
	initDragPos: function(state, mousePos){
		state.initDragPos = helpers.cloneVar(mousePos);
	},
	updateGridPos: function(state, payload){
		var selectedPage = state.pages[state.selectedPage]
		var grid = selectedPage.grids[payload.grid]

		var initPosX = (state.initDragPos.x * 0.026458333) 
		var initPosY = (state.initDragPos.y * 0.026458333) 

		var mousePosX = (payload.mousePos.x * 0.026458333)
		var mousePosY = (payload.mousePos.y * 0.026458333)
		
		var newPos = {
			x: snapTo((mousePosX - initPosX)),  
			y: snapTo((mousePosY - initPosY))
		}

		if(state.tempDragPos.x != newPos.x || state.tempDragPos.y != newPos.y){
			state.tempDragPos.x = newPos.x;  
			state.tempDragPos.y = newPos.y; 

			grid.position.x = state.initGridPos.x + newPos.x;  
			grid.position.y = state.initGridPos.y + newPos.y; 
		}
	},
	addNewGridToSelectedPage: function(state){
		var selectedPage = state.pages[state.selectedPage]
		selectedPage.grids.push(helpers.cloneVar(state.defaultGrid))
	}
	
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}


function snapTo(value){
	var snapStep = store.getters['book/selectedPageObj'].cellSize
	return Math.ceil(value / snapStep ) * snapStep
}
