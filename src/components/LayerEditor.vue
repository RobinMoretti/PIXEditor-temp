<template>
	<div class="layer-editor">
		<h3><i v-if="layerIndex != 'background'">Grid</i> {{layerIndex}}</h3>

		<div class="input-group">
			Background color

			<div class="option">

				<ColorPicker
					:color="layer.backgroundColor"
					:onEndChange="color => onBgChange(color)"
				/>
			</div>
		</div>
		
	</div>
</template>

<script>

import { ColorPicker } from 'vue-color-gradient-picker';

export default {
	components: {
		ColorPicker
	},
	computed: {
		layer:function(){
			return this.$store.getters['book/activeLayer']
		},
		layerIndex:function(){
			return this.$store.getters['book/activeLayerIndex']
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
		onBgChange(color) {
			this.$store.commit('book/updateLayerColor', { layerIndex: this.layerIndex, color: { ...color }})
		}
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

	}
</style>


<style src="vue-color-gradient-picker/dist/index.css" lang="css" />