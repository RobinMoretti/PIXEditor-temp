<template>
	<div class="page-setting">
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
							<img src="/images/delete-icon.png" v-on:click="deleteGrid(key)" alt="" :width="3*8 + 'px'" style="margin-left: 8px" >
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
							<div class="plus" v-on:click="addNewGrid">
								<img src="/images/add-icon.png" :width="3*8 + 'px'" style="margin-left: 8px" >
							</div>
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
</template>

<script>

export default {
	components: {
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
	},
	methods: {
		deleteGrid: function (gridId) {
			this.$store.commit('book/deleteGridOnSelectedPage', gridId)
		},
		addNewGrid: function () {
			this.$store.commit('book/addNewGridToSelectedPage')
		},
		updatePageCellSize: function (value) {
			this.$store.commit('book/updateActivePageCellSize', value)
			this.$store.commit('book/updateBgGrid')
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
			if(!this.selectedPage.grids[gridId].editable)
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
	.page-setting{
		font-family: 'pixel';
		box-sizing: border-box;
		font-size: calc(var(--cell-size)*4);
		line-height: calc(var(--cell-size)*2);
		border: solid var(--cell-size) black;
		padding: var(--cell-size);
		width: 100%;
		margin-bottom: var(--cell-size);

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
</style>
