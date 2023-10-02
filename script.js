const mainInput = document.querySelector("#mainInput");
const addBtn = document.querySelector("#addBtn");
const validator = document.querySelector("#validator");
const clearMessage = document.querySelector("#clearMessage");
const tableBody = document.querySelector("#tableBody");
const clearAll = document.querySelector(".ClearAll-icon");
const toDoTable = document.querySelector("#toDoTable");

function saveAll() {
  const allTodos = JSON.stringify(tableBody.innerHTML); 
  localStorage.setItem("MyToDos", allTodos);
}

function addTodo() {
  if (mainInput.value.trim() !== "") {
    const list = document.createElement("tr");
    list.innerHTML = `<td>${mainInput.value}</td>
      <td>
          <button class="btn btn-success mx-1 edit-btn" onclick="editTask(this)">
            <i class="fa-regular fa-pen-to-square edit-icon"></i>
          </button>
          <button class="btn btn-danger mx-1 del-btn rem-btn" onclick="removeToDo(this)">
            <i class="fas fa-trash"></i>
          </button>
      
      </td>`;
    tableBody.appendChild(list);
    mainInput.value = "";
    mainInput.classList.remove("redBorder");
    validator.textContent = "";
    clearMessage.style.display = "none";
    saveAll();
  } else {
    mainInput.classList.add("redBorder");
    validator.textContent = "";
  }
}

function removeToDo(button) {
  const row = button.closest("tr");
  row.remove();
  saveAll();
}

function clearAllTodos() {
  if (tableBody.children.length === 0) {
    clearMessage.style.display = "block";
    mainInput.classList.add("redBorder");
  } else {
    tableBody.innerHTML = "";
    clearMessage.style.display = "none";
    mainInput.classList.remove("redBorder");
    saveAll();
  }
}

function editTask(button) {
  const row = button.closest("tr");
  const taskCell = row.querySelector("td:first-child");
  const editBtn = row.querySelector(".edit-icon");

  if (taskCell.contentEditable === "false") {
    editBtn.classList.remove("fa-pen-to-square");
    editBtn.classList.add("fa-check-square"); 
    taskCell.contentEditable = true;
    const textNode = taskCell.firstChild;
    const range = document.createRange();
    const sel = window.getSelection();
    range.setStart(textNode, textNode.length);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    taskCell.focus();
  } else {
    editBtn.classList.remove("fa-check-square");
    editBtn.classList.add("fa-pen-to-square");
    taskCell.contentEditable = false;
    saveAll();
  }
}

function loadToDos() {
  const allTodos = JSON.parse(localStorage.getItem("MyToDos"));
  if (allTodos) {
    tableBody.innerHTML = allTodos;
  }
}

loadToDos();

