// Add Todo
function addTodo(event) {
    event.preventDefault();

    var todoInput = document.getElementById("todoInput");
    var ulElement = document.getElementById("items_data");

    if (todoInput.value.trim() !== "") {
        var liElement = document.createElement("li");
        liElement.className = "todo-item";

        // Checkbox
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "todo-checkbox";
        checkbox.onclick = function() {
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
        spanElement.textContent = todoInput.value;
        spanElement.className = "todo-text";

        // Edit button
        var editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "Editbtn";
        editBtn.onclick = function () {
            startEditing(spanElement, editBtn);
        };

        // Delete button
        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "deletebtn";
        deleteBtn.onclick = function () {
            liElement.remove();
        };

        // Button container
        var btnContainer = document.createElement("div");
        btnContainer.className = "btn-container";
        btnContainer.appendChild(editBtn);
        btnContainer.appendChild(deleteBtn);

        liElement.appendChild(checkbox);
        liElement.appendChild(spanElement);
        liElement.appendChild(btnContainer);

        ulElement.appendChild(liElement);

        todoInput.value = ""; // clear input
    }
}

// Start editing
function startEditing(spanElement, editBtn) {
    var inputBox = document.createElement("input");
    inputBox.type = "text";
    inputBox.value = spanElement.textContent;
    inputBox.className = "edit-input";

    spanElement.replaceWith(inputBox);

    editBtn.textContent = "Update";
    editBtn.onclick = function () {
        finishEditing(inputBox, editBtn);
    };
}

// Finish editing
function finishEditing(inputBox, editBtn) {
    var spanElement = document.createElement("span");
    spanElement.textContent = inputBox.value;
    spanElement.className = "todo-text";

    inputBox.replaceWith(spanElement);

    editBtn.textContent = "Edit";
    editBtn.onclick = function () {
        startEditing(spanElement, editBtn);
    };
}

// Event listener
var todoForm = document.getElementById("todoForm");
todoForm.addEventListener("submit", addTodo);
