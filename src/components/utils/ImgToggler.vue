<template>
	<div class="img-toggle" v-on:click="toggle">
            <img :src="imageSrc1" alt="" :width="(imageWidth * 8) + 'px'" v-if="value">
            <img :src="imageSrc2" alt="" :width="(imageWidth * 8) + 'px'" v-else>
	</div>
</template>

<script>
export default {
	methods: {
            toggle:function (){
                  console.log('toggled')
                  this.$emit('toggled')
            }
      },
      computed: {
            
      },
	data () {
		return {
		}
	},
	props: {
		imageSrc1: String,
		imageSrc2: String,
		imageWidth: Number,
            value: Boolean,
	},
	mounted () {
	},
}
</script>

<style lang="scss" scoped>
      .img-toggle{
            margin-left: var(--cell-size);
      }
</style>
