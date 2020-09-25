<template>
	<div class="page-editor" :style="bgGridCssVariables">
		<div class="page" v-if="selectedPage">
			<div class="background-grid" v-if="selectedPage.background.visible">
				<div 
					class="cell"
					v-for="(cell, key) in selectedPage.background.grid"
					:key="'bgcell-' + key"></div>
			</div>

			<Grid 
				v-for="(grid, key) in grids"
				:grid="grid"
				:grid-id="key"
				:cell-size="selectedPage.cellSize"
				:key="'grid-'+key">
			</Grid>
		</div>

		<div class="panel">
			<PageSetting  v-if="selectedPage"></PageSetting>
			<LayerEditor  v-if="selectedPage && selectedPageHaveEditableLayer"></LayerEditor>
		</div>
	</div>
</template>

<script>
import Grid from '../components/Grid.vue'
import PageSetting from '../components/PageSetting.vue'
import LayerEditor from '../components/LayerEditor.vue'

export default {
	components: {
		Grid,
		PageSetting,
		LayerEditor
	},
	computed: {
		selectedPageHaveEditableLayer: function(){
			return this.$store.getters['book/selectedPageHaveEditableLayer']
		},
		grids: function(){
			return this.selectedPage.grids.filter( grid => {
				console.log("grid.visibility", grid.visibility)
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
			return {
				'--bg-grid-cellsize': this.cellSize + 'cm',
			}
		},
	},
	methods: {
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
			position: relative;
			border: solid var(--cell-size) black;
			// box-sizing: border-box;
			display: inline-block;
			width: 21cm;
			height: 29.7cm;
			flex-shrink: 0;
			overflow: hidden;
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

		.cell{
			background: red;
			display: inline-block;
			width: var(--bg-grid-cellsize);
			height: var(--bg-grid-cellsize);
			box-sizing: border-box;
			border: solid 1px black;
		}
	}
</style>
