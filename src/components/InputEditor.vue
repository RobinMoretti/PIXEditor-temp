<template>
	<div class="input-editor">
		<component 
			v-bind:is="displayInputType" 
			v-on:click="toggleInput" 
			class="clickable input-value"
			v-if="!displayInput">
				{{value}}
		</component>

		<!-- <component 
			v-bind:is="inputType" 
			v-if="displayInput"
			v-model="tempValue">
		</component> -->
		<div class="input-container" v-if="displayInput">
			<input 
				v-model="tempValue" 
				placeholder="modifiez-moi" 
				v-if="inputType == 'text'">

			<textarea 
				name="" 
				id="" 
				cols="30" 
				rows="10"
				v-model="tempValue" 
				placeholder="modifiez-moi" 
				v-if="inputType == 'textarea'"></textarea>
				
			<button v-on:click="updateValue">Valider</button>
		</div>
	</div>
</template>

<script>

export default {
	data () {
		return {
			displayInput: false,
			tempValue: "",
		}
	},
	props: {
		inputType: {
			type: String,
			default: "text",
		},
		displayInputType: {
			type: String,
			default: "p",
		},
		value: String,
	},
	methods: {
		toggleInput: function(){
			this.displayInput = !this.displayInput;
		},
		updateValue: function(){
			this.$emit('update-value', this.tempValue)
			this.toggleInput();
		}
	},
	mounted () {
		this.tempValue = this.value
	},
}
</script>

<style lang="scss" scoped>
	.clickable {
		cursor: pointer;
	}
	
	.input-editor{
		text-align: left;
		padding: var(--cell-size);
		margin: var(--cell-size);
		margin-left: 0; padding-left: 0;

		.input-container{
			margin: var(--cell-size);
			text-align: left;
			margin-left: 0; padding-left: 0;

			input{
				// remove default border on focus
				outline-width: 0;
				outline-color: rgba($color: #000000, $alpha: 0);

				border: solid var(--cell-size) black;
				height: calc(var(--cell-size) * 5);
				// padding: var(--cell-size);
				padding-left: calc(var(--cell-size) - 1px);
				line-height: 0;
				font-size: calc(var(--cell-size)*8);
				line-height: calc(var(--cell-size)*4);
				
			}

		}

		.input-value{
			font-size: calc(var(--cell-size)*8);
			line-height: calc(var(--cell-size)*4);
		}
	}

</style>
