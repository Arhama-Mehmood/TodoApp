var firebaseConfig = {
    apiKey: "AIzaSyBvzihjjcQqLTCL7DZoDLHO55BCTOMtkj8",
    authDomain: "todo-app-cbe54.firebaseapp.com",
    databaseURL: "https://todo-app-cbe54-default-rtdb.firebaseio.com",
    projectId: "todo-app-cbe54",
    storageBucket: "todo-app-cbe54.firebasestorage.app",
    messagingSenderId: "927942377653",
    appId: "1:927942377653:web:1d37c553188374bde47efc"
};

var app = firebase.initializeApp(firebaseConfig);

var todoForm = document.getElementById("todoForm");
todoForm.onsubmit = addTodo;


function addTodo(pre) {
    pre.preventDefault();

    var todoInput = document.getElementById("todoInput");

    if (todoInput.value.trim() === "") {
        alert("Input is required!");
        return;
    }

    var id = firebase.database().ref("todos").push().key;

    var obj = {
        todo_value: todoInput.value,
        id: id,
    };

    firebase.database().ref(`todos/${id}`).set(obj);
    todoInput.value = "";
}

// Load Todos from Firebase
firebase.database().ref("todos").on("child_added", function (data) {
    console.log("New Todo Added:", data.val()); // console log todo object
    createTodoElement(data.val());
});

function createTodoElement(todoObj) {
    var ulElement = document.getElementById("items_data");

    var liElement = document.createElement("li");
    liElement.className = "todo-item";
    liElement.setAttribute("id", todoObj.id);

    // Checkbox
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo-checkbox";
    checkbox.onclick = function () {
        if (checkbox.checked) {
            spanElement.style.textDecoration = "line-through";
            spanElement.style.opacity = "0.6";
        } else {
            spanElement.style.textDecoration = "none";
            spanElement.style.opacity = "1";
        }
    };

    // Text
    var spanElement = document.createElement("span");
    spanElement.textContent = todoObj.todo_value;
    spanElement.className = "todo-text";

    // Edit button
    var editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "Editbtn";
    editBtn.setAttribute("id", todoObj.id);
    editBtn.onclick = function () {
        startEditing(spanElement, editBtn);
    };

    // Delete button
    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "deletebtn";
    deleteBtn.setAttribute("id", todoObj.id);
    deleteBtn.onclick = function () {
        deleteSingleTodo(deleteBtn);
    };

    var btnContainer = document.createElement("div");
    btnContainer.className = "btn-container";
    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(deleteBtn);

    liElement.appendChild(checkbox);
    liElement.appendChild(spanElement);
    liElement.appendChild(btnContainer);

    ulElement.appendChild(liElement);
}

function deleteSingleTodo(e) {
    var li = document.getElementById(e.id);
    li.remove();
    firebase.database().ref(`todos/${e.id}`).remove();
}

function startEditing(spanElement, editBtn) {
    var inputBox = document.createElement("input");
    inputBox.type = "text";
    inputBox.value = spanElement.textContent;
    inputBox.className = "edit-input";

    spanElement.replaceWith(inputBox);

    editBtn.textContent = "Done";
    editBtn.onclick = function () {
        finishEditing(inputBox, editBtn);
    };
}

function finishEditing(inputBox, editBtn) {
    var spanElement = document.createElement("span");
    spanElement.textContent = inputBox.value;
    spanElement.className = "todo-text";

    inputBox.replaceWith(spanElement);

    var id = editBtn.getAttribute("id");

    var updatedObj = {
        todo_value: spanElement.textContent,
        id: id,
    };

    firebase.database().ref(`todos/${id}`).set(updatedObj);

    editBtn.textContent = "Edit";
    editBtn.onclick = function () {
        startEditing(spanElement, editBtn);
    };
}

function deleteAllTodos() {
    document.getElementById("items_data").innerHTML = "";  
    firebase.database().ref("todos").remove()
  }
  