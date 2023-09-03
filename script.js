
const listElement = document.getElementById("list");
const createButtonElement = document.getElementById("create");

//global variable
let todos = []; 

createButtonElement.addEventListener("click", CreateNewAdd);

//function will be called when we click add button
function CreateNewAdd() {
  //obj
  const item = {
    text: "",
    complete: false, //checkComplete
  };

  todos.unshift(item); //menambahkan item ke array todos dari depan

  // HTML untuk tugas baru dan input teks
  const { itemElement, inputElement } = CreateTodoElement(item);

  listElement.prepend(itemElement); //menambahkan ke element id list html di bagian atas

  //user can type
  inputElement.removeAttribute("disabled");
  inputElement.focus(); 

  Save();
}

//recreate this with javascript
/*<div class="item">
	<input type="checkbox" />
	<input 
		type="text" 
		value="Todo content di sini" 
		disabled />
	<div class="actions">
		<button class="material-icons">edit</button>
		<button class="material-icons remove-btn">remove_circle</button>
	</div>
</div> */


function CreateTodoElement(item) {
  //create div class item 
  const itemElement = document.createElement("div");
  itemElement.classList.add("item");

  //create checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = item.complete; //check if complete

  if (item.complete) {
    itemElement.classList.add("complete"); //item.complete in css will comes out
  }

  //create input type text
  const inputElement = document.createElement("input");
  inputElement.type = "text";
  inputElement.value = item.text; //mengarah ke value obj text ""
  inputElement.setAttribute("disabled", "");

  //create new div class actions
  const actionsElement = document.createElement("div");
  actionsElement.classList.add("actions");

  //edit buttom
  const editButtonElement = document.createElement("button");
  editButtonElement.classList.add("material-icons");
  editButtonElement.innerText = "edit"; 

  //remove button
  const removeButtonElement = document.createElement("button");
  removeButtonElement.classList.add("material-icons", "remove-btn");
  removeButtonElement.innerText = "remove_circle";

  //menambahkan edit and remove ke dalam action
  actionsElement.append(editButtonElement);
  actionsElement.append(removeButtonElement);

  //menambahkan checkbox, input text, dan actions ke dalam item
  itemElement.append(checkbox);
  itemElement.append(inputElement);
  itemElement.append(actionsElement);

  // EVENTS

  //for checkbox
  checkbox.addEventListener("change", () => {
    item.complete = checkbox.checked;

    if (item.complete) {
      itemElement.classList.add("complete");
    } else {
      itemElement.classList.remove("complete");
    }

    Save();
  });

  //for input type text = value yang diinput
  inputElement.addEventListener("input", () => {
    item.text = inputElement.value;
  });

  //for blur klik di luar input akan blur dan save di browser
  inputElement.addEventListener("blur", () => {
    inputElement.setAttribute("disabled", "");
    Save();
  });

  //for edit button
  editButtonElement.addEventListener("click", () => {
    inputElement.removeAttribute("disabled"); //bisa diedit setelah disabled dihapus
    inputElement.focus();
  });

//for remove button
  removeButtonElement.addEventListener("click", () => {
  const confirmDelete = confirm("Apakah Anda ingin menghapus tugas ini?"); //method confirm

  if (confirmDelete) {
      todos = todos.filter((x) => x.id != item.id); //akan menghapus item dari array todos
      itemElement.remove(); //tugas yang dihapus tidak lagi akan muncul
      Save();
  }
});


  return { itemElement, inputElement, editButtonElement, removeButtonElement };
}

//Fucntion for Save , load, dan diplay perubahan tasks

//save function to storage
function Save() {
  const save = JSON.stringify(todos);

  localStorage.setItem("myTodos", save);
}

//load function from local storage
function Load() {
  const data = localStorage.getItem("myTodos"); //get item from local storage

  if (data) {
    todos = JSON.parse(data);
  }
}

//display function
function DisplayTodos() {
  Load(); //call load untuk data task dimasukan ke dalam array todos

  //create for loop untuk parameter di CreateToDoElement function
  for (let i = 0; i < todos.length; i++) {
    const item = todos[i];

    const { itemElement } = CreateTodoElement(item); //reuse the fucntion createtodo

    listElement.append(itemElement);
  }
}

DisplayTodos(); //call the function 

