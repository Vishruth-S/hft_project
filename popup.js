document.getElementById("todo-form").style.display = "none";

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

//adding new TODO item
document.getElementById("todoButton").addEventListener("click", function () {
  document.getElementById("todo-form").style.display = "block";
  const taskName = document.querySelector(".addNewTodoitem input").value;

  if (taskName != "") {
    var todoList = JSON.parse(localStorage.getItem("todo-items-list"));
    if (todoList == null) {
      todoList = [];
    }

    var newTodoObj = {
      task: taskName,
      status: 0,
    };
    todoList.push(newTodoObj);
    localStorage.setItem("todo-items-list", JSON.stringify(todoList));
    fetchItems();
  }

  document.getElementById("todoInput").value = "";
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
        <span class="item"> ${todo.task}</span>
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
      itemDelete(index);
    });
  }
}

//function to handle onclick event of save/done button
function itemComplete(index) {
  const itemStorage = localStorage.getItem("todo-items-list");
  const itemArr = JSON.parse(itemStorage);

  itemArr[index].status = 1;

  saveItems(itemArr);

  document.querySelector(
    'ul.todo-items-list li[data-itemindex="' + index + '"]'
  ).className = "done";
}

//function to handle onclick event of delete button
function itemDelete(index) {
  const itemStorage = localStorage.getItem("todo-items-list");
  const itemArr = JSON.parse(itemStorage);

  itemArr.splice(index, 1);
  saveItems(itemArr);

  //   document
  //     .querySelector('ul.todo-items-list li[data-itemindex="' + index + '"]')
  //         .remove();

  fetchItems();
}

function saveItems(obj) {
  const itemJson = JSON.stringify(obj);

  localStorage.setItem("todo-items-list", itemJson);
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
