// ===============

function fetchQueryString() {
    let params = (new URL(document.location)).searchParams;
    let resourceName = params.get("resourcename");
    document.getElementById('resource-title').innerText = resourceName
    fetchResources(resourceName)
    chrome.windows.getCurrent(w => {
        chrome.tabs.query({ active: true, windowId: w.id }, tabs => {
            let title = tabs[0].title
            document.getElementById('add-new-resource').value = title
        })
    })
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
            `<li data-itemindex=${idx} class="resources-item">
            <div class="row">
                <div class="col-2 text-end">
                    <img src=${el.favicon} />
                </div>
                <div class="col-8">
                    <span><a href=${el.url} class="resources-link" target="_blank">${el.name}</a></span>
                </div>
                <div class="col-2">
                    <span class="item-delete">
                        <span class="material-icons">
                            delete
                        </span>
                    </span>
                </div>
            </div>
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
            let favicon = tabs[0].favIconUrl
            let title = tabs[0].title
            let nameInput = document.getElementById('add-new-resource')
            let name = nameInput.value
            nameInput.value = ''
            let obj = {
                name: name.length > 0 ? name : title,
                url: url,
                favicon: favicon
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