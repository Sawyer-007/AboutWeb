/*jshint unused:false */


var STORAGE_KEY = 'todos-sawyer';

export default {
	fetch: function () {
		return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
	},
	save: function (todos) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
	}
}
