// Called when popup.html is loaded.
function fetchAll() {
    // retreive data
    var retrievedData = JSON.parse(localStorage.getItem('bookmarks'))
    if (retrievedData == null) {
        retrievedData = []
    }

    // add to list
    let list = document.getElementById('saved')
    list.innerHTML = ""
    var newItemHTML = "";
    retrievedData.forEach((el, idx) => {
        newItemHTML +=
            `<li data-itemindex=${idx}>
            <span><a href=${el.url}>${el.name}</a></span>
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
    const itemStorage = localStorage.getItem("bookmarks");
    const itemArr = JSON.parse(itemStorage);

    itemArr.splice(index, 1);
    saveItems(itemArr);

    fetchAll()
}

// Click save button
document.getElementById('id_save').onclick = () => {
    var retrievedData = JSON.parse(localStorage.getItem('bookmarks'))
    if (retrievedData == null) {
        retrievedData = []
    }

    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        let url = tabs[0].url;
        let name = document.getElementById('add-new').value
        let obj = {
            name: name.length > 0 ? name : url,
            url: url
        }
        retrievedData.push(obj)
        localStorage.setItem("bookmarks", JSON.stringify(retrievedData));
        fetchAll();
    });
}

function saveItems(obj) {
    const itemJson = JSON.stringify(obj);
    localStorage.setItem("bookmarks", itemJson);
}

fetchAll()