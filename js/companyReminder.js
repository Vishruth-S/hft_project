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

function calcRemainingTime(end_time) {
  let end = new Date(end_time);
  let curr = new Date();
  let t = end - curr;

  console.log(end - curr);

  if (t >= 0) {
    let days = Math.floor(t / (1000 * 60 * 60 * 24));
    let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    console.log(days, hours, mins);

    var timeLifet;
    if (days > 1)
      timeLifet = `<span class="material-icons">notifications</span><p>${days} days left</p>`;
    else if (days == 1)
      timeLifet = `<span class="material-icons">notification_important</span><p>tomorrow</p>`;
    else if (days == 0)
      timeLifet = `<span class="material-icons">notification_important</span><p>${hours} hrs left</p>`;

    return timeLifet;
  }
}

function monthName(date) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const d = new Date(date);
  return monthNames[d.getMonth()];
}
//adding new TODO item
document.getElementById("todoButton").addEventListener("click", function () {
  var x = document.getElementById("todo-form");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  // document.getElementById("todo-form").style.display = "block";
  const taskName = document.getElementById("todoInput_taskName").value;
  const company = document.getElementById("todoInput_company").value;
  const due = document.getElementById("todoInput_due").value;

  if (taskName != "") {
    var todoList = JSON.parse(localStorage.getItem("company-reminders-list"));
    if (todoList == null) {
      todoList = [];
    }

    var newTodoObj = {
      task: taskName,
      company: company.length > 0 ? company : "",
      due: due.length > 0 ? due : "",
      status: 0,
    };
    todoList.push(newTodoObj);
    localStorage.setItem("company-reminders-list", JSON.stringify(todoList));
    fetchItems();
  }

  document.getElementById("todoInput_taskName").value = "";
  document.getElementById("todoInput_company").value = "";
  document.getElementById("todoInput_due").value = "";
  // document.getElementById("todo-form").style.display = "none";
});

//fetches all todo items from local storage
function fetchItems() {
  var todoItemList = JSON.parse(localStorage.getItem("company-reminders-list"));
  if (todoItemList == null) {
    todoItemList = [];
  }

  // add to list
  let list = document.querySelector("ul.company-reminder-list");
  list.innerHTML = "";
  var newItemHTML = "";
  todoItemList.forEach((todo, i) => {
    const d = new Date(todo.due);
    var date = ("0" + d.getDate()).slice(-2);

    newItemHTML += `<li data-itemindex="${i}" ${status}>
        <div class="due">
            <div>
              <div id="date">${date}</div>
              <p>${monthName(todo.due)}<p>
            </div>
        </div>
        <div class="cardBody">
          <div class="job">
              <p id="position">${todo.task}</p>
              <p id="compName">${todo.company}</p>
          </div>
          <div class="bottom">
            <div class="timeLeft">${calcRemainingTime(todo.due)}</div>
            <span class="itemDelete">
                <span class="material-icons">delete</span>
            </span>
          </div>  
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
      todo_itemDelete(index);
    });
  }

  document.getElementById("todoInput_due").min =
    new Date().getFullYear() +
    "-" +
    parseInt(new Date().getMonth() + 1) +
    "-" +
    new Date().getDate();
}

//function to handle onclick event of save/done button
function itemComplete(index) {
  const itemStorage = localStorage.getItem("company-reminders-list");
  const itemArr = JSON.parse(itemStorage);

  itemArr[index].status = 1;

  saveItems(itemArr);

  document.querySelector(
    'ul.todo-items-list li[data-itemindex="' + index + '"]'
  ).className = "done";
}

//function to handle onclick event of delete button
function todo_itemDelete(index) {
  const itemStorage = localStorage.getItem("company-reminders-list");
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

  localStorage.setItem("company-reminders-list", itemJson);
}

fetchItems();
