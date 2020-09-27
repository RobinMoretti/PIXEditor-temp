<template>
	<div class="layer-editor">
		<h3>Tool</h3>

		<div class="input-group options-conainter">

			<div class="option">
				<ColorPickerToggler
					:color="activeColor"
					v-on:colorPicked="updateActiveColor($event)"></ColorPickerToggler>
			</div>

		</div>
		
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	computed: {
		...mapGetters({
			activeTool: 'tool/activeTool'
		}),
		activeColor: function(){
			return this.$store.state.tool.activeColor
		}
	},
	methods: {
		updateActiveColor: function(color){
			this.$store.commit('tool/updateActiveColor', { color: color })
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
