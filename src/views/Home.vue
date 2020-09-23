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
			<h4>Pages:</h4>

			<PageSelectorBadge
				v-for="(page, key) in pages"
				:page="page"
				:id="key"
				:key="'page-'+key"
			>
			{{key}}
			</PageSelectorBadge>

			<p
				class="plus"
				v-on:click="addNewPage">
				+
			</p>
		</div>
		<!-- <p>{{pages.length}} prout</p> -->
		<PageEditor></PageEditor>


	</div>
</template>

<script>

import PageSelectorBadge from '../components/PageSelectorBadge.vue'
import PageEditor from '../components/PageEditor.vue'

export default {
	name: 'Home',
	components: {
		PageSelectorBadge,
		PageEditor
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
		},
		addNewPage: function(){
			this.$store.commit('book/newPage')
			this.$store.commit('book/selectPage', this.$store.state.book.pages.length - 1)
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

	.pages-container{
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;

		h4{
			font-size: calc(var(--cell-size)*10);
			line-height: calc(var(--cell-size)*5);
		}
		.plus{
			cursor: pointer;
			display: inline;
			// font-family: 'pixel';
			font-size: calc(var(--cell-size)*10);
			line-height: calc(var(--cell-size)*5);
			margin-bottom: var(--cell-size);
			padding-bottom: var(--cell-size);
		}
	}


</style>

