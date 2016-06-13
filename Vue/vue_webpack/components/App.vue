<template>
	<div id="app" >
		<input type="text" 
			placeholder="What's need to be done?" 
			@keyup.enter="addTodo"
			v-model="newTodo">
		<div class="app-todo" v-show="todoList.length">
			<ul>
				<item v-for="todo in filteredTodos" :attr="todo" ></item>
			</ul>
			<div class="app-todo-btn">
				<button @click="changeVisibility('all')">ALL</button>
				<button @click="changeVisibility('active')">ACTIVE</button>
				<button @click="changeVisibility('completed')">COMPLETED</button>
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