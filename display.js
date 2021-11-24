function fetchQueryString() {
    let params = (new URL(document.location)).searchParams;
    let resourceName = params.get("resourcename");
    document.getElementById('resource-title').innerText = resourceName
    fetchResources(resourceName)
}

function fetchResources(resourceName) {
    var retrievedData = JSON.parse(localStorage.getItem('allResources'))[resourceName]
    if (retrievedData == null) {
        retrievedData = {}
    }

    let list = document.getElementById('display-resources')
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
            itemDelete(resourceName, index);
        });
    }
}

function itemDelete(resourceName, index) {
    const allItems = JSON.parse(localStorage.getItem('allResources'))
    const itemArr = allItems[resourceName]
    itemArr.splice(index, 1);
    allItems[resourceName] = itemArr
    saveItems(allItems);
    fetchResources(resourceName)
}

// Click save button
document.getElementById('save-new-resource').onclick = () => {
    var allItems = JSON.parse(localStorage.getItem('allResources'))
    if (allItems == null) {
        allItems = {}
    }

    chrome.windows.getCurrent(w => {
        chrome.tabs.query({ active: true, windowId: w.id }, tabs => {
            let url = tabs[0].url;
            let nameInput = document.getElementById('add-new-resource')
            let name = nameInput.value
            nameInput.value = ''
            let obj = {
                name: name.length > 0 ? name : url,
                url: url
            }
            let params = (new URL(document.location)).searchParams;
            let resourceName = params.get("resourcename");
            let itemsArr = allItems[resourceName]
            itemsArr.push(obj)
            allItems[resourceName] = itemsArr
            localStorage.setItem("allResources", JSON.stringify(allItems));
            fetchResources(resourceName)
        });
    });
}

function saveItems(obj) {
    const itemJson = JSON.stringify(obj);
    localStorage.setItem("allResources", itemJson);
}

fetchQueryString();