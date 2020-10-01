<template>
	<div id="app" v-on:mousemove="updateMousePosition">
		<!-- <p>mouseposition: {{mousePosition }}</p> -->
		<!-- <div id="nav">
			<router-link to="/">Home</router-link> |
			<router-link to="/about">About</router-link>
		</div> -->
		{{updateMousePos}}
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
		updateMousePos: function(){
			return this.$store.state.updateMousePos
		}
	},
	methods: {
		updateMousePosition: function(event){
			if(this.$store.state.updateMousePos)
				this.$store.commit("updateMousePostion", {x: event.clientX, y: event.clientY })
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
