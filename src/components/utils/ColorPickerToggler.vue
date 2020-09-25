<template>
	<div class="color-picker-toggler">
		<div class="color-displayer" v-on:click="toggle" :style="colorToDisplay"></div>

		<div class="color-picker-modal" v-if="displayModal">
			<ColorPicker
				:color="color"
				:onEndChange="color => onColorChange(color)"
			/>
		</div>
	</div>
</template>

<script>

import { ColorPicker } from 'vue-color-gradient-picker';

export default {
	components: {
		ColorPicker
	},
	methods: {
		toggle:function (){
			this.displayModal = !this.displayModal
		},
		onColorChange: function(color){
			console.log("color:", color)
			this.$emit('colorPicked', color)
			this.displayModal = false
		}
	},
	computed: {
		colorToDisplay: function(){
			return {
				'background-color': 'rgba(' + this.color.red + ',' +  this.color.green + ',' +  this.color.blue + ',' +  this.color.alpha + ')',
			}
		},
	},
	data () {
		return {
			displayModal: false,
		}
	},
	props: {
		color: Object,
	},
	mounted () {
	},
}
</script>

<style lang="scss" scoped>
	.color-picker-toggler{
		position: relative;

		.color-displayer{
			display: inline-block;
			width: calc(var(--cell-size) * 7);
			height: calc(var(--cell-size) * 4);

			border: solid black var(--cell-size);
		}
		
		.color-picker-modal{
			position: absolute;
			bottom: var(--cell-size);
			padding: var(--cell-size);
		}
	}
</style>


<style src="vue-color-gradient-picker/dist/index.css" lang="css" />