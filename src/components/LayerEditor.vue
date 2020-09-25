<template>
	<div class="layer-editor">
		<h3><i v-if="layerIndex != 'background'">Grid</i> {{layerIndex}}</h3>

		<div class="input-group options-conainter">

			<div class="option">
				<label> Background color </label>
			</div>


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
			</div>

			<div class="option">
				<label> background color: </label>
				<ColorPickerToggler
					:color="layer.backgroundColor"
					v-on:colorPicked="updateBackgroundColor($event)"></ColorPickerToggler>
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
			return this.$store.getters['book/selectedPageObj'].cellSize
		},
	},
	methods: {
		updateBackgroundColor(color) {
			this.$store.dispatch('layer/changeLayerBackgroundColor', { color: { ...color }})
		},
		toggleBorder: function(){
			this.$store.dispatch('layer/toggleLayerBorderVisible', { layerIndex: this.layerIndex })
		},
		updateBorderColor: function(color){
			this.$store.dispatch('layer/updateLayerBorderColor', { color: color })
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
	.layer-editor{
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
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: var(--cell-size);
			}
		}

	}
</style>
