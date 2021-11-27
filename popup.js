document.getElementById("todo-form").style.display = "none";

if (document.getElementById("compName") == "undefined")
  document.getElementById("compName").style.display = "none";
if (document.getElementById("due") == "undefined")
  document.getElementById("due").style.display = "none";

//displaying Active tab content
document.querySelectorAll(".tablinks").forEach((element) => {
  element.addEventListener("click", function () {
    // Get all elements with class="tabcontent" and hide them
    var tabcontent = document.getElementsByClassName("tabcontent");
    for (var i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    var tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(element.classList[1]).style.display = "block";
    element.className += " active";
  });
});

function calcRemainingTime(end_time) {
  let end = new Date(end_time);
  let curr = new Date();
  let t = end - curr;

  if (t >= 0) {
    let days = Math.floor(t / (1000 * 60 * 60 * 24));
    let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    let obj = {
      d: days,
      h: hours,
      m: mins,
    };
    return obj;
  }
}

//adding new TODO item
document.getElementById("todoButton").addEventListener("click", function () {
  document.getElementById("todo-form").style.display = "block";
  const taskName = document.getElementById("todoInput_taskName").value;
  const company = document.getElementById("todoInput_company").value;
  const due = document.getElementById("todoInput_due").value;

  if (taskName != "" && company != "" && due != "") {
    var todoList = JSON.parse(localStorage.getItem("todo-items-list"));
    if (todoList == null) {
      todoList = [];
    }

    let rt = calcRemainingTime(due);

    var newTodoObj = {
      task: taskName,
      company: company.length > 0 ? company : "",
      due: due.length > 0 ? due : "",
      days: rt.d,
      hrs: rt.h,
      mins: rt.m,
      status: 0,
    };
    todoList.push(newTodoObj);
    localStorage.setItem("todo-items-list", JSON.stringify(todoList));
    fetchItems();
  }

  document.getElementById("todoInput_taskName").value = "";
  document.getElementById("todoInput_company").value = "";
  document.getElementById("todoInput_due").value = "";
});

//fetches all todo items from local storage
function fetchItems() {
  var todoItemList = JSON.parse(localStorage.getItem("todo-items-list"));
  if (todoItemList == null) {
    todoItemList = [];
  }

  // add to list
  let list = document.querySelector("ul.todo-items-list");
  list.innerHTML = "";
  var newItemHTML = "";
  todoItemList.forEach((todo, i) => {
    var status = "";
    if (todo.status == 1) status = "class=done";

    newItemHTML += `<li data-itemindex="${i}" ${status}>
        <p class="item"> ${todo.task}</p>        
        <p class="item" id=""compName"> ${todo.company}</p>  
        <p>${todo.days} days ${todo.hrs} hours ${todo.mins} mins</p>                              
                                         
        <div>
          <span class="itemComplete">        
            <span class="material-icons tick">task_alt</span>
          </span>
          <span class="itemDelete">
            <span class="material-icons">delete</span>
          </span>
        </div>
      </li>`;
  });
  list.innerHTML = newItemHTML;

  //adding event listerners to save, delte buttons
  var completelist = document.querySelectorAll(".itemComplete");
  for (var i = 0; i < completelist.length; i++) {
    completelist[i].addEventListener("click", function () {
      var index = this.parentNode.parentNode.dataset.itemindex;
      itemComplete(index);
    });
  }

  var deletelist = document.querySelectorAll(".itemDelete");
  for (var i = 0; i < deletelist.length; i++) {
    deletelist[i].addEventListener("click", function () {
      var index = this.parentNode.parentNode.dataset.itemindex;
      itemDelete(index, "todo-items-list");
    });
  }
}

//function to handle onclick event of done button in todolist
function itemComplete(index) {
  const itemStorage = localStorage.getItem("todo-items-list");
  const itemArr = JSON.parse(itemStorage);

  itemArr[index].status = 1;

  saveItems(itemArr);

  document.querySelector(
    'ul.todo-items-list li[data-itemindex="' + index + '"]'
  ).className = "done";
}

fetchItems();

//-------------------BOOKMARK------------------------//

function fetchAll() {
  // retreive data
  var retrievedData = JSON.parse(localStorage.getItem("bookmarks"));
  if (retrievedData == null) {
    retrievedData = [];
  }

  // add to list
  let list = document.getElementById("bookmark-list");
  list.innerHTML = "";
  var newItemHTML = "";
  retrievedData.forEach((el, idx) => {
    newItemHTML += `<li data-itemindex=${idx}>
            <span><a href=${el.url}>${el.name}</a></span>
            <span class="item-delete">delete</span>
            </li>`;
  });
  list.innerHTML = newItemHTML;
}

// add new bookmark item
document
  .getElementById("bookmarkButton")
  .addEventListener("click", function () {
    var retrievedData = JSON.parse(localStorage.getItem("bookmarks"));
    if (retrievedData == null) {
      retrievedData = [];
    }

    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      let url = tabs[0].url;
      let name = document.getElementById("bookmarkInput").value;
      let obj = {
        name: name.length > 0 ? name : url,
        url: url,
      };
      retrievedData.push(obj);
      localStorage.setItem("bookmarks", JSON.stringify(retrievedData));
      fetchAll();
    });
  });

fetchAll();

//---------------------------NOTES---------------------------------//

//adding new note item
document.getElementById("noteButton").addEventListener("click", function () {
  const note = document.getElementById("noteInput").value;

  if (note != "") {
    var noteList = JSON.parse(localStorage.getItem("note-list"));
    if (noteList == null) {
      noteList = [];
    }
    var newNote = {
      note: note,
    };
    noteList.push(newNote);
    localStorage.setItem("note-list", JSON.stringify(noteList));
    fetchNoteItems();
  }

  document.getElementById("noteInput").value = "";
});

//fetches all note items from local storage
function fetchNoteItems() {
  var notesList = JSON.parse(localStorage.getItem("note-list"));
  if (notesList == null) {
    notesList = [];
  }
  // add to list
  let list = document.querySelector("ul.note-list");
  list.innerHTML = "";
  var newItemHTML = "";
  notesList.forEach((noteitem, i) => {
    newItemHTML += `<li data-itemindex="${i}" >
        <p class="item"> ${noteitem.note}</p> 
        <span class="NoteitemDelete">
          <span class="material-icons">delete</span>
        </span>
      </li>`;
  });

  list.innerHTML = newItemHTML;

  //adding event listerners to save, delte buttons
  var deletelist = document.querySelectorAll(".NoteitemDelete");
  for (var i = 0; i < deletelist.length; i++) {
    deletelist[i].addEventListener("click", function () {
      var index = this.parentNode.parentNode.dataset.itemindex;
      itemDelete(index, "note-list");
    });
  }
}

//function to handle onclick event of delete button
function itemDelete(index, storageName) {
  const itemStorage = localStorage.getItem(storageName);
  const itemArr = JSON.parse(itemStorage);

  itemArr.splice(index, 1);
  saveItems(itemArr, storageName);

  if (storageName == "note-list") fetchNoteItems();
  else fetchItems();
}

function saveItems(obj, storageName) {
  const itemJson = JSON.stringify(obj);

  localStorage.setItem(storageName, itemJson);
}

fetchNoteItems();
