import Vue from 'vue'
// import store from './../../store'
import helpers from './../../helpers'

// import router from '../../router'

// initial state
const state = {
}

// getters
const getters = {
	book: function(state, getters, rootState){
		return rootState.book
	},
	allPages: function(state, getters){
		return getters["book"].pages
	},
	activePage: function(state, getters, rootState){
		var pages = getters["allPages"];
		return pages[rootState.selectedPage];
	},
	activePageIndex: function(state, getters, rootState){
		return rootState.selectedPage;
	},
}

// actions
const actions = {
	togglePrintable: function({getters}, toggleValue){
		commit('changePageProperty', {page: getters['activePage'], value: toggleValue, property: 'printable'})
	},
	togglePlayable: function({getters}, toggleValue){
		commit('changePageProperty', {page: getters['activePage'], value: toggleValue, property: 'playable'})
	},
	newPage: function({state, commit, getters}){
		var book = getters["book"]
		var grid = helpers.cloneVar(book.defaultGrid);
		
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
				backgroundColor: {
					red: 255,
					green: 255,
					blue: 255,
					alpha: 1
				},
				border: {
					visible: false,
					color: {
						red: 255,
						green: 255,
						blue: 255,
						alpha: 1
					},
				}
			},
			cellSize: 1,
			grids: [
				grid
			],
			playable: false,
			printable: false,
		}

		var backgroundGridLength = (book.width * book.height) / page.cellSize;

		for (let index = 0; index < backgroundGridLength; index++) {
			page.background.grid.push(0);	
		}
		
		commit('addToPages', { pages: getters["allPages"], page: page})
	},
	selectPage: function({state, getters, commit}, pageId){
		commit('setSelectedPageValue', { book: getters["book"], value: pageId })
	},
}

// mutations
const mutations = {
	changePageProperty:  function(state, payload){
		var properties = payload.property.split('/')
		var pageParentProperty = payload.page

		for (let index = 0; index < properties.length-1; index++) {
			pageParentProperty = pageParentProperty[properties[index]];
		}

		Vue.set(pageParentProperty, properties[properties.length-1], payload.value)
	},
	addToPages:  function(state, payload){
		console.log("selectPage")
		payload.pages.push(payload.page)
	},
	setSelectedPageValue: function(state, payload){
		Vue.set(payload.book, "selectedPage", payload.value)
	},
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
