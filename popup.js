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
    retrievedData.forEach(el => {
        let li = document.createElement('li')
        li.innerText = el
        // let item = `<li>${el}</li>`
        list.appendChild(li)
    });
}

// Click save button
document.getElementById('id_save').onclick = function () {
    var retrievedData = JSON.parse(localStorage.getItem('bookmarks'))
    if (retrievedData == null) {
        retrievedData = []
    }
    let currItem = document.getElementById('add-new').value
    console.log(currItem)
    retrievedData.push(currItem)
    localStorage.setItem("bookmarks", JSON.stringify(retrievedData));
    fetchAll();
}

fetchAll();