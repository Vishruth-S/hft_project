//adding new note item
document.getElementById("noteButton").addEventListener("click", function () {
    const note = document.getElementById("noteInput").value;

    if (note != "") {
        var noteList = JSON.parse(localStorage.getItem("note-list"));
        if (noteList == null) {
            noteList = [];
        }
        var newNote = {
            note: note,
        };
        noteList.push(newNote);
        localStorage.setItem("note-list", JSON.stringify(noteList));
        fetchNoteItems();
    }

    document.getElementById("noteInput").value = "";
});

//fetches all note items from local storage
function fetchNoteItems() {
    var notesList = JSON.parse(localStorage.getItem("note-list"));
    if (notesList == null) {
        notesList = [];
    }
    // add to list
    let list = document.querySelector("ul.note-list");
    list.innerHTML = "";
    var newItemHTML = "";
    notesList.forEach((noteitem, i) => {
        newItemHTML += `<li data-itemindex="${i}" >
          <p class="item"> ${noteitem.note}</p> 
          <span class="NoteitemDelete">
            <span class="material-icons">delete</span>
          </span>
        </li>`;
    });

    list.innerHTML = newItemHTML;

    //adding event listerners to save, delte buttons
    var deletelist = document.querySelectorAll(".NoteitemDelete");
    for (var i = 0; i < deletelist.length; i++) {
        deletelist[i].addEventListener("click", function () {
            var index = this.parentNode.parentNode.dataset.itemindex;
            itemDelete(index, "note-list");
        });
    }
}

//function to handle onclick event of delete button
function itemDelete(index, storageName) {
    const itemStorage = localStorage.getItem(storageName);
    const itemArr = JSON.parse(itemStorage);

    itemArr.splice(index, 1);
    saveItems(itemArr, storageName);

    if (storageName == "note-list") fetchNoteItems();
    else fetchItems();
}

function saveItems(obj, storageName) {
    const itemJson = JSON.stringify(obj);

    localStorage.setItem(storageName, itemJson);
}

fetchNoteItems();