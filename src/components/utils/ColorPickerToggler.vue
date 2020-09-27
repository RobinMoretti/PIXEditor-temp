<template>
	<div class="color-picker-toggler">
		<v-popover placement="left-center">
			<div class="color-displayer" :style="colorToDisplay"></div>
<!-- 
			<div class="color-picker-modal" slot="popover">
			</div> -->

			<template slot="popover" >
				<ColorPicker
					:color="color"
					:onEndChange="color => onColorChange(color)"
				/>

				<a v-close-popover>Close</a>
			</template>
		</v-popover>
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

<style lang="scss">
	.color-picker-toggler{
		position: relative;

		.color-displayer{
			display: inline-block;
			width: calc(var(--cell-size) * 7);
			height: calc(var(--cell-size) * 4);

			border: solid black var(--cell-size);
		}
		
	}

	.tooltip {
		z-index: 10;
		.tooltip-inner {
			background: white;
			
			// box-shadow: 0 5px 30px rgba(black, .1);
			border: solid 2px black;
			padding: 8px;
			border: solid black 8px;
		}
	}
</style>


<style src="vue-color-gradient-picker/dist/index.css" lang="css" />