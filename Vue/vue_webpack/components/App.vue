<template>
	<div id="app" >
		<s-article :attr="attr" ></s-article>
	</div>
</template>

<script>
	import sArticle from './sArticle.vue'
	export default {
		components:{
			sArticle,
		},
		props: ['attr']
	}
</script>