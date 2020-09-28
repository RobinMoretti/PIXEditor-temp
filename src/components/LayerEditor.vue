<template>
	<div class="layer-editor">
		<h3><i v-if="layerIndex != 'background'">Grid</i> {{layerIndex}}</h3>

		<div class="input-group options-conainter">
			<div class="option">
				<label> Border: </label>
				<ImgToggler
					image-src1="/images/check.png"
					image-src2="/images/checked.png"
					:value="layer.border.visible"
					v-on:toggled="toggleBorder"
					:image-width="3"></ImgToggler>

				<ColorPickerToggler
					:color="layer.border.color"
					v-on:colorPicked="updateBorderColor($event)"></ColorPickerToggler>

				<VueSlider 
					width="35%" 
					v-model="backgroundBorderWidth"
					:min="0"
					:max="Math.floor((cellSize / 0.026458333) /2) "
					:interval="1"></VueSlider>

			</div>

			<div class="option">
				<label> background color: </label>
				<ColorPickerToggler
					:color="layer.backgroundColor"
					v-on:colorPicked="updateBackgroundColor($event)"></ColorPickerToggler>
			</div>

			<div class="option" v-if="layerIndex != 'background'">
				<span>width:</span>
				<InputEditor 
					display-input-type="h2"
					inputType="number"
					:value="layer.width"
					v-on:update-value="updateGridWidth"
					class="sm">
				</InputEditor>
			</div>

			<div class="option" v-if="layerIndex != 'background'">
				<span>height:</span>
				<InputEditor 
					display-input-type="h2"
					inputType="number"
					:value="layer.height"
					v-on:update-value="updateGridHeight"
					class="sm">
				</InputEditor>
			</div>
			<div class="option" v-if="layerIndex != 'background'">
				<span>Cell counter color:</span>
				<ColorPickerToggler
					:color="layer.cellsCounter.color"
					v-on:colorPicked="updateCellsCounterColor($event)"></ColorPickerToggler>
			</div>
			<div class="option" v-if="layerIndex != 'background'">
				<span>Cell counter X:</span>
				<span>
					<label for="left">Left</label>
					<input type="radio" id="left" value="left" v-model="CellCounterXPos">
				</span>
				<span>
					<label for="right">Right</label>
					<input type="radio" id="right" value="right" v-model="CellCounterXPos">
				</span>
			</div>
			<div class="option" v-if="layerIndex != 'background'">
				<span>Cell counter Y:</span>
				<span>
					<label for="top">Top</label>
					<input type="radio" id="top" value="top" v-model="CellCounterYPos">
				</span>
				<span>
					<label for="bottom">Bottom</label>
					<input type="radio" id="bottom" value="bottom" v-model="CellCounterYPos">
				</span>
			</div>
		</div>
		
	</div>
</template>

<script>

export default {
	computed: {
		layer:function(){
			return this.$store.getters['layer/activeLayer']
		},
		layerIndex:function(){
			return this.$store.getters['layer/activeLayerIndex']
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
			return this.$store.getters['book/selectedPageObj'].cellSize
		},
		backgroundBorderWidth: {
			get () {
				return this.layer.border.width;     
			},
			set (val) {
				this.$store.dispatch('layer/updateLayerBorderWidth', { borderWidth: val })    
			}
		},
		CellCounterXPos: {
			get () {
				return this.layer.cellsCounter.position ? this.layer.cellsCounter.position.x : 'left';     
			},
			set (val) {
				this.$store.dispatch('layer/updateLayerCellsCounterPositionX', { position: val })  
			}
		},
		CellCounterYPos: {
			get () {
				return this.layer.cellsCounter.position ? this.layer.cellsCounter.position.y : 'top';     
			},
			set (val) {
				this.$store.dispatch('layer/updateLayerCellsCounterPositionY', { position: val })  
			}
		}
	},
	methods: {
		updateCellsCounterColor(color) {
			this.$store.dispatch('layer/changeLayerCellsCounterColor', { color: { ...color }})
		},
		updateBackgroundColor(color) {
			this.$store.dispatch('layer/changeLayerBackgroundColor', { color: { ...color }})
		},
		toggleBorder: function(){
			this.$store.dispatch('layer/toggleLayerBorderVisible')
		},
		updateBorderColor: function(color){
			this.$store.dispatch('layer/updateLayerBorderColor', { color: color })
		},
		updateGridWidth: function(value){
			this.$store.dispatch('grid/updateLayerSize', { state: "width", value: value })
		},
		updateGridHeight: function(value){
			this.$store.dispatch('grid/updateLayerSize', { state: "height", value: value })
		},
		
	},
	data () {
		return {
			test: 0
		}
	},
	props: {
	},
	mounted () {
	},
}
</script>

<style lang="scss" scoped>
	.layer-editor{
		font-family: 'pixel';
		box-sizing: border-box;
		font-size: calc(var(--cell-size)*4);
		line-height: calc(var(--cell-size)*2);
		border: solid var(--cell-size) black;
		padding: var(--cell-size);
		width: 100%;
		margin-bottom: var(--cell-size);

		h3{
			margin-bottom: var(--cell-size);
		}

		.input-group{
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-start;
			padding-bottom: var(--cell-size);
			margin-bottom: var(--cell-size);
			border-bottom: black var(--cell-size) solid;
		}


		label{
			display: block;
			width: 100%;
			text-align: left;
		}

		.options-conainter{
			.option{
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: var(--cell-size);
				label{
					width: unset !important; 
				}
			}
		}

	}
</style>
