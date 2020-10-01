<template>
	<p 
		class="page-selector-badge"
		:class="{ selected: (selectedPage == id) }"
		v-on:click="selectPage">
		{{id}}
	</p>
</template>

<script>

export default {
	data () {
		return {
			selected: false
		}
	},
	props: {
		page: Object,
		id: Number,
	},
	computed: {
		selectedPage: function(){
			return this.$store.state.book.selectedPage;
		}
	},
	methods: {
		selectPage: function(){
			console.log('selectPage')
			return this.$store.dispatch('page/selectPage', this.id);
		}
	},
	mounted () {
	},
}
</script>

<style lang="scss">
	.page-selector-badge{
		cursor: pointer;
		display: inline;
		// font-family: 'pixel';
		font-size: calc(var(--cell-size)*10);
		line-height: calc(var(--cell-size)*5);
		margin-bottom: var(--cell-size);
		padding-bottom: var(--cell-size);
	}

	.page-selector-badge.selected{
		border-bottom: solid var(--cell-size) black;
	}
</style>
