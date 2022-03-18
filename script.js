"use strict"

var inputText = document.getElementById("input-text")
var addBtn = document.getElementById("add")
var todo = document.getElementById("todo")
var memoryList = [];


addBtn.addEventListener("click", function () {
    var text = inputText.value;
    if (text) {
        populate(text)

        // add to memory list
        memoryList.push(text);
        localStorage.setItem("todo-list", memoryList)
    }
});

// load data from local storage to memmory list array
if (localStorage.getItem("todo-list")) {
    memoryList = localStorage.getItem("todo-list").split(",");
    console.log(memoryList)
}

// load data from memory list to dom
if (memoryList.length) {
    for (var x of memoryList) {
        populate(x);
        console.log(x);
    }
}

function populate(text) {
    var newLi = document.createElement("li");
    newLi.classList.add("list-item");
    newLi.innerHTML =
        `
            <div class="text">${text}</div>
            <button class="remove">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;
    todo.prepend(newLi);
    inputText.value = "";

    // remove function
    var removeBtn = newLi.querySelector(".remove");
    removeBtn.addEventListener("click", function () {
        // removes from memoru
        var todo_index = 0;
        var parentNode = this.parentNode;
        while (parentNode.previousSibling != null) {
            todo_index++;
            parentNode = parentNode.previousSibling;
            console.log(todo_index)
        }

        memoryList.reverse().splice(todo_index, 1);
        localStorage.setItem("todo-list", memoryList.reverse());



        // remoes from dom
        this.parentNode.remove();



    })
}