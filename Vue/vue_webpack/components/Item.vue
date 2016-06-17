<style>
	.item {
		position: relative;
		padding: 15px;
		height: 19px;
		font-size: 1.125em;
		border-bottom: 1px solid #dfdfdf;
	}
	.item input {

	}
	.item-remove {
		position: absolute;
		right: 20px;
		background: #ffffff;
		border: none;
		outline: none;
		font-size: 1.25em;
	}
	.item-toggle {
		position: relative;
		display: inline-block;
		border: 1px solid #8e8e8e;
		border-radius: 50%;
		height: 24px;
		width: 24px;

		text-align: center;
	}
	.item-toggle span {
		line-height: 24px;
		color: #5cb85c;
	}
	.item-view {

	}
	.item-text {

	}
	.item-text-finish {
		text-decoration: line-through;
		color: #8e8e8e;
	}

</style>
<template>
	<li class="item">
		<div class="item-view" v-show="!isEditing">
			<div class="item-toggle" @click="finishToggle">
				<span class="icon-ok" v-show="attr.completed"></span>
			</div>
			<span class="item-text" :class="{'item-text-finish': attr.completed}" @dblclick="editTodo">{{attr.title}}</span>
			<button class="item-remove" @click="removeTodo" >x</button>
		</div>
		<input type="text" 
		v-model="attr.title"
		v-show="isEditing"
		v-todo-focus="isEditing"
		@blur="doneEdit"
		@keyup.enter="doneEdit"
		@keyup.esc="cancelEdit">
	</li>
</template>

<script>
	import Vue from 'vue'
	export default {
		data () {
			return {
				text: 'hello',
				isEditing: false,
				beforeEditing: ''
			}	
		},
		props:['attr'],
		methods: {
			finishToggle () {
				this.attr.completed = !this.attr.completed;
			},
			editTodo () {
				this.isEditing = true;
				this.beforeEditing = this.attr.title;
			},
			removeTodo () {
				this.$dispatch('itemRemove', this.attr);
			},
			doneEdit () {
				this.isEditing = false;
				this.beforeEditing = '';
			},
			cancelEdit () {
				this.isEditing = false;
				this.attr.title = this.beforeEditing;
				this.beforeEditing = '';
			}

		},
		directives: {
	  	'todo-focus': function (value) {
			if (!value) {
				return;
			}
			var el = this.el;
			Vue.nextTick(function () {
				el.focus();
			});
		}
	}
}
</script>