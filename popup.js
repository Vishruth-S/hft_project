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
            `<li>
            <span><a href='/display.html?resourcename=${key}'>${key}</a></span>
            </li>`
    }
    list.innerHTML = newItemHTML

}

// function itemDelete(index) {
//     const itemStorage = localStorage.getItem("bookmarks");
//     const itemArr = JSON.parse(itemStorage);

//     itemArr.splice(index, 1);
//     saveItems(itemArr);

//     fetchAll()
// }

// Click save button
// document.getElementById('save-new').onclick = () => {
//     var retrievedData = JSON.parse(localStorage.getItem('allResources'))
//     if (retrievedData == null) {
//         retrievedData = {}
//     }
//     let name = document.getElementById('add-new').value
//     retrievedData[name] = []
//     localStorage.setItem("allResources", JSON.stringify(retrievedData));
//     fetchAll();
// }

// function saveItems(obj) {
//     const itemJson = JSON.stringify(obj);
//     localStorage.setItem("bookmarks", itemJson);
// }

fetchAll()