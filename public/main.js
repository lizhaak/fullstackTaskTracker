'use strict';

$(document).ready(init);

function init() {
  getAllTodos();
  $('#submit').click(addItem);
}

function getAllTodos() {
  $.ajax({
    method: 'GET',
    url: '/todos',
    success: function(todos) {
      console.log('todos:', todos);

      var $todos = todos.map(function(todo) {
      var $todo = $('#template').clone();
      $todo.removeAttr('id');
      $todo.find('.desc').text(todo.newItem);
      $todo.find('.dueDate').text(todo.dueDate);
      $todo.find('input').prop('checked', todo.isComplete);
      return $todo;
      });

       $('#todoTable').append($todos);
    }
  });
}

function addItem() {
  var item = $('#desc').val();
  var dateInput = $('#dateValue').val();
  console.log('item:', item);
  console.log('dateInput:', dateInput);

  $.ajax({
    method: 'POST',
    url: '/description',
    data: {
      newItem: item,
      dueDate: dateInput
    },

    success: function(data) {
      console.log('data0:', data);
      var $todos = data.map(function(data) {
      var $todo = $('#template').clone();
      $todo.removeAttr('id');
      $todo.find('.desc').text(data.newItem);
      $todo.find('.dueDate').text(data.dueDate);
      $todo.find('input').prop('checked', data.isComplete);
      return $todo;
      });

       $('#todoTable').append($todos);

    },
    error: function(err) {
      console.log('err', err);
    }
  });
}