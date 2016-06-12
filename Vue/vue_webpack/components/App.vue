<template>
	<div id="app" >
		<input type="text" placeholder="What's need to be done?">
		<ul>
			<item v-for="item in itemList"></item>
		</ul>
	</div>
</template>

<script>
	import Item from './Item.vue'
	export default {
		data () {
			return {
				itemList: [],
			}
		},
		components:{
			Item,
		},
	}
</script>