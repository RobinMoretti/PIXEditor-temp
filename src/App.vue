<template>
	<div id="app" v-on:mousemove="updateMousePosition">
		<!-- <p>mouseposition: {{mousePosition }}</p> -->
		<!-- <div id="nav">
			<router-link to="/">Home</router-link> |
			<router-link to="/about">About</router-link>
		</div> -->
		<router-view/>
	</div>
</template>

<script>

export default {
	components: {
	},
	computed: {
		mousePosition: function(){
			return this.$store.state.mousePosition
		}, 
	},
	methods: {
		updateMousePosition: function(event){
			this.$store.commit("updateMousePostion", {x: event.clientX, y: event.clientY })
		}, 
		escPressed: function(){
			console.log("esc")
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

<style lang="scss">

@import "./assets/sass/app.scss";

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	padding: 12px;
}

</style>
