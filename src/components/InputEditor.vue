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
				v-if="inputType != 'textarea' "
				:type="inputType"
				ref="textInput">

			<textarea 
				name="" 
				id="" 
				cols="30" 
				rows="10"
				v-model="tempValue" 
				placeholder="modifiez-moi" 
				v-if="inputType == 'textarea'"
				ref="textareaInput"></textarea>
				
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
		value:{},
	},
	methods: {
		toggleInput: function(){
			this.displayInput = !this.displayInput;
			if(this.displayInput){
				this.$nextTick(()=>{
					switch (this.inputType) {
						case 'text':
							console.log(this.$refs)
							console.log(this.$refs.textInput)
							this.$refs.textInput.focus();
							break;
						case 'textarea':
							this.$refs.textareaInput.focus();
							break;
					
						default:
							break;
					}
				})
			}
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
		margin: var(--cell-size);
		margin-left: 0; padding-left: 0;


		.input-container{
			display: flex;
			justify-content: flex-start;
			align-items: flex-end;

			text-align: left;
			margin-left: 0; padding-left: 0;

			input{
				// remove default border on focus
				outline-width: 0;
				outline-color: rgba($color: #000000, $alpha: 0);

				border: solid var(--cell-size) black;
				height: calc(var(--cell-size) * 9);
				// padding: var(--cell-size);
				padding-left: calc(var(--cell-size) - 1px);
				line-height: 0;

				font-size: calc(var(--cell-size)*10);
				line-height: calc(var(--cell-size)*5);  

				min-width: 200px;
				width: 65%;
				// width: 100%;
				box-sizing: border-box;
				
			}

			button{
				font-family: 'pixel';
				padding-bottom: var(--cell-size);
				border: none;
				font-size: calc(var(--cell-size)*10);
				line-height: calc(var(--cell-size)*5);
				border-bottom: solid black var(--cell-size);
				background: none;
				margin-left: var(--cell-size);
			}
		}

		.input-value{
			font-size: calc(var(--cell-size)*10);
			line-height: calc(var(--cell-size)*5);
		}
	}

	.sm{

		.input-container{
			input{
				font-size: calc(var(--cell-size)*4);
				line-height: calc(var(--cell-size)*2);
				height: calc(var(--cell-size) * 5);
			}

			button{
				font-size: calc(var(--cell-size)*4);
				line-height: calc(var(--cell-size)*2);
			}
		}

		.input-value{
			font-size: calc(var(--cell-size)*4);
			line-height: calc(var(--cell-size)*2);
		}
	}

</style>
