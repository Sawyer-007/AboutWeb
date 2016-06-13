<template>
	<li>
		<div class="view" v-show="!isEditing">
			<input type="checkbox" v-model="attr.completed">
			<label @dblclick="editTodo">{{attr.title}}</label>
			<button @click="removeTodo" >x</button>
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