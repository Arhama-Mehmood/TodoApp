function addTodo() {

    var todoInput = document.getElementById("todoInput");

    if (todoInput.value) {
        var liELement = document.createElement("li");

        var ulElement = document.getElementById("items_data");

        liELement.setAttribute("class", "todoList");
        ulElement.setAttribute("class", "todoUl");

        //   create delete button element with DOM

        var DelbtnElement = document.createElement("button");

        var DelbtnText = document.createTextNode("DELETE");

        DelbtnElement.setAttribute("onclick", "deleteSingleTodo(this)");

        DelbtnElement.setAttribute("class", "deletebtn");

        DelbtnElement.appendChild(DelbtnText);

        //   create Edit button element with DOM

        var EditbtnElement = document.createElement("button");

        var EditbtnText = document.createTextNode("EDIT");

        EditbtnElement.appendChild(EditbtnText);

        EditbtnElement.setAttribute("onclick", "EditSingleTodo(this)");

        EditbtnElement.setAttribute("class", "Editbtn");

        var liText = document.createTextNode(todoInput.value);

        liELement.appendChild(liText);
        ulElement.appendChild(liELement);
        liELement.appendChild(DelbtnElement);
        liELement.appendChild(EditbtnElement);
        console.log(liELement);

        todoInput.value = "";
    }}
//     if (todoInput.value==""){
//         alert("Enter task first, before pressing Enter!")
//     }
    
// }

// Add event listener to input field for 'Enter' key
var todoInput = document.getElementById("todoInput");

todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTodo();
    }
});

function deleteSingleTodo(e) {
    e.parentNode.remove();
}