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
				<!-- <div class="input-group">
					<label for="cell-size">Background grid</label>
					
					<button 
						v-on:click="togglePageBgGrid">Toggle</button>	
				</div> -->
				<div>
					<label>Layers:</label>
					<div class="layers-container">
						<div class="layer">
							<div class="id">
								Background
							</div>
							<div class="options">
								<ImgToggler
									image-src1="/images/eye-open.png"
									image-src2="/images/eye-close.png"
									:value="selectedPage.background.visible"
									v-on:toggled="togglePageBgGridVisibility"
									:image-width="3"></ImgToggler>

								<ImgToggler
									image-src1="/images/pen-enable.png"
									image-src2="/images/pen-disable.png"
									:value="selectedPage.background.editable"
									v-on:toggled="togglePageBgGridEditable"
									:image-width="3"></ImgToggler>
							</div>
						</div>

						<div 
							class="layer"
							v-for="(grid, key) in selectedPage.grids"
							:key="'grid-ref-'+key">

							<div class="id">
								Grid {{key}}
							</div>
							<div class="options">
								<ImgToggler
									image-src1="/images/eye-open.png"
									image-src2="/images/eye-close.png"
									:value="grid.visibility"
									v-on:toggled="toggleGridVisibility(key)"
									:image-width="3"></ImgToggler>

								<ImgToggler
									image-src1="/images/pen-enable.png"
									image-src2="/images/pen-disable.png"
									:value="grid.editable"
									v-on:toggled="toggleGridEditable(key)"
									:image-width="3"></ImgToggler>
							</div>
						</div>
						<div 
							class="layer layer-ctrl">

							<div class="options">
								<div class="plus" v-on:click="addNewGrid">+</div>
							</div>
						</div>
					</div>
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
		grids: function(){
			return this.selectedPage.grids.filter( grid => {
				console.log("grid.visibility", grid.visibility)
				return grid.visibility
			})
		},
		dragMousePos: function(){
			var book = this.$store.state.book;
			return book.initDragPos;
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
		addNewGrid: function () {
			this.$store.commit('book/addNewGridToSelectedPage')
		},
		updatePageCellSize: function (value) {
			this.$store.commit('book/updateActivePageCellSize', value)
		},
		togglePageBgGridVisibility: function () {
			this.$store.commit('book/toggleActivePageBgGridVisibility')
			if(this.selectedPage.visibility){
				this.$store.commit('book/updateBgGrid')
			}
		},
		togglePageBgGridEditable: function () {
			if(!this.selectedPage.background.editable)
				this.$store.commit('book/disableAllEditable')
			this.$store.commit('book/toggleActivePageBgGridEditable')
		},
		toggleGridVisibility: function (gridId) {
			this.$store.commit('book/toggleGridVisibility', gridId)
		},
		toggleGridEditable: function (gridId) {
			if(!this.grids[gridId].editable)
				this.$store.commit('book/disableAllEditable')
			this.$store.commit('book/toggleGridEditable', gridId)
		},
		deleteSelectedPage: function () {
			this.$store.commit('book/deleteSelectedPage')
		},
		updateGridPos: function(gridIndex){
			this.$store.dispatch('book/toggleGrabbingOnGrid', gridIndex )

			if(this.selectedPage.grids[gridIndex].grabbing){
				this.grabbingGridIndex = gridIndex;
				this.grabbingInterval = setInterval(() => {
					
				}, 100);				
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


			label{
				display: block;
				width: 100%;
				text-align: left;
			}

			.layers-container{
				margin-top: var(--cell-size);
				display: flex;
				flex-direction: column;

				.layer{
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					margin: 0 0 var(--cell-size) 0;

					.options{
						display: flex;
						justify-content: flex-end;
					}
				}
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
