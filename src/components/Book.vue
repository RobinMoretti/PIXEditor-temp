<template>
	<div class="Book">
		{{BaseBook.title}}
		<InputEditor></InputEditor>
	</div>
</template>

<script>
import InputEditor from 'InputEditor'

export default {
	components: {
		InputEditor,
	},
	methods: {
	},
	data () {
		return {
			BaseBook: {}
		}
	},
	name: 'HelloWorld',
	props: {
		msg: String
	},
	mounted () {
	},
}
</script>

<style lang="sass" scoped>
</style>
