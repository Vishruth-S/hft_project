//adding new item
document
    .querySelector(".additem button")
    .addEventListener("click", function () {
        const taskName = document.querySelector(".additem input").value;
        if (taskName != "") {
            const itemStorage = localStorage.getItem("todo-items");
            console.log(itemStorage);

            if (itemStorage == null) {
                console.log("inside if");
                saveItems([{ task: taskName, status: 0 }]);
            } else {
                console.log("inside else");

                const itemArr = JSON.parse(itemStorage);
                itemArr.push({ task: taskName, status: 0 });
                saveItems(itemArr);
            }
            fetchItems();
        }

        document.getElementById("input").value = "";
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
            if (itemArr[i].status == 1) status = "class=done";

            newItemHtml += `<li data-itemindex="${i}" ${status}>
        <span class="item"> ${itemArr[i].task}</span>
        <div>
          <span class="itemComplete">        
            <span class="material-icons tick">task_alt</span>
          </span>
          <span class="itemDelete">
            <span class="material-icons">delete</span>
          </span>
        </div>
      </li>`;
        }

        itemList.innerHTML = newItemHtml;

        //adding event listerners
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
    } catch (e) { }
}

function itemComplete(index) {
    const itemStorage = localStorage.getItem("todo-items");
    const itemArr = JSON.parse(itemStorage);

    itemArr[index].status = 1;

    saveItems(itemArr);

    document.querySelector(
        'ul.todo-items li[data-itemindex="' + index + '"]'
    ).className = "done";
}

function itemDelete(index) {
    const itemStorage = localStorage.getItem("todo-items");
    const itemArr = JSON.parse(itemStorage);

    itemArr.splice(index, 1);
    saveItems(itemArr);

    //   document
    //     .querySelector('ul.todo-items li[data-itemindex="' + index + '"]')
    //         .remove();

    fetchItems();
}

function saveItems(obj) {
    console.log("saving item");
    const itemJson = JSON.stringify(obj);

    localStorage.setItem("todo-items", itemJson);
}

fetchItems();
