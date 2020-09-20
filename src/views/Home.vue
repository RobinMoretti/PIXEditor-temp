<template>
	<div id="book-editor">
		<header>
			<h1>PICROSS EDITOR</h1>
			
			<InputEditor 
				display-input-type="h2"
				inputType="text"
				:value="bookTitle"
				v-on:update-value="updateBookTitle">
			</InputEditor>
		</header>

		<div class="pages-container">
			<PageSelectorBadge
				v-for="(page, key) in pages"
				:page="page"
				:key="'page-'+key"
			></PageSelectorBadge>
			<button>
				+
			</button>
		</div>

		<Grid 
			:cell-size="25"
			:width="10"
			:height="7">

		</Grid>

	</div>
</template>

<script>

import InputEditor from '../components/InputEditor.vue'
import PageSelectorBadge from '../components/PageSelectorBadge.vue'
import Grid from '../components/Grid.vue'

export default {
	name: 'Home',
	components: {
		InputEditor,
		PageSelectorBadge,
		Grid
	},
	computed: {
		bookTitle: function(){
			return this.$store.state.book.title;
		},
		pages: function(){
			return this.$store.state.book.pages;
		}
	},
	methods: {
		updateBookTitle: function(value){
			this.$store.commit('book/updateTitle', value)
		}
	},
}
</script>


<style lang="scss">
	#book-editor{
		--cell-size: 8px;
	}
	// .varaibles {
	// 	--cell-size: red;
	// }

	#book-editor{
		h1{
			text-align:left;
			font-size: calc(var(--cell-size)*10);
			line-height: calc(var(--cell-size)*5);
		}
	}


</style>

