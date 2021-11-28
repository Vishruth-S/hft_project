// document.getElementById("todoInput").style.display = "none";

// document.getElementById("todoButton").addEventListener("click", function () {
//   document.getElementById("todoInput").style.display = "block";
//   document.getElementById("todoInput").style.transition = "all 1s";
// });

//adding new item
document.getElementById("todoButton").addEventListener("click", function () {
  const taskName = document.getElementById("todoInput").value;

  if (taskName != "") {
    var todoList = JSON.parse(localStorage.getItem("todo-items"));
    if (todoList == null) {
      todoList = [];
    }

    var newTodoObj = {
      task: taskName,
      status: false,
    };
    todoList.push(newTodoObj);
    localStorage.setItem("todo-items", JSON.stringify(todoList));
    fetchItems();
  }

  document.getElementById("todoInput").value = "";
});

function fetchItems() {
  const itemList = document.querySelector("ul.todo-items");
  itemList.innerHTML = "";
  var newItemHtml = "";

  try {
    const itemStorage = localStorage.getItem("todo-items");
    const itemArr = JSON.parse(itemStorage);

    for (var i = 0; i < itemArr.length; i++) {
      var status = "";
      if (itemArr[i].status == true) status = "class=done";

      var doneIcon = status
        ? `<span class="itemDone" id="done">
            <span class="material-icons">check_circle_outline</span>      
          </span>`
        : `<span class="itemDone" id="notDone">
            <span class="material-icons">radio_button_unchecked</span>     
          </span>`;

      newItemHtml += `<li data-itemindex="${i}" ${status}>
        <span class="item"> ${itemArr[i].task}</span>
        <div>        
          ${doneIcon}
          <span class="itemDelete" id="delete">
            <span class="material-icons">delete</span>
          </span>
        </div>
      </li>`;
    }

    itemList.innerHTML = newItemHtml;

    //adding event listerners
    var completelist = document.querySelectorAll(".itemDone");
    for (var i = 0; i < completelist.length; i++) {
      completelist[i].addEventListener("click", function () {
        var index = this.parentNode.parentNode.dataset.itemindex;
        itemComplete(index);
      });
    }

    var completelist = document.querySelectorAll(".itemNotDone");
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
  } catch (e) {}
}

function itemComplete(index) {
  const itemStorage = localStorage.getItem("todo-items");
  const itemArr = JSON.parse(itemStorage);

  itemArr[index].status = !itemArr[index].status;
  saveItems(itemArr);
  fetchItems();
}

function itemDelete(index) {
  const itemStorage = localStorage.getItem("todo-items");
  const itemArr = JSON.parse(itemStorage);

  itemArr.splice(index, 1);
  saveItems(itemArr);

  fetchItems();
}

function saveItems(obj) {
  const itemJson = JSON.stringify(obj);

  localStorage.setItem("todo-items", itemJson);
}

fetchItems();
