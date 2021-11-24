// Called when popup.html is loaded.
function fetchAll() {
    // retreive data
    var retrievedData = JSON.parse(localStorage.getItem('savedJobs'))
    if (retrievedData == null) {
        retrievedData = []
    }

    // add to list
    let list = document.getElementById('job-tasks')
    list.innerHTML = ""
    var newItemHTML = "";
    retrievedData.forEach((el, idx) => {
        newItemHTML +=
            `<li data-itemindex=${idx}>
            <span>${el.name} - ${el.duedate}</span>
            <span class="item-delete">delete</span>
            </li>`
    });
    list.innerHTML = newItemHTML

    var deletelist = document.querySelectorAll(".item-delete");
    for (var i = 0; i < deletelist.length; i++) {
        deletelist[i].addEventListener("click", function () {
            var index = this.parentNode.dataset.itemindex;
            itemDelete(index);
        });
    }
}

function itemDelete(index) {
    const itemStorage = localStorage.getItem("savedJobs");
    const itemArr = JSON.parse(itemStorage);

    itemArr.splice(index, 1);
    saveItems(itemArr);

    fetchAll()
}

// Click save button
document.getElementById('new-job-save').onclick = () => {
    var retrievedData = JSON.parse(localStorage.getItem('savedJobs'))
    if (retrievedData == null) {
        retrievedData = []
    }

    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        let url = tabs[0].url;
        let name = document.getElementById('new-job-title').value
        let duedate = document.getElementById('new-job-date').value
        let obj = {
            name: name.length > 0 ? name : url,
            duedate: duedate
        }
        retrievedData.push(obj)
        localStorage.setItem("savedJobs", JSON.stringify(retrievedData));
        fetchAll();
    });
}

function saveItems(obj) {
    const itemJson = JSON.stringify(obj);
    localStorage.setItem("savedJobs", itemJson);
}

fetchAll()