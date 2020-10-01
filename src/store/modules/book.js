import Vue from 'vue'
import store from './../../store'
import helpers from './../../helpers'

// import router from '../../router'

// initial state
const state = {
	title: "My book",
	width: 25,
	height: 25,
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
		backgroundColor: {
			red: 255,
			green: 255,
			blue: 255,
			alpha: 1,
			style: 'rgb(255,255,255)'
		},
		border: {
			visible: false,
			color: {
				red: 255,
				green: 255,
				blue: 255,
				alpha: 1,
				style: 'rgb(255,255,255)'
			},
		},
		cellsCounter: {
			color: {
				red: 100,
				green: 100,
				blue: 100,
				alpha: 1,
				style: 'rgb(100,100,100)'
			},
			position: {
				x: 'left',
				y: 'top'
			}, 
			colored: true // colored by drawing or colored gloabaly
		}

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
		if(!state.pages[state.selectedPage]){
			return false;
		}

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
	toggleGrabbingOnGrid: function({rootState, commit}, payload){
		if(payload.event != null)
			commit('updateMousePostion', {x: payload.event.clientX, y: payload.event.clientY}, {root: true})

		commit('toggleMouseTracker', null, { root: true })

		
		Vue.nextTick(() => {
			commit('toggleGrabbingOnGrid', payload.gridIndex)
			commit('initDragPos', rootState.mousePosition)
		})
	},
}

// mutations
const mutations = {
	deleteGridOnSelectedPage: function(state, gridId){
		var selectedPage = state.pages[state.selectedPage];
		selectedPage.grids.splice(gridId, 1);
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
		console.log("gridId", gridId)
		var grid = state.pages[state.selectedPage].grids[gridId];
		grid.editable = !grid.editable;
		console.log(grid.editable )
	},
	updateBgGrid: function(state){
		var selectedPage = state.pages[state.selectedPage];

		//snap width and height to page cell size
		var backgroundGridLength = Math.ceil((snapTo(state.width) * snapTo(state.height)) / (selectedPage.cellSize * selectedPage.cellSize))

		console.log("backgroundGridLength", backgroundGridLength) 
		console.log("selectedPage.background.grid", selectedPage.background.grid) 

		var count = 0;

		if(selectedPage.background.grid.length > backgroundGridLength){
			count = selectedPage.background.grid.length - backgroundGridLength;
			count = selectedPage.background.grid.length - count;

			console.log("count:",count)

			for (let index = 0; index < count; index++) {
				selectedPage.background.grid.pop();	
			}
		}
		else if(selectedPage.background.grid.length < backgroundGridLength){
			count = backgroundGridLength - selectedPage.background.grid.length;

			console.log("count:",count)
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
		var grids = selectedPage.grids.filter( grid => { return grid.visibility })

		grids[gridIndex].grabbing = !grids[gridIndex].grabbing;

		if(grids[gridIndex].grabbing){
			state.initGridPos = helpers.cloneVar(grids[gridIndex].position);
		}

	},
	initDragPos: function(state, mousePos){
		state.initDragPos = helpers.cloneVar(mousePos);
	},
	updateGridPos: function(state, payload){
		var selectedPage = state.pages[state.selectedPage]


		var grids = selectedPage.grids.filter( grid => { return grid.visibility })

		var grid = grids[payload.grid]

		
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
