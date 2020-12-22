<template>
	<div class="page-editor " :style="bgGridCssVariables">
		<div class="page" v-if="selectedPage">
			<div 
				class="background-grid" 
				v-if="selectedPage.background.visible">
				<div 
					class="cell"
					v-for="(cell, key) in selectedPage.background.grid"
					:key="'bgcell-' + key"
					:id="'bgcell-' + key"
					:style="{ background: cell }"
					v-on:click="toggleBgGridCell(key)"></div>
			</div>

			<Grid 
				v-for="(grid, key) in grids"
				:grid="grid"
				:grid-id="key"
				:cell-size="selectedPage.cellSize"
				:key="'grid-'+key">
			</Grid>
		</div>

		<div class="panel" v-if="selectedPage">
			<ToolSetting></ToolSetting>
			<PageSetting  v-if="selectedPage"></PageSetting>
			<LayerEditor  v-if="selectedPage && selectedPageHaveEditableLayer"></LayerEditor>
		</div>
	</div>
</template>

<script>
import Grid from '../components/Grid.vue'
import PageSetting from '../components/PageSetting.vue'
import LayerEditor from '../components/LayerEditor.vue'
import ToolSetting from '../components/ToolSetting.vue'

import GridsModel from '@/store/models/grid'

export default {
	components: {
		Grid,
		PageSetting,
		LayerEditor,
		ToolSetting
	},
	computed: {
		selectedPageHaveEditableLayer: function(){
			return this.$store.getters['book/selectedPageHaveEditableLayer']
		},
		grids: function(){
			return this.selectedPage.grids.filter( grid => {
				return grid.visibility
			})
		},
		selectedPage: function(){
			var book = this.$store.state.book;
			return book.pages[book.selectedPage];
		},
		pages: function(){
			var book = this.$store.state.book;
			return book.pages;
		},
		cellSize: function(){
			if(this.$store.getters['book/selectedPageObj'])
				return this.$store.getters['book/selectedPageObj'].cellSize
			else
				return 8
		},
		bgGridCssVariables: function(){
			if(this.selectedPage){
				return {
					'--bg-grid-cellsize': this.cellSize + 'cm',
					'--bg-grid-background-color': this.selectedPage.background.backgroundColor.style,
					'--bg-grid-border-color':  this.selectedPage.background.border.visible ? this.selectedPage.background.border.color.style : 'rgba(0,0,0,0)',
					'--bg-grid-border-width':  (this.selectedPage.background.border.visible ? this.selectedPage.background.border.width : 0) + 'px'
				}
			}
			else{
				return {}
			}
		},
	},
	methods: {
		toggleBgGridCell: function(key){
			if(this.selectedPage.background.editable){
				this.$store.dispatch('grid/clickedActiveGridCell', { cellId: key } )
			}	
		}
	},
	data () {
		return {
			grabbingGridIndex: 0,
			grabbingInterval: null,
		}
	},
	props: {
	},
	mounted () {
		// var grid = new GridsModel();
		// console.log("grid", grid)
		// GridsModel.insert({ data: grid})
		console.log(GridsModel.all());
		
	},
}
</script>

<style lang="scss" scoped>
	.page-editor{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-start;

		.page{
			background-color: var(--bg-grid-background-color);
			position: relative;
			border: solid var(--cell-size) black;
			// box-sizing: border-box;
			display: inline-block;
			width: 25cm;
			height: 25cm;
			flex-shrink: 0;
			overflow: hidden;

			&.to-print{
				border: none;
			}
		}

		.panel{
			flex-shrink: 1;
			flex-flow: 2;
			flex-grow: 2;
		}
	}

	.background-grid{
		position: absolute;
		left: 0; top: 0;
		width: calc(100% + (var(--bg-grid-cellsize) * 1));
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
		border: solid  var(--bg-grid-border-width) var(--bg-grid-border-color);
		border-right: unset; border-bottom: unset;

		.cell{
			display: inline-block;
			width: var(--bg-grid-cellsize);
			height: var(--bg-grid-cellsize);
			box-sizing: border-box;
			border: solid  var(--bg-grid-border-width) var(--bg-grid-border-color);
			border-left: unset; border-top: unset;
		}
	}
</style>
