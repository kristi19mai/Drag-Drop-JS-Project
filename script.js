const dragItemLists = Array.from(document.querySelectorAll(".drag-item-list"));
const addBtns = document.querySelectorAll(".add-btn:not(.solid)");
const saveItemBtns = document.querySelectorAll(".solid");
const addItemContainers = document.querySelectorAll(".add-container");
const addItems = document.querySelectorAll(".add-item");

let dragItems = [];
let currentDragItem;

let backlogArray = [];
let progressArray = [];
let completeArray = [];
let onHoldArray = [];

let list = {};

function storeData() {
  localStorage.setItem("list", JSON.stringify(list));
}

function getStoredData() {
  if (!localStorage.getItem("list")) {
    list = {
      backlog: [
        "Power English",
        "Streamline English",
        "Yoga Kriya",
        "Flying Balls Project",
      ],
      progress: [
        "Lightgreen English Playlist",
        "Kanban Board Project",
        "OOP Course",
      ],
      complete: ["Orange English Playlist"],
      onhold: ["Eating Sweets"],
    };
  } else {
    list = JSON.parse(localStorage.getItem("list"));
  }
  backlogArray = list.backlog;
  progressArray = list.progress;
  completeArray = list.complete;
  onHoldArray = list.onhold;
  updateDOM();
}

function setContentEditable(e) {
  e.target.setAttribute("contenteditable", "true");
}

function removeContentEditable(e) {
  e.target.setAttribute("contenteditable", "false");
  updateArrays();
}

function updateDOM() {
  for (key in list) {
    let element = document.getElementById(key);
    element.innerHTML = "";
    list[key].forEach((item) => {
      let li = document.createElement("li");
      li.classList.add("drag-item");
      li.setAttribute("ondragstart", "drag(event)");
      li.setAttribute("onclick", "setContentEditable(event)");
      li.setAttribute("onfocusout", "removeContentEditable(event)");
      // li.setAttribute("contenteditable", "true");
      li.draggable = true;
      li.textContent = item;
      element.appendChild(li);
    });
  }
}

function drag(e) {
  currentDragItem = e.target;
}

// When Item Enters Column Area
function dragEnter(column) {
  dragItemLists[column].classList.add("over");
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  // Remove Background Color/Padding
  dragItemLists.forEach((column) => {
    column.classList.remove("over");
  });
  // Add Item to Column
  e.target.appendChild(currentDragItem);
  updateArrays();
}

function addNewItem(column) {
  let addedLi = document.createElement("li");
  addedLi.classList.add("drag-item");
  addedLi.setAttribute("ondragstart", "drag(event)");
  // addedLi.setAttribute("contenteditable", "true");
  addedLi.draggable = true;
  addedLi.textContent = addItemContainers[column].textContent;
  dragItemLists[column].appendChild(addedLi);
  updateArrays();
}

// Show AddItem Input Box
function showInputBox(column) {
  addBtns[column].style.visibility = "hidden";
  saveItemBtns[column].style.display = "flex";
  addItemContainers[column].style.display = "flex";
}

// Hide AddItem Input Box
function hideInputBox(column) {
  addNewItem(column);
  addBtns[column].style.visibility = "visible";
  saveItemBtns[column].style.display = "none";
  addItemContainers[column].style.display = "none";
}

// update Arrays and List obj
function updateArrays() {
  backlogArray = [];
  progressArray = [];
  completeArray = [];
  onHoldArray = [];
  let backlogItems = dragItemLists[0].children;
  for (let i = 0; i < backlogItems.length; i++) {
    if (backlogItems[i].textContent.trim()) {
      backlogArray.push(backlogItems[i].textContent.trim());
    }
  }
  let progressItems = dragItemLists[1].children;
  for (let i = 0; i < progressItems.length; i++) {
    if (progressItems[i].textContent.trim()) {
      progressArray.push(progressItems[i].textContent.trim());
    }
  }
  let completeItems = dragItemLists[2].children;
  for (let i = 0; i < completeItems.length; i++) {
    if (completeItems[i].textContent.trim()) {
      completeArray.push(completeItems[i].textContent.trim());
    }
  }
  let onHoldItems = dragItemLists[3].children;
  for (let i = 0; i < onHoldItems.length; i++) {
    if (onHoldItems[i].textContent.trim()) {
      onHoldArray.push(onHoldItems[i].textContent.trim());
    }
  }

  list.backlog = backlogArray;
  list.progress = progressArray;
  list.complete = completeArray;
  list.onhold = onHoldArray;
  storeData();
  updateDOM();
}

window.onload = getStoredData();
