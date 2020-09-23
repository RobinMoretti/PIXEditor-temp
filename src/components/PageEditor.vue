<template>
	<div class="page-editor" :style="bgGridCssVariables">
		<div class="page" v-if="selectedPage">
			<div class="background-grid" v-if="selectedPage.bgGridOption">
				<div 
					class="cell"
					v-for="(cell, key) in selectedPage.backgroundGrid"
					:key="'bgcell-' + key"></div>
			</div>

			<Grid 
				v-for="(grid, key) in selectedPage.grids"
				:grid="grid"
				:grid-id="key"
				:cell-size="selectedPage.cellSize"
				:key="'grid-'+key">
			</Grid>
		</div>

		<div class="page-setting" v-if="selectedPage">
			<h3>Page setting</h3>
			<form>
				<div class="input-group">
					<label for="cell-size">Cell size - cm</label>
					<InputEditor 
						display-input-type="h2"
						inputType="number"
						:value="cellSize"
						v-on:update-value="updatePageCellSize"
						class="sm">
					</InputEditor>
				</div>
				<div class="input-group">
					<label for="cell-size">Background grid</label>
					
					<button 
						v-on:click="togglePageBgGrid">Toggle</button>	
				</div>
				<div class="input-group">
					<button 
						v-on:click="deleteSelectedPage">DELETE PAGE</button>		
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import Grid from '../components/Grid.vue'

export default {
	components: {
		Grid,
	},
	computed: {
		selectedPage: function(){
			var book = this.$store.state.book;
			return book.pages[book.selectedPage];
		},
		pages: function(){
			var book = this.$store.state.book;
			return book.pages;
		},
		cellSize: function(){
			if(this.$store.getters.['book/selectedPageObj']){
				return this.$store.getters.['book/selectedPageObj'].cellSize
			}else{
				return 10;
			}
		},
		bgGridCssVariables: function(){
			return {
				'--bg-grid-cellsize': this.cellSize + 'cm',
			}
		},
	},
	methods: {
		updatePageCellSize: function (value) {
			this.$store.commit('book/updateActivePageCellSize', value)
		},
		togglePageBgGrid: function () {
			this.$store.commit('book/toggleActivePageBgGridOption')
			if(this.selectedPage.bgGridOption){
				this.$store.commit('book/updateBgGrid')
			}
		},
		deleteSelectedPage: function () {
			this.$store.commit('book/deleteSelectedPage')
		},
	},
	data () {
		return {
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
			box-sizing: border-box;
			display: inline-block;
			width: 21cm;
			height: 29.7cm;
			flex-shrink: 0;
			overflow: hidden;
		}

		.page-setting{
			flex-shrink: 1;
			flex-flow: 2;
			flex-grow: 2;
			font-family: 'pixel';
			box-sizing: border-box;
			font-size: calc(var(--cell-size)*4);
			line-height: calc(var(--cell-size)*2);
			border: solid var(--cell-size) black;
			padding: var(--cell-size);

			.input-group,h3{
				margin-bottom: var(--cell-size);
				.sm{
					.input-container{
						input{	
						}
					}
					.input-value{
					}
				}
			}

			.input-group{
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				align-items: flex-start;
				margin-bottom: var(--cell-size);
				border-bottom: black var(--cell-size) solid;
			}
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
