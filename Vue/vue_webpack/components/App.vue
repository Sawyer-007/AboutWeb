<style>
	.app {
		position: relative;
		margin-top: 10%;
		margin-left: 25%;
		width: 50%;
		border-radius: 20px 20px 20px 20px;
		overflow: hidden;
	}
	.app-header {
		background: #d2edf4;
		background-image: linear-gradient(to bottom, #d0edf5, #e1e5f0 100%);
		padding: 20px 15px 15px 15px;
		position: relative;
	}
	.app-header input {
		border: none;
		background: rgba(0,0,0,0);
		outline: none;
		height: 30px;
		width: 100%;
		font-size: 1em;
	}
	.app-todo {
		position: relative;
		background: #ffffff;
	}
	.app-todo ul {
		margin: 0;
		list-style: none;
		padding: 0;
	}
	.app-todo-btn-group {
		position: relative;
		height: 50px;
		line-height: 50px;
		text-align: center;
	}
	.app-todo-btn {
		display: inline-block;
		background: #ffffff;
		color: #ff3b2f;
		border: 1px solid #ff3b2f;
		border-radius: 4px;
		outline: none;
	}
</style>
<template>
	<div id="app" class="app">
		<div class="app-header">
			<h2>Todo List</h2>
			<input type="text"
						 placeholder="What's need to be done?"
						 @keyup.enter="addTodo"
						 v-model="newTodo">
		</div>

		<div class="app-todo" v-show="todoList.length">
			<ul>
				<item v-for="todo in filteredTodos" :attr="todo" ></item>
			</ul>
			<div class="app-todo-btn-group">
				<button class="app-todo-btn" @click="changeVisibility('all')">ALL</button>
				<button class="app-todo-btn" @click="changeVisibility('active')">ACTIVE</button>
				<button class="app-todo-btn" @click="changeVisibility('completed')">COMPLETED</button>
			</div>
		</div>
	</div>
</template>

<script>

	var filters = {
		all: function (todos) {
			return todos;
		},
		active: function (todos) {
			return todos.filter(function (todo) {
				return !todo.completed;
			});
		},
		completed: function (todos) {
			return todos.filter(function (todo) {
				return todo.completed;
			});
		}
	};

	import Item from './Item.vue'
	import todoStorage from '../js/store.js'

	export default {
		data () {
			return {
				todoList: todoStorage.fetch(),
				newTodo: '',
				visibility: 'all'
			}
		},
		components:{
			Item,
		},
		computed: {
			filteredTodos () {
				return filters[this.visibility](this.todoList);
			}
		},
		watch: {
			todoList: {
				handler (todoList) {
					todoStorage.save(todoList);
				},
				deep: true
			}
		},
		methods: {
			addTodo () {
				var value = this.newTodo && this.newTodo.trim();
				if (!value) {
					return;
				}
				this.todoList.push({title: value, completed: false});
				this.newTodo = '';
			},
			changeVisibility (visibility) {
				this.visibility = visibility;
			}
		},
		events: {
			itemRemove (todo) {
				this.todoList.$remove(todo);
			}
		}
	}
</script>