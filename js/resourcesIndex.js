
//-------------------BOOKMARK------------------------//
// Called when popup.html is loaded.
function fetchAll() {
    // // retreive data
    var retrievedData = JSON.parse(localStorage.getItem('allResources'))
    if (retrievedData == null) {
        retrievedData = {}
    }

    // // add to list
    let list = document.getElementById('all-resources')
    list.innerHTML = ""
    var newItemHTML = ""
    for (const [key, value] of Object.entries(retrievedData)) {
        newItemHTML +=
            `<li id=${key} class="resources-item">
            <div class="row">
                <div class="col-3 resources-folder">
                    <span class="material-icons resources-folder-icon">
                        folder
                    </span>
                </div>
                <div class="col-6">
                    <span>
                        <a href='/pages/resourcesPage/resourcesPage.html?resourcename=${key}' class="resources-link">
                            <p>${key}</p>
                        </a>
                    </span>
                </div>
                <div class="col-3">
                    <span class="delete-resources">          
                        <span class="material-icons resources-delete-icon">
                            delete
                        </span>
                    </span>
                </div>
            </div>
            </li>`
    }
    list.innerHTML = newItemHTML

    var deletelist = document.querySelectorAll(".delete-resources");
    for (var i = 0; i < deletelist.length; i++) {
        deletelist[i].addEventListener("click", function () {
            var id = this.parentNode.id;
            itemDelete(id);
        });
    }

}

function itemDelete(id) {
    const itemStorage = JSON.parse(localStorage.getItem("allResources"))
    delete itemStorage[id]
    localStorage.setItem("allResources", JSON.stringify(itemStorage));
    fetchAll()
}

document.getElementById('save-new').onclick = () => {
    var retrievedData = JSON.parse(localStorage.getItem('allResources'))
    if (retrievedData == null) {
        retrievedData = {}
    }
    let name = document.getElementById('add-new').value
    name = name.replace(/ /g, "_")
    retrievedData[name] = []
    localStorage.setItem("allResources", JSON.stringify(retrievedData));
    fetchAll();
}


fetchAll()
